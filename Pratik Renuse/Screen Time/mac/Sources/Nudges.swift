import Foundation
import UserNotifications

/// Insight nudges, shown as native Mac notifications by this app. Nothing is scheduled outside the Mac.
///   Morning: once a day, the first time the Mac is in use after 7 AM, a summary of yesterday.
///   Evening: once a day, the first time the Mac is in use after 9 PM, a summary of today.
///   Wasted time: every time today's wasted time crosses another 30 minutes.
///   Right now: after 20 minutes in a row on YouTube, social feeds, news or shopping, and again every 20 minutes.
final class Nudges {
    static let shared = Nudges()
    private var timer: Timer?
    private var streakKey: String?
    private var streakStart = Date()
    private var streakSteps = 0
    private(set) var notificationsAllowed = true

    private let distracting = try! NSRegularExpression(
        pattern: "(youtube|youtu\\.be|netflix|primevideo|hotstar|jiocinema|sonyliv|zee5|twitch|instagram|facebook|\\bfb\\.com|twitter|\\bx\\.com|reddit|threads\\.net|pinterest|tiktok|quora|9gag|amazon\\.|flipkart|myntra|swiggy|zomato|ajio|meesho|nykaa|news|cricbuzz|espncricinfo|moneycontrol|inshorts|dailyhunt)",
        options: [.caseInsensitive])

    func start() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound]) { _, _ in self.checkPermission() }
        let t = Timer(timeInterval: 60, repeats: true) { [weak self] _ in self?.check() }
        RunLoop.main.add(t, forMode: .common)
        timer = t
        DispatchQueue.main.asyncAfter(deadline: .now() + 20) { self.check() }
        // One confirmation per new build, so it is obvious straight away that nudges reach the screen.
        let build = Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion") as? String ?? "1"
        let stamp = "\(build)-\((try? FileManager.default.attributesOfItem(atPath: Bundle.main.executablePath ?? "")[.modificationDate] as? Date)?.timeIntervalSince1970 ?? 0)"
        if UserDefaults.standard.string(forKey: "nudge_welcome") != stamp {
            UserDefaults.standard.set(stamp, forKey: "nudge_welcome")
            DispatchQueue.main.asyncAfter(deadline: .now() + 8) {
                Notifier.send(title: "Nudges are on",
                              body: "You will get yesterday's summary each morning, today's at 9 PM, and a nudge when time goes to YouTube, feeds or shopping.",
                              id: "welcome")
            }
        }
    }

    func checkPermission() {
        UNUserNotificationCenter.current().getNotificationSettings { s in
            DispatchQueue.main.async {
                self.notificationsAllowed = (s.authorizationStatus == .authorized || s.authorizationStatus == .provisional) && s.alertStyle != .none
            }
        }
    }

    private static func dayKey(_ d: Date = Date()) -> String {
        let f = DateFormatter()
        f.dateFormat = "yyyy-MM-dd"
        return f.string(from: d)
    }

    private var inFlight = Set<String>()

    /// Sends a day summary once per day; if the Mac is offline it tries again on the next check.
    private func dailyBrief(_ name: String, which: String, fallback: String) {
        let key = "nudge2_\(name)_\(Nudges.dayKey())"
        guard !UserDefaults.standard.bool(forKey: key), !inFlight.contains(key) else { return }
        inFlight.insert(key)
        Api.shared.brief(which) { b in
            self.inFlight.remove(key)
            guard let b else { return }
            UserDefaults.standard.set(true, forKey: key)
            if (b["empty"] as? Bool) == true { return }
            Notifier.send(title: b["title"] as? String ?? fallback, body: b["body"] as? String ?? "", id: "brief-\(name)")
        }
    }

    private func check() {
        checkPermission()
        // Only nudge while the Mac is actually in use.
        guard let current = Tracker.shared.current else { return }
        let hour = Calendar.current.component(.hour, from: Date())

        if hour >= 7 { dailyBrief("morning", which: "yesterday", fallback: "Yesterday") }
        if hour >= 21 { dailyBrief("evening", which: "today", fallback: "Today") }

        // Wasted time, in steps of 30 minutes.
        if let st = Api.shared.status, (st["day"] as? String) == Nudges.dayKey(),
           let tiers = st["tiers_today"] as? [[String: Any]] {
            let wasted = tiers.first { ($0["tier"] as? String) == "chill" }.flatMap { ($0["seconds"] as? NSNumber)?.doubleValue } ?? 0
            let k1 = tiers.first { ($0["tier"] as? String) == "k1" }.flatMap { ($0["seconds"] as? NSNumber)?.doubleValue } ?? 0
            let step = Int(wasted / 1800)
            let key = "nudge_wasted_\(Nudges.dayKey())"
            if step > UserDefaults.standard.integer(forKey: key) {
                UserDefaults.standard.set(step, forKey: key)
                let top = (st["top_today"] as? [[String: Any]] ?? [])
                    .filter { ($0["tier"] as? String) == "chill" }
                    .prefix(3)
                    .map { "\($0["label"] as? String ?? "") \(AppDelegate.fmt(($0["seconds"] as? NSNumber)?.doubleValue ?? 0))" }
                var body = top.isEmpty ? "" : "Mostly \(top.joined(separator: ", ")). "
                body += "Real work so far: \(AppDelegate.fmt(k1))."
                Notifier.send(title: "\(AppDelegate.fmt(wasted)) wasted today", body: body, id: "wasted-\(step)")
            }
        }

        // A long unbroken stretch on a distracting site or app.
        let hay = "\(current.domain ?? "") \(current.appId) \(current.appName)"
        let isDistracting = distracting.firstMatch(in: hay, range: NSRange(hay.startIndex..., in: hay)) != nil && !hay.lowercased().contains("linkedin")
        if !isDistracting { streakKey = nil; streakSteps = 0; return }
        // A new video or post on the same site keeps the same stretch going.
        let key = current.domain ?? current.appId
        if streakKey != key { streakKey = key; streakStart = current.start; streakSteps = 0 }
        let steps = Int(Date().timeIntervalSince(streakStart) / 1200)
        if steps > streakSteps {
            streakSteps = steps
            let what = current.domain ?? current.appName
            Notifier.send(title: "\(steps * 20) min on \(what) in one go",
                          body: "Close it and pick up one real task now.",
                          id: "streak-\(key)-\(Int(streakStart.timeIntervalSince1970))-\(steps)")
        }
    }
}
