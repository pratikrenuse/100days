import AppKit
import UserNotifications

/// Checks limits every few seconds and shows the heads-up and the pop-up.
final class Limits: NSObject {
    static let shared = Limits()
    private var panel: NSPanel?
    private var panelLimit: String?
    private var snoozeUntil: [String: Date] = [:]
    private var warned: Set<String> = []
    private var cachedToday: [Session] = []
    private var cachedAt = Date.distantPast

    struct Limit {
        let id: String
        let label: String
        let minutes: Int
        let domains: [String]
        let apps: [String]
        let otherSeconds: Double
    }

    func limits() -> [Limit] {
        guard let arr = Api.shared.status?["limits"] as? [[String: Any]] else { return [] }
        return arr.map { l in
            Limit(id: "\(l["id"] ?? "")",
                  label: l["label"] as? String ?? (l["target"] as? String ?? "Limit"),
                  minutes: (l["daily_minutes"] as? NSNumber)?.intValue ?? 60,
                  domains: (l["match_domains"] as? [String]) ?? [],
                  apps: ((l["match_apps"] as? [String]) ?? []).map { $0.lowercased() },
                  otherSeconds: (l["other_devices_seconds"] as? NSNumber)?.doubleValue ?? 0)
        }
    }

    static func matches(_ l: Limit, appId: String, appName: String, domain: String?) -> Bool {
        if let d = domain {
            return l.domains.contains { d == $0 || d.hasSuffix("." + $0) }
        }
        return l.apps.contains(appId.lowercased()) || l.apps.contains(appName.lowercased())
    }

    func usedSeconds(_ l: Limit) -> Double {
        if Date().timeIntervalSince(cachedAt) > 20 {
            cachedToday = Tracker.shared.todaySessions()
            cachedAt = Date()
        }
        var own = cachedToday.filter { Limits.matches(l, appId: $0.appId, appName: $0.appName, domain: $0.domain) }.reduce(0) { $0 + $1.seconds }
        // Add the live session, which the cache may not include yet.
        if let c = Tracker.shared.current, Limits.matches(l, appId: c.appId, appName: c.appName, domain: c.domain),
           !cachedToday.contains(where: { $0.uid == c.uid }) {
            own += Date().timeIntervalSince(c.start)
        }
        return own + l.otherSeconds
    }

    private func todayKey() -> String {
        let c = Calendar.current.dateComponents([.year, .month, .day], from: Date())
        return "\(c.year ?? 0)-\(c.month ?? 0)-\(c.day ?? 0)"
    }

    func check() {
        guard let c = Tracker.shared.current else { hidePanelIfMoved(); return }
        hidePanelIfMoved()
        for l in limits() where Limits.matches(l, appId: c.appId, appName: c.appName, domain: c.domain) {
            let used = usedSeconds(l)
            let cap = Double(l.minutes * 60)
            let usedMin = Int(used / 60)
            if used >= cap {
                if panel == nil, (snoozeUntil[l.id] ?? .distantPast) < Date() {
                    showPanel(l, usedMin: usedMin, appId: c.appId)
                }
            } else if used >= cap * 0.8 {
                let key = l.id + "|" + todayKey()
                if !warned.contains(key) {
                    warned.insert(key)
                    Notifier.send(title: "\(l.label): \(usedMin) of \(l.minutes) min used",
                                  body: "About \(max(1, l.minutes - usedMin)) min left today across your Mac and phone.", id: "warn-\(l.id)")
                    LocalStore.shared.addNudge(target: l.label, kind: "warn", usedMinutes: usedMin)
                }
            }
            return
        }
    }

    private func hidePanelIfMoved() {
        guard panel != nil, let id = panelLimit else { return }
        guard let c = Tracker.shared.current, let l = limits().first(where: { $0.id == id }),
              Limits.matches(l, appId: c.appId, appName: c.appName, domain: c.domain) else {
            closePanel()
            return
        }
    }

    private func closePanel() {
        panel?.orderOut(nil)
        panel = nil
        panelLimit = nil
    }

    private func showPanel(_ l: Limit, usedMin: Int, appId: String) {
        let w: CGFloat = 460, h: CGFloat = 300
        let p = NSPanel(contentRect: NSRect(x: 0, y: 0, width: w, height: h), styleMask: [.titled, .fullSizeContentView, .nonactivatingPanel], backing: .buffered, defer: false)
        p.titleVisibility = .hidden
        p.titlebarAppearsTransparent = true
        p.isMovableByWindowBackground = true
        p.level = .screenSaver
        p.collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary]
        p.backgroundColor = Theme.bg
        p.hidesOnDeactivate = false

        let v = NSView(frame: NSRect(x: 0, y: 0, width: w, height: h))
        let kicker = Theme.label("DAILY LIMIT REACHED", size: 11, color: Theme.gold, kern: 2)
        kicker.frame = NSRect(x: 36, y: h - 70, width: w - 72, height: 18)
        v.addSubview(kicker)
        let title = Theme.label("\(usedMin) min on \(l.label) today", size: 26, color: Theme.ink, serif: true)
        title.frame = NSRect(x: 36, y: h - 116, width: w - 72, height: 40)
        v.addSubview(title)
        let body = Theme.label("Your limit is \(l.minutes) min across your Mac and phone. Close it now and get the time back.", size: 15, color: Theme.ink2)
        body.frame = NSRect(x: 36, y: h - 180, width: w - 72, height: 56)
        body.maximumNumberOfLines = 3
        v.addSubview(body)

        let isBrowser = MacBrowsers.all[appId] != nil
        let close = Theme.button(isBrowser ? "Close this tab" : "Hide \(l.label)", primary: true, target: self, action: #selector(closeTarget(_:)))
        close.frame = NSRect(x: 36, y: 36, width: 190, height: 44)
        v.addSubview(close)
        let more = Theme.button("10 more minutes", primary: false, target: self, action: #selector(snooze(_:)))
        more.frame = NSRect(x: 238, y: 36, width: 186, height: 44)
        v.addSubview(more)
        p.contentView = v

        if let screen = NSScreen.main {
            let f = screen.visibleFrame
            p.setFrameOrigin(NSPoint(x: f.midX - w / 2, y: f.midY - h / 2))
        }
        p.orderFrontRegardless()
        panel = p
        panelLimit = l.id
        currentAppId = appId
        currentLabel = l.label
        currentUsed = usedMin
        LocalStore.shared.addNudge(target: l.label, kind: "limit", usedMinutes: usedMin)
    }

    private var currentAppId = ""
    private var currentLabel = ""
    private var currentUsed = 0

    @objc private func closeTarget(_ sender: Any?) {
        LocalStore.shared.addNudge(target: currentLabel, kind: "closed", usedMinutes: currentUsed)
        let appId = currentAppId
        closePanel()
        if MacBrowsers.all[appId] != nil {
            MacBrowsers.closeTab(bundleId: appId)
        } else {
            NSRunningApplication.runningApplications(withBundleIdentifier: appId).forEach { $0.hide() }
        }
    }

    @objc private func snooze(_ sender: Any?) {
        if let id = panelLimit { snoozeUntil[id] = Date().addingTimeInterval(600) }
        LocalStore.shared.addNudge(target: currentLabel, kind: "snooze", usedMinutes: currentUsed)
        closePanel()
    }
}

/// Mac notifications for the heads-up and the 9 PM report.
/// Shows a nudge. macOS can silently block notifications from a self-signed app, so a nudge is never
/// left to one channel: a real Mac notification when allowed, plus the app's own card at the top right
/// whenever notifications are blocked or fail.
enum Notifier {
    static func ask() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound]) { _, _ in }
    }

    static func send(title: String, body: String, id: String) {
        UNUserNotificationCenter.current().getNotificationSettings { s in
            let allowed = (s.authorizationStatus == .authorized || s.authorizationStatus == .provisional) && s.alertSetting != .disabled && s.alertStyle != .none
            guard allowed else {
                DispatchQueue.main.async { NudgeCard.show(title: title, body: body) }
                return
            }
            let c = UNMutableNotificationContent()
            c.title = title
            c.body = body
            c.sound = .default
            UNUserNotificationCenter.current().add(UNNotificationRequest(identifier: id, content: c, trigger: nil)) { err in
                if err != nil { DispatchQueue.main.async { NudgeCard.show(title: title, body: body) } }
            }
        }
    }
}

/// The app's own nudge card: a small cream panel at the top right of the screen, above other windows,
/// on every Space. It closes on click or after 20 seconds and never takes focus from what you are doing.
enum NudgeCard {
    private static var panels: [NSPanel] = []

    static func show(title: String, body: String) {
        guard let screen = NSScreen.main else { return }
        let width: CGFloat = 360
        let stack = NSStackView()
        stack.orientation = .vertical
        stack.alignment = .leading
        stack.spacing = 6
        stack.edgeInsets = NSEdgeInsets(top: 16, left: 18, bottom: 16, right: 18)
        let label = Theme.label("SCREEN TIME", size: 10, color: Theme.gold, kern: 1.6)
        let t = Theme.label(title, size: 15, color: Theme.ink)
        t.font = NSFont.systemFont(ofSize: 15, weight: .semibold)
        let b = Theme.label(body, size: 13, color: Theme.ink2)
        for v in [label, t, b] {
            v.preferredMaxLayoutWidth = width - 36
            stack.addArrangedSubview(v)
        }
        stack.translatesAutoresizingMaskIntoConstraints = false
        let box = NSView()
        box.wantsLayer = true
        box.layer?.backgroundColor = Theme.bg.cgColor
        box.layer?.cornerRadius = 12
        box.layer?.borderWidth = 1
        box.layer?.borderColor = NSColor(red: 0xD0 / 255, green: 0xC8 / 255, blue: 0xC0 / 255, alpha: 1).cgColor
        box.addSubview(stack)
        NSLayoutConstraint.activate([
            stack.leadingAnchor.constraint(equalTo: box.leadingAnchor),
            stack.trailingAnchor.constraint(equalTo: box.trailingAnchor),
            stack.topAnchor.constraint(equalTo: box.topAnchor),
            stack.bottomAnchor.constraint(equalTo: box.bottomAnchor),
            box.widthAnchor.constraint(equalToConstant: width),
        ])
        box.layoutSubtreeIfNeeded()
        let height = max(80, stack.fittingSize.height)
        let top = screen.visibleFrame.maxY - 12 - panels.reduce(0) { $0 + $1.frame.height + 10 }
        let frame = NSRect(x: screen.visibleFrame.maxX - width - 12, y: top - height, width: width, height: height)
        let panel = NSPanel(contentRect: frame, styleMask: [.nonactivatingPanel, .borderless], backing: .buffered, defer: false)
        panel.level = .statusBar
        panel.collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary]
        panel.isOpaque = false
        panel.backgroundColor = .clear
        panel.hasShadow = true
        panel.contentView = box
        let click = NSClickGestureRecognizer(target: CardCloser.shared, action: #selector(CardCloser.close(_:)))
        box.addGestureRecognizer(click)
        panel.orderFrontRegardless()
        NSSound(named: "Glass")?.play()
        panels.append(panel)
        DispatchQueue.main.asyncAfter(deadline: .now() + 20) { close(panel) }
    }

    static func close(_ panel: NSPanel) {
        panel.orderOut(nil)
        panels.removeAll { $0 === panel }
    }

    static func close(containing view: NSView) {
        if let p = panels.first(where: { $0.contentView === view }) { close(p) }
    }
}

final class CardCloser: NSObject {
    static let shared = CardCloser()
    @objc func close(_ g: NSClickGestureRecognizer) {
        if let v = g.view { NudgeCard.close(containing: v) }
    }
}
