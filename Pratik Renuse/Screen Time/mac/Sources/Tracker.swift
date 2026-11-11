import AppKit
import ApplicationServices
import CoreLocation
import CoreWLAN

/// Browsers the Mac app can ask for the open address.
enum MacBrowsers {
    enum Kind { case chromium, safari, titleOnly }
    struct Info { let name: String; let kind: Kind }
    static let all: [String: Info] = [
        "com.google.Chrome": Info(name: "Google Chrome", kind: .chromium),
        "com.google.Chrome.beta": Info(name: "Chrome Beta", kind: .chromium),
        "com.google.Chrome.canary": Info(name: "Chrome Canary", kind: .chromium),
        "org.chromium.Chromium": Info(name: "Chromium", kind: .chromium),
        "com.brave.Browser": Info(name: "Brave", kind: .chromium),
        "com.microsoft.edgemac": Info(name: "Edge", kind: .chromium),
        "company.thebrowser.Browser": Info(name: "Arc", kind: .chromium),
        "company.thebrowser.dia": Info(name: "Dia", kind: .chromium),
        "com.vivaldi.Vivaldi": Info(name: "Vivaldi", kind: .chromium),
        "com.operasoftware.Opera": Info(name: "Opera", kind: .chromium),
        "ai.perplexity.comet": Info(name: "Comet", kind: .chromium),
        "com.apple.Safari": Info(name: "Safari", kind: .safari),
        "com.apple.SafariTechnologyPreview": Info(name: "Safari Preview", kind: .safari),
        "org.mozilla.firefox": Info(name: "Firefox", kind: .titleOnly),
        "app.zen-browser.zen": Info(name: "Zen", kind: .titleOnly),
    ]

    static func domain(of url: String) -> String? {
        guard let host = URL(string: url)?.host?.lowercased(), host.contains(".") else { return nil }
        var h = host
        for p in ["www.", "m.", "mobile."] where h.hasPrefix(p) { h.removeFirst(p.count); break }
        return h
    }

    private static var scripts: [String: NSAppleScript] = [:]

    /// Returns (url, tab title) for the front window, or nil if the browser has no window or refused.
    static func current(bundleId: String) -> (String, String?)? {
        guard let info = all[bundleId], info.kind != .titleOnly else { return nil }
        let script: NSAppleScript
        if let s = scripts[bundleId] { script = s } else {
            let src: String
            if info.kind == .safari {
                src = """
                tell application id "\(bundleId)"
                  if (count of windows) is 0 then return ""
                  return (URL of current tab of front window) & linefeed & (name of current tab of front window)
                end tell
                """
            } else {
                src = """
                tell application id "\(bundleId)"
                  if (count of windows) is 0 then return ""
                  return (URL of active tab of front window) & linefeed & (title of active tab of front window)
                end tell
                """
            }
            guard let s = NSAppleScript(source: src) else { return nil }
            scripts[bundleId] = s
            script = s
        }
        var err: NSDictionary?
        let out = script.executeAndReturnError(&err)
        if err != nil { return nil }
        guard let text = out.stringValue, !text.isEmpty else { return nil }
        let parts = text.components(separatedBy: "\n")
        let url = parts[0].trimmingCharacters(in: .whitespaces)
        if url.isEmpty || url == "missing value" { return nil }
        let title = parts.count > 1 ? parts[1] : nil
        return (url, title)
    }

    /// Closes the open tab, used by the limit pop-up.
    static func closeTab(bundleId: String) {
        guard let info = all[bundleId] else { return }
        let src: String
        switch info.kind {
        case .safari: src = "tell application id \"\(bundleId)\" to close current tab of front window"
        case .chromium: src = "tell application id \"\(bundleId)\" to close active tab of front window"
        case .titleOnly: src = "tell application id \"\(bundleId)\" to activate\ntell application \"System Events\" to keystroke \"w\" using command down"
        }
        var err: NSDictionary?
        _ = NSAppleScript(source: src)?.executeAndReturnError(&err)
    }
}

/// Watches the front app every 2 seconds and records sessions. No idle cutoff:
/// time counts whenever the screen is on and unlocked.
final class Tracker: NSObject, CLLocationManagerDelegate {
    static let shared = Tracker()

    private(set) var current: Session?
    private var timer: Timer?
    private var lastTick = Date()
    private var lastSave = Date.distantPast
    private var locked = false
    private var asleep = false
    private var pendingTitle: String?
    private let location = CLLocationManager()
    private(set) var lat: Double?
    private(set) var lon: Double?
    private var lastLocationAsk = Date.distantPast
    var onChange: (() -> Void)?

    func start() {
        location.delegate = self
        location.desiredAccuracy = kCLLocationAccuracyHundredMeters
        let dn = DistributedNotificationCenter.default()
        dn.addObserver(self, selector: #selector(lockedNow), name: NSNotification.Name("com.apple.screenIsLocked"), object: nil)
        dn.addObserver(self, selector: #selector(unlockedNow), name: NSNotification.Name("com.apple.screenIsUnlocked"), object: nil)
        dn.addObserver(self, selector: #selector(lockedNow), name: NSNotification.Name("com.apple.screensaver.didstart"), object: nil)
        dn.addObserver(self, selector: #selector(unlockedNow), name: NSNotification.Name("com.apple.screensaver.didstop"), object: nil)
        let wc = NSWorkspace.shared.notificationCenter
        wc.addObserver(self, selector: #selector(sleepNow), name: NSWorkspace.screensDidSleepNotification, object: nil)
        wc.addObserver(self, selector: #selector(wakeNow), name: NSWorkspace.screensDidWakeNotification, object: nil)
        wc.addObserver(self, selector: #selector(sleepNow), name: NSWorkspace.willSleepNotification, object: nil)
        wc.addObserver(self, selector: #selector(wakeNow), name: NSWorkspace.didWakeNotification, object: nil)
        wc.addObserver(self, selector: #selector(lockedNow), name: NSWorkspace.sessionDidResignActiveNotification, object: nil)
        wc.addObserver(self, selector: #selector(unlockedNow), name: NSWorkspace.sessionDidBecomeActiveNotification, object: nil)
        wc.addObserver(self, selector: #selector(appSwitched), name: NSWorkspace.didActivateApplicationNotification, object: nil)
        let t = Timer(timeInterval: 2, repeats: true) { [weak self] _ in self?.tick() }
        RunLoop.main.add(t, forMode: .common)
        timer = t
        tick()
    }

    private var lastUnlock = Date.distantPast

    /// Counts each time you come back to the Mac: an unlock, or a wake when no password is asked.
    private func recordUnlock() {
        let now = Date()
        guard now.timeIntervalSince(lastUnlock) > 15 else { return }
        lastUnlock = now
        LocalStore.shared.addNudge(target: "Mac", kind: "unlock", usedMinutes: 0)
    }

    @objc private func lockedNow() { locked = true; close(at: Date()) }
    @objc private func unlockedNow() {
        if locked { recordUnlock() }
        locked = false
        lastTick = Date()
    }
    @objc private func sleepNow() { asleep = true; close(at: Date()) }
    @objc private func wakeNow() {
        let wasAsleep = asleep
        asleep = false
        lastTick = Date()
        if wasAsleep && !locked { recordUnlock() }
    }
    @objc private func appSwitched() { DispatchQueue.main.async { self.tick() } }

    func close(at end: Date) {
        guard var c = current else { return }
        c.end = max(c.start, end)
        if c.seconds >= 1 { LocalStore.shared.save(c) }
        current = nil
    }

    /// Persists the open session so the dashboard and limits see it before it ends.
    func flush() {
        guard var c = current else { return }
        c.end = Date()
        current = c
        if c.seconds >= 1 { LocalStore.shared.save(c) }
    }

    private func windowTitle(pid: pid_t) -> String? {
        guard AXIsProcessTrusted() else { return nil }
        let app = AXUIElementCreateApplication(pid)
        var win: CFTypeRef?
        guard AXUIElementCopyAttributeValue(app, kAXFocusedWindowAttribute as CFString, &win) == .success, let w = win else { return nil }
        var title: CFTypeRef?
        guard AXUIElementCopyAttributeValue(w as! AXUIElement, kAXTitleAttribute as CFString, &title) == .success else { return nil }
        let t = (title as? String)?.trimmingCharacters(in: .whitespacesAndNewlines)
        return (t?.isEmpty ?? true) ? nil : String(t!.prefix(300))
    }

    func ssid() -> String? {
        CWWiFiClient.shared().interface()?.ssid()
    }

    private func tick() {
        let now = Date()
        // A long gap means the Mac was asleep or the lid was shut: end the session where it stopped.
        if now.timeIntervalSince(lastTick) > 20 { close(at: lastTick) }
        lastTick = now
        if locked || asleep {
            close(at: now)
            return
        }
        guard let app = NSWorkspace.shared.frontmostApplication else { return }
        let bid = app.bundleIdentifier ?? (app.localizedName ?? "unknown")
        if bid == "com.apple.loginwindow" || bid == "com.apple.ScreenSaver.Engine" {
            close(at: now)
            return
        }
        let name = app.localizedName ?? bid
        var title = windowTitle(pid: app.processIdentifier)
        var browser: String?
        var url: String?
        var domain: String?
        if let info = MacBrowsers.all[bid] {
            browser = info.name
            if let found = MacBrowsers.current(bundleId: bid) {
                let (u, t) = found
                url = String(u.prefix(500))
                domain = MacBrowsers.domain(of: u)
                if let t, !t.isEmpty { title = String(t.prefix(300)) }
            }
        }
        if bid == Bundle.main.bundleIdentifier { title = title ?? "Screen Time" }

        if var c = current {
            let sameDay = Calendar.current.isDate(c.start, inSameDayAs: now)
            let sameThing = c.appId == bid && c.domain == domain
            if !sameDay {
                let midnight = Calendar.current.startOfDay(for: now)
                close(at: midnight)
                begin(bid, name, browser, domain, url, title, midnight)
            } else if !sameThing {
                close(at: now)
                begin(bid, name, browser, domain, url, title, now)
            } else if title != c.title && c.seconds >= 10 {
                // A new video, document or chat in the same app: keep it as its own line, once it holds for 2 checks.
                if pendingTitle == title {
                    close(at: now)
                    begin(bid, name, browser, domain, url, title, now)
                    pendingTitle = nil
                } else {
                    pendingTitle = title
                }
            } else {
                if c.title == nil { c.title = title }
                c.url = url ?? c.url
                c.end = now
                current = c
                pendingTitle = nil
            }
        } else {
            begin(bid, name, browser, domain, url, title, now)
        }
        if now.timeIntervalSince(lastSave) >= 30 {
            lastSave = now
            flush()
        }
        if now.timeIntervalSince(lastLocationAsk) > 15 * 60 {
            lastLocationAsk = now
            let status = location.authorizationStatus
            if status == .authorizedAlways { location.requestLocation() }
        }
        onChange?()
    }

    private func begin(_ bid: String, _ name: String, _ browser: String?, _ domain: String?, _ url: String?, _ title: String?, _ at: Date) {
        let uid = "mac|\(bid)|\(Int(at.timeIntervalSince1970 * 1000))"
        current = Session(uid: uid, appId: bid, appName: name, browser: browser, domain: domain, url: url, title: title,
                          start: at, end: at, ssid: ssid(), lat: lat, lon: lon)
    }

    // MARK: location

    func askLocation() {
        location.requestWhenInUseAuthorization()
    }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let l = locations.last else { return }
        lat = (l.coordinate.latitude * 10000).rounded() / 10000
        lon = (l.coordinate.longitude * 10000).rounded() / 10000
    }

    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {}

    func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        let s = manager.authorizationStatus
        if s == .authorizedAlways { manager.requestLocation() }
    }

    // MARK: today's totals from the local log

    func todaySessions() -> [Session] {
        let start = Calendar.current.startOfDay(for: Date())
        var list = LocalStore.shared.since(start).filter { $0.start >= start }
        if var c = current {
            c.end = Date()
            list.removeAll { $0.uid == c.uid }
            list.append(c)
        }
        return list
    }
}
