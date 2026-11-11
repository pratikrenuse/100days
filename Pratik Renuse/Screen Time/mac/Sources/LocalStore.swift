import Foundation
import SQLite3

private let SQLITE_TRANSIENT = unsafeBitCast(-1, to: sqlite3_destructor_type.self)

/// One tracked stretch of time on the Mac.
struct Session {
    var uid: String
    var appId: String
    var appName: String
    var browser: String?
    var domain: String?
    var url: String?
    var title: String?
    var start: Date
    var end: Date
    var ssid: String?
    var lat: Double?
    var lon: Double?

    var seconds: Double { max(0, end.timeIntervalSince(start)) }

    func json() -> [String: Any] {
        var d: [String: Any] = [
            "uid": uid,
            "start": ISO.string(start),
            "end": ISO.string(end),
            "app_id": appId,
            "app_name": appName,
        ]
        if let browser { d["browser"] = browser }
        if let domain { d["domain"] = domain }
        if let url { d["url"] = url }
        if let title { d["title"] = title }
        if let ssid { d["ssid"] = ssid }
        if let lat { d["lat"] = lat }
        if let lon { d["lon"] = lon }
        return d
    }
}

enum ISO {
    static let formatter: ISO8601DateFormatter = {
        let f = ISO8601DateFormatter()
        f.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        return f
    }()
    static func string(_ d: Date) -> String { formatter.string(from: d) }
}

/// Local SQLite queue: every session is saved here first, then uploaded.
final class LocalStore {
    static let shared = LocalStore()
    private var db: OpaquePointer?
    private let queue = DispatchQueue(label: "screentime.store")

    private init() {
        let fm = FileManager.default
        let dir = fm.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0].appendingPathComponent("ScreenTime", isDirectory: true)
        try? fm.createDirectory(at: dir, withIntermediateDirectories: true)
        let path = dir.appendingPathComponent("screentime.sqlite").path
        if sqlite3_open(path, &db) != SQLITE_OK { db = nil }
        exec("""
        CREATE TABLE IF NOT EXISTS sessions (
          uid TEXT PRIMARY KEY, app_id TEXT, app_name TEXT, browser TEXT, domain TEXT, url TEXT, title TEXT,
          start REAL NOT NULL, end REAL NOT NULL, ssid TEXT, lat REAL, lon REAL, dirty INTEGER NOT NULL DEFAULT 1)
        """)
        exec("CREATE INDEX IF NOT EXISTS sessions_start ON sessions(start)")
        exec("CREATE TABLE IF NOT EXISTS nudges (uid TEXT PRIMARY KEY, at REAL, target TEXT, kind TEXT, used INTEGER, sent INTEGER NOT NULL DEFAULT 0)")
    }

    private func exec(_ sql: String) {
        queue.sync { _ = sqlite3_exec(db, sql, nil, nil, nil) }
    }

    private func bind(_ st: OpaquePointer?, _ i: Int32, _ s: String?) {
        if let s { sqlite3_bind_text(st, i, s, -1, SQLITE_TRANSIENT) } else { sqlite3_bind_null(st, i) }
    }

    private func bind(_ st: OpaquePointer?, _ i: Int32, _ d: Double?) {
        if let d { sqlite3_bind_double(st, i, d) } else { sqlite3_bind_null(st, i) }
    }

    private func text(_ st: OpaquePointer?, _ i: Int32) -> String? {
        guard let c = sqlite3_column_text(st, i) else { return nil }
        return String(cString: c)
    }

    private func double(_ st: OpaquePointer?, _ i: Int32) -> Double? {
        if sqlite3_column_type(st, i) == SQLITE_NULL { return nil }
        return sqlite3_column_double(st, i)
    }

    func save(_ s: Session) {
        queue.sync {
            var st: OpaquePointer?
            let sql = """
            INSERT INTO sessions (uid, app_id, app_name, browser, domain, url, title, start, end, ssid, lat, lon, dirty)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,1)
            ON CONFLICT(uid) DO UPDATE SET end=excluded.end, title=excluded.title, url=excluded.url,
              ssid=COALESCE(excluded.ssid, sessions.ssid), lat=COALESCE(excluded.lat, sessions.lat), lon=COALESCE(excluded.lon, sessions.lon), dirty=1
            """
            guard sqlite3_prepare_v2(db, sql, -1, &st, nil) == SQLITE_OK else { return }
            bind(st, 1, s.uid)
            bind(st, 2, s.appId)
            bind(st, 3, s.appName)
            bind(st, 4, s.browser)
            bind(st, 5, s.domain)
            bind(st, 6, s.url)
            bind(st, 7, s.title)
            sqlite3_bind_double(st, 8, s.start.timeIntervalSince1970)
            sqlite3_bind_double(st, 9, s.end.timeIntervalSince1970)
            bind(st, 10, s.ssid)
            bind(st, 11, s.lat)
            bind(st, 12, s.lon)
            sqlite3_step(st)
            sqlite3_finalize(st)
        }
    }

    private func read(_ sql: String, _ args: [Double]) -> [Session] {
        queue.sync { () -> [Session] in
            var out: [Session] = []
            var st: OpaquePointer?
            guard sqlite3_prepare_v2(db, sql, -1, &st, nil) == SQLITE_OK else { return out }
            for (i, a) in args.enumerated() { sqlite3_bind_double(st, Int32(i + 1), a) }
            while sqlite3_step(st) == SQLITE_ROW {
                out.append(Session(
                    uid: text(st, 0) ?? "", appId: text(st, 1) ?? "", appName: text(st, 2) ?? "",
                    browser: text(st, 3), domain: text(st, 4), url: text(st, 5), title: text(st, 6),
                    start: Date(timeIntervalSince1970: sqlite3_column_double(st, 7)),
                    end: Date(timeIntervalSince1970: sqlite3_column_double(st, 8)),
                    ssid: text(st, 9), lat: double(st, 10), lon: double(st, 11)))
            }
            sqlite3_finalize(st)
            return out
        }
    }

    private let cols = "uid, app_id, app_name, browser, domain, url, title, start, end, ssid, lat, lon"

    func dirty(limit: Int = 500) -> [Session] {
        read("SELECT \(cols) FROM sessions WHERE dirty = 1 ORDER BY start LIMIT \(limit)", [])
    }

    func since(_ d: Date) -> [Session] {
        read("SELECT \(cols) FROM sessions WHERE end >= ? ORDER BY start", [d.timeIntervalSince1970])
    }

    /// Marks sessions as uploaded, unless they changed again after the upload started.
    func markClean(_ sessions: [Session]) {
        queue.sync {
            var st: OpaquePointer?
            guard sqlite3_prepare_v2(db, "UPDATE sessions SET dirty = 0 WHERE uid = ? AND end <= ?", -1, &st, nil) == SQLITE_OK else { return }
            for s in sessions {
                sqlite3_reset(st)
                sqlite3_bind_text(st, 1, s.uid, -1, SQLITE_TRANSIENT)
                sqlite3_bind_double(st, 2, s.end.timeIntervalSince1970)
                sqlite3_step(st)
            }
            sqlite3_finalize(st)
        }
    }

    func prune(before: Date) {
        queue.sync {
            var st: OpaquePointer?
            if sqlite3_prepare_v2(db, "DELETE FROM sessions WHERE dirty = 0 AND end < ?", -1, &st, nil) == SQLITE_OK {
                sqlite3_bind_double(st, 1, before.timeIntervalSince1970)
                sqlite3_step(st)
            }
            sqlite3_finalize(st)
            _ = sqlite3_exec(db, "DELETE FROM nudges WHERE sent = 1", nil, nil, nil)
        }
    }

    // MARK: nudges

    func addNudge(target: String, kind: String, usedMinutes: Int) {
        queue.sync {
            var st: OpaquePointer?
            guard sqlite3_prepare_v2(db, "INSERT OR REPLACE INTO nudges (uid, at, target, kind, used, sent) VALUES (?,?,?,?,?,0)", -1, &st, nil) == SQLITE_OK else { return }
            let now = Date().timeIntervalSince1970
            sqlite3_bind_text(st, 1, "mac-n-\(Int(now * 1000))-\(kind)", -1, SQLITE_TRANSIENT)
            sqlite3_bind_double(st, 2, now)
            sqlite3_bind_text(st, 3, target, -1, SQLITE_TRANSIENT)
            sqlite3_bind_text(st, 4, kind, -1, SQLITE_TRANSIENT)
            sqlite3_bind_int(st, 5, Int32(usedMinutes))
            sqlite3_step(st)
            sqlite3_finalize(st)
        }
    }

    func unsentNudges() -> [[String: Any]] {
        queue.sync { () -> [[String: Any]] in
            var out: [[String: Any]] = []
            var st: OpaquePointer?
            guard sqlite3_prepare_v2(db, "SELECT uid, at, target, kind, used FROM nudges WHERE sent = 0 LIMIT 200", -1, &st, nil) == SQLITE_OK else { return out }
            while sqlite3_step(st) == SQLITE_ROW {
                out.append([
                    "uid": text(st, 0) ?? "",
                    "at": ISO.string(Date(timeIntervalSince1970: sqlite3_column_double(st, 1))),
                    "target": text(st, 2) ?? "",
                    "kind": text(st, 3) ?? "",
                    "used_minutes": Int(sqlite3_column_int(st, 4)),
                ])
            }
            sqlite3_finalize(st)
            return out
        }
    }

    func markNudgesSent(_ uids: [String]) {
        queue.sync {
            var st: OpaquePointer?
            guard sqlite3_prepare_v2(db, "UPDATE nudges SET sent = 1 WHERE uid = ?", -1, &st, nil) == SQLITE_OK else { return }
            for u in uids {
                sqlite3_reset(st)
                sqlite3_bind_text(st, 1, u, -1, SQLITE_TRANSIENT)
                sqlite3_step(st)
            }
            sqlite3_finalize(st)
        }
    }
}
