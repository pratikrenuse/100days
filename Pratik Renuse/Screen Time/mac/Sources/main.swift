import AppKit
import ApplicationServices
import ServiceManagement
import UserNotifications

final class AppDelegate: NSObject, NSApplicationDelegate, NSMenuDelegate, UNUserNotificationCenterDelegate {
    private var item: NSStatusItem!
    private var timers: [Timer] = []
    /// Only a logout, restart or shutdown may close the app. Cmd+Q and Quit requests are refused.
    private var systemIsShuttingDown = false

    func applicationDidFinishLaunching(_ n: Notification) {
        item = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)
        item.button?.title = "0m"
        if let img = Bundle.main.image(forResource: "menubar") {
            img.isTemplate = true
            img.size = NSSize(width: 18, height: 18)
            item.button?.image = img
        } else {
            item.button?.image = NSImage(systemSymbolName: "hourglass", accessibilityDescription: "Screen Time")
        }
        item.button?.imagePosition = .imageLeading
        let menu = NSMenu()
        menu.autoenablesItems = false
        menu.delegate = self
        item.menu = menu

        UNUserNotificationCenter.current().delegate = self
        // The keep-alive agent now starts the app, so drop the older login item to avoid a second copy.
        try? SMAppService.mainApp.unregister()
        NSWorkspace.shared.notificationCenter.addObserver(forName: NSWorkspace.willPowerOffNotification, object: nil, queue: .main) { [weak self] _ in
            self?.systemIsShuttingDown = true
            Tracker.shared.close(at: Date())
        }
        Tracker.shared.start()
        Nudges.shared.start()
        Api.shared.refreshStatus { self.updateTitle() }

        // Limits are switched off for now: the app is for insight only. Limits.swift stays in place for later.
        every(30) { self.updateTitle() }
        every(60) { Api.shared.sync() }
        every(120) { Api.shared.refreshStatus() }
        DispatchQueue.main.asyncAfter(deadline: .now() + 3) { Api.shared.sync() }

        if !SetupWindow.shared.allGood || !UserDefaults.standard.bool(forKey: "setup_seen") {
            UserDefaults.standard.set(true, forKey: "setup_seen")
            SetupWindow.shared.show()
        }
    }

    func applicationShouldTerminate(_ sender: NSApplication) -> NSApplication.TerminateReply {
        if systemIsShuttingDown { return .terminateNow }
        Notifier.send(title: "Screen Time keeps running", body: "Tracking cannot be switched off. It stays on so every minute counts.", id: "noquit")
        return .terminateCancel
    }

    func applicationWillTerminate(_ n: Notification) {
        Tracker.shared.close(at: Date())
    }

    private func every(_ seconds: TimeInterval, _ block: @escaping () -> Void) {
        let t = Timer(timeInterval: seconds, repeats: true) { _ in block() }
        RunLoop.main.add(t, forMode: .common)
        timers.append(t)
    }

    // MARK: totals

    static func fmt(_ sec: Double) -> String {
        let m = Int((sec / 60).rounded())
        if m < 60 { return "\(m)m" }
        return "\(m / 60)h \(String(format: "%02d", m % 60))m"
    }

    private func macToday() -> Double {
        Tracker.shared.todaySessions().reduce(0) { $0 + $1.seconds }
    }

    private func phoneToday() -> Double {
        ((Api.shared.status?["today_seconds"] as? [String: Any])?["android"] as? NSNumber)?.doubleValue ?? 0
    }

    private func updateTitle() {
        item.button?.title = " " + AppDelegate.fmt(macToday() + phoneToday())
    }

    // MARK: menu

    func menuNeedsUpdate(_ menu: NSMenu) {
        menu.removeAllItems()
        let st = Api.shared.status
        let mac = macToday(), phone = phoneToday(), total = mac + phone
        menu.addItem(info("Today \(AppDelegate.fmt(total))", bold: true))
        menu.addItem(info("Mac \(AppDelegate.fmt(mac)), phone \(AppDelegate.fmt(phone))"))

        // Where the time went, by what it is worth.
        if let tiers = st?["tiers_today"] as? [[String: Any]] {
            let sum = tiers.reduce(0.0) { $0 + (($1["seconds"] as? NSNumber)?.doubleValue ?? 0) }
            if sum > 0 {
                menu.addItem(.separator())
                menu.addItem(info("By value", bold: true))
                for t in tiers {
                    let sec = (t["seconds"] as? NSNumber)?.doubleValue ?? 0
                    let key = t["tier"] as? String ?? ""
                    if key == "life" && sec < 60 { continue }
                    let pct = Int((sec / sum * 100).rounded())
                    menu.addItem(row(t["label"] as? String ?? key, "\(AppDelegate.fmt(sec))   \(pct)%"))
                }
            }
        }

        if let top = st?["top_today"] as? [[String: Any]], !top.isEmpty {
            menu.addItem(.separator())
            menu.addItem(info("Top today", bold: true))
            for t in top.prefix(5) {
                let sec = (t["seconds"] as? NSNumber)?.doubleValue ?? 0
                let tier = (t["tier_label"] as? String ?? "").replacingOccurrences(of: " work", with: "")
                menu.addItem(row(t["label"] as? String ?? "", "\(AppDelegate.fmt(sec))   \(tier)"))
            }
        }

        // How often you came back to the Mac and which apps pull you in most.
        let unlocks = ((st?["unlocks_today"] as? [String: Any])?["mac"] as? NSNumber)?.intValue ?? 0
        let phoneUnlocks = ((st?["unlocks_today"] as? [String: Any])?["android"] as? NSNumber)?.intValue ?? 0
        if let opens = st?["opens_today"] as? [[String: Any]], !opens.isEmpty {
            menu.addItem(.separator())
            menu.addItem(info("Opened most", bold: true))
            if unlocks > 0 || phoneUnlocks > 0 {
                menu.addItem(row("Unlocked", phoneUnlocks > 0 ? "Mac \(unlocks)x, phone \(phoneUnlocks)x" : "\(unlocks) times"))
            }
            for o in opens.prefix(5) {
                let n = (o["opens"] as? NSNumber)?.intValue ?? 0
                menu.addItem(row(o["label"] as? String ?? "", "\(n) times"))
            }
        }

        if let f = st?["focus"] as? [String: Any] {
            let longest = (f["longest_s"] as? NSNumber)?.doubleValue ?? 0
            let switches = (f["switches"] as? NSNumber)?.intValue ?? 0
            menu.addItem(.separator())
            if longest >= 60, let what = f["longest_label"] as? String {
                menu.addItem(info("Longest focus: \(AppDelegate.fmt(longest)) on \(what)"))
            }
            if switches > 0 && total > 0 {
                let perHour = Double(switches) / max(total / 3600, 0.25)
                menu.addItem(info("\(switches) switches today, about \(Int(perHour.rounded())) an hour"))
            }
        }

        // Only show a warning when something actually needs fixing.
        var problems: [String] = []
        if !AXIsProcessTrusted() { problems.append("Accessibility is off, so window titles are missing") }
        if Api.shared.token.isEmpty { problems.append("Device key is missing") }
        else if let e = Api.shared.lastError { problems.append("Upload failing: \(e)") }
        if !problems.isEmpty {
            menu.addItem(.separator())
            for p in problems { menu.addItem(action("Fix: \(p)", #selector(openSetup), key: "")) }
        }

        menu.addItem(.separator())
        menu.addItem(action("Open dashboard", #selector(openDashboard), key: "d"))
        Api.shared.refreshStatus()
    }

    /// A menu line with the label on the left and the value lined up on the right.
    private func row(_ left: String, _ right: String) -> NSMenuItem {
        let p = NSMutableParagraphStyle()
        p.tabStops = [NSTextTab(textAlignment: .left, location: 150)]
        let s = NSAttributedString(string: "\(left)\t\(right)", attributes: [
            .paragraphStyle: p,
            .font: NSFont.menuFont(ofSize: 13),
            .foregroundColor: NSColor.labelColor,
        ])
        let m = NSMenuItem(title: "\(left) \(right)", action: nil, keyEquivalent: "")
        m.attributedTitle = s
        m.isEnabled = true
        return m
    }

    private func info(_ s: String, bold: Bool = false) -> NSMenuItem {
        let m = NSMenuItem(title: s, action: nil, keyEquivalent: "")
        m.isEnabled = true
        if bold { m.attributedTitle = NSAttributedString(string: s, attributes: [.font: NSFont.systemFont(ofSize: 13, weight: .semibold)]) }
        return m
    }

    private func action(_ s: String, _ sel: Selector, key: String) -> NSMenuItem {
        let m = NSMenuItem(title: s, action: sel, keyEquivalent: key)
        m.target = self
        return m
    }

    @objc private func openDashboard() { DashboardWindow.shared.show() }
    @objc private func openSetup() {
        SetupWindow.shared.show()
    }


    // MARK: notifications

    func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        completionHandler([.banner, .sound])
    }

    func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
        DashboardWindow.shared.show()
        completionHandler()
    }
}

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.setActivationPolicy(.accessory)
app.run()
