import Foundation

/// Uploads sessions and fetches limits from the Screen Time backend.
final class Api {
    static let shared = Api()
    static let version = "1.0"
    let server = "https://spymrfgkwfjrcealulfh.supabase.co/functions/v1/screentime"
    private var syncing = false
    private(set) var status: [String: Any]?
    private(set) var lastSync: Date?
    private(set) var lastError: String?
    private lazy var macName: String = Host.current().localizedName ?? "Mac"

    var token: String {
        get { (UserDefaults.standard.string(forKey: "token") ?? "").trimmingCharacters(in: .whitespacesAndNewlines) }
        set { UserDefaults.standard.set(newValue.trimmingCharacters(in: .whitespacesAndNewlines), forKey: "token") }
    }

    var deviceId: String {
        if let id = UserDefaults.standard.string(forKey: "device_id") { return id }
        let id = "mac-" + UUID().uuidString.lowercased()
        UserDefaults.standard.set(id, forKey: "device_id")
        return id
    }

    private func request(_ action: String, query: String = "", body: [String: Any]? = nil, done: @escaping (Result<[String: Any], Error>) -> Void) {
        guard let url = URL(string: "\(server)?action=\(action)\(query)") else { return }
        var req = URLRequest(url: url, timeoutInterval: 30)
        req.setValue(token, forHTTPHeaderField: "x-st-token")
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        if let body {
            req.httpMethod = "POST"
            req.httpBody = try? JSONSerialization.data(withJSONObject: body)
        }
        URLSession.shared.dataTask(with: req) { data, resp, err in
            DispatchQueue.main.async {
                if let err { return done(.failure(err)) }
                let code = (resp as? HTTPURLResponse)?.statusCode ?? 0
                let obj = (data.flatMap { try? JSONSerialization.jsonObject(with: $0) }) as? [String: Any] ?? [:]
                if code >= 400 {
                    let msg = obj["error"] as? String ?? "Server error \(code)"
                    return done(.failure(NSError(domain: "ScreenTime", code: code, userInfo: [NSLocalizedDescriptionKey: msg])))
                }
                done(.success(obj))
            }
        }.resume()
    }

    /// Sends new and changed sessions plus pop-up events, then refreshes limits.
    func sync(_ done: ((String) -> Void)? = nil) {
        guard !token.isEmpty else { done?("Add your device key in Setup first."); return }
        guard !syncing else { done?("A sync is already running."); return }
        syncing = true
        Tracker.shared.flush()
        let sessions = LocalStore.shared.dirty()
        let nudges = LocalStore.shared.unsentNudges()
        let body: [String: Any] = [
            "device": ["id": deviceId, "kind": "mac", "name": macName, "version": Api.version],
            "events": sessions.map { $0.json() },
            "nudges": nudges,
        ]
        request("ingest", body: body) { r in
            self.syncing = false
            switch r {
            case .success:
                LocalStore.shared.markClean(sessions)
                LocalStore.shared.markNudgesSent(nudges.compactMap { $0["uid"] as? String })
                LocalStore.shared.prune(before: Date().addingTimeInterval(-3 * 86400))
                self.lastSync = Date()
                self.lastError = nil
                self.refreshStatus()
                done?("Synced \(sessions.count) sessions.")
            case .failure(let e):
                self.lastError = e.localizedDescription
                done?("Sync failed: \(e.localizedDescription)")
            }
        }
    }

    func refreshStatus(_ done: (() -> Void)? = nil) {
        guard !token.isEmpty else { done?(); return }
        let q = "&device=" + (deviceId.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? "")
        request("status", query: q) { r in
            if case .success(let s) = r { self.status = s }
            done?()
        }
    }

    func report(_ done: @escaping ([String: Any]?) -> Void) {
        request("report") { r in
            if case .success(let s) = r { done(s) } else { done(nil) }
        }
    }

    /// Short summary text for a Mac notification: which is "yesterday" or "today".
    func brief(_ which: String, _ done: @escaping ([String: Any]?) -> Void) {
        request("brief", query: "&which=\(which)") { r in
            if case .success(let s) = r { done(s) } else { done(nil) }
        }
    }

    func checkKey(_ key: String, done: @escaping (Bool) -> Void) {
        let old = token
        token = key
        request("status", query: "&device=check") { r in
            if case .success = r { done(true) } else {
                self.token = old
                done(false)
            }
        }
    }
}
