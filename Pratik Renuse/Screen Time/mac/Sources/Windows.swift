import AppKit
import ApplicationServices
import CoreLocation
import ServiceManagement
import UserNotifications
import WebKit

enum Theme {
    static let bg = NSColor(red: 0xF6 / 255, green: 0xF2 / 255, blue: 0xF1 / 255, alpha: 1)
    static let surface = NSColor(red: 0xEE / 255, green: 0xE8 / 255, blue: 0xE4 / 255, alpha: 1)
    static let ink = NSColor(red: 0x1A / 255, green: 0x15 / 255, blue: 0x12 / 255, alpha: 1)
    static let ink2 = NSColor(red: 0x38 / 255, green: 0x30 / 255, blue: 0x2A / 255, alpha: 1)
    static let ink4 = NSColor(red: 0x78 / 255, green: 0x6E / 255, blue: 0x66 / 255, alpha: 1)
    static let gold = NSColor(red: 0x8C / 255, green: 0x6A / 255, blue: 0x18 / 255, alpha: 1)
    static let ok = NSColor(red: 0x3C / 255, green: 0x7A / 255, blue: 0x4A / 255, alpha: 1)

    static func font(_ size: CGFloat, serif: Bool = false, weight: NSFont.Weight = .regular) -> NSFont {
        if serif, let f = NSFont(name: "IBMPlexSerif-Light", size: size) ?? NSFont(name: "Georgia", size: size) { return f }
        return NSFont.systemFont(ofSize: size, weight: weight)
    }

    static func label(_ s: String, size: CGFloat, color: NSColor, serif: Bool = false, kern: CGFloat = 0) -> NSTextField {
        let t = NSTextField(wrappingLabelWithString: s)
        t.isEditable = false
        t.isBordered = false
        t.drawsBackground = false
        t.textColor = color
        t.font = font(size, serif: serif)
        if kern > 0 {
            t.attributedStringValue = NSAttributedString(string: s, attributes: [.kern: kern, .font: font(size, weight: .medium), .foregroundColor: color])
        }
        return t
    }

    static func button(_ title: String, primary: Bool, target: AnyObject, action: Selector) -> NSButton {
        let b = NSButton(title: title, target: target, action: action)
        b.isBordered = false
        b.wantsLayer = true
        b.layer?.backgroundColor = (primary ? ink : surface).cgColor
        b.attributedTitle = NSAttributedString(string: title.uppercased(), attributes: [
            .foregroundColor: primary ? bg : ink2, .kern: 1.6, .font: NSFont.systemFont(ofSize: 12, weight: .medium),
        ])
        return b
    }
}

/// The dashboard, bundled in the app and signed in with this Mac's device key.
final class DashboardWindow: NSObject, WKNavigationDelegate {
    static let shared = DashboardWindow()
    private var window: NSWindow?

    func show() {
        if let w = window {
            w.makeKeyAndOrderFront(nil)
            NSApp.activate(ignoringOtherApps: true)
            return
        }
        let w = NSWindow(contentRect: NSRect(x: 0, y: 0, width: 1180, height: 820), styleMask: [.titled, .closable, .resizable, .miniaturizable], backing: .buffered, defer: false)
        w.title = "Screen Time"
        w.backgroundColor = Theme.bg
        w.isReleasedWhenClosed = false
        let web = WKWebView(frame: w.contentView!.bounds)
        web.autoresizingMask = [.width, .height]
        web.navigationDelegate = self
        web.setValue(false, forKey: "drawsBackground")
        w.contentView?.addSubview(web)
        if let path = Bundle.main.path(forResource: "dashboard", ofType: "html"), var html = try? String(contentsOfFile: path, encoding: .utf8) {
            let tokenJSON = (try? String(data: JSONSerialization.data(withJSONObject: [Api.shared.token]), encoding: .utf8)) ?? "[\"\"]"
            html = html.replacingOccurrences(of: "/*ST_INJECT*/", with: "window.ST_TOKEN=\(tokenJSON)[0];")
            web.loadHTMLString(html, baseURL: URL(string: "https://screentime.app/"))
        } else {
            web.loadHTMLString("<p style='font-family:sans-serif;padding:24px'>The dashboard file is missing from the app. Run the installer again.</p>", baseURL: nil)
        }
        w.center()
        w.setFrameAutosaveName("ScreenTimeDashboard")
        window = w
        w.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)
    }

    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        if navigationAction.navigationType == .linkActivated, let url = navigationAction.request.url, url.host != "screentime.app" {
            NSWorkspace.shared.open(url)
            decisionHandler(.cancel)
            return
        }
        decisionHandler(.allow)
    }
}

/// One window that shows every permission and lets you grant each one.
final class SetupWindow: NSObject, NSWindowDelegate {
    static let shared = SetupWindow()
    private var window: NSWindow?
    private var stack: NSStackView?
    private var keyField: NSTextField?
    private var notificationsOK = false

    var allGood: Bool {
        AXIsProcessTrusted() && !Api.shared.token.isEmpty
    }

    func show() {
        if window == nil {
            let w = NSWindow(contentRect: NSRect(x: 0, y: 0, width: 560, height: 640), styleMask: [.titled, .closable], backing: .buffered, defer: false)
            w.title = "Screen Time setup"
            w.backgroundColor = Theme.bg
            w.isReleasedWhenClosed = false
            w.delegate = self
            let scroll = NSScrollView(frame: w.contentView!.bounds)
            scroll.autoresizingMask = [.width, .height]
            scroll.drawsBackground = false
            scroll.hasVerticalScroller = true
            let s = NSStackView()
            s.orientation = .vertical
            s.alignment = .leading
            s.spacing = 10
            s.edgeInsets = NSEdgeInsets(top: 28, left: 32, bottom: 28, right: 32)
            s.translatesAutoresizingMaskIntoConstraints = false
            let doc = FlippedView()
            doc.translatesAutoresizingMaskIntoConstraints = false
            doc.addSubview(s)
            scroll.documentView = doc
            NSLayoutConstraint.activate([
                s.leadingAnchor.constraint(equalTo: doc.leadingAnchor),
                s.trailingAnchor.constraint(equalTo: doc.trailingAnchor),
                s.topAnchor.constraint(equalTo: doc.topAnchor),
                s.bottomAnchor.constraint(equalTo: doc.bottomAnchor),
                doc.widthAnchor.constraint(equalTo: scroll.contentView.widthAnchor),
            ])
            w.contentView?.addSubview(scroll)
            stack = s
            window = w
            w.center()
        }
        refresh()
        window?.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)
    }

    func windowDidBecomeKey(_ notification: Notification) { refresh() }

    func refresh() {
        UNUserNotificationCenter.current().getNotificationSettings { s in
            DispatchQueue.main.async {
                self.notificationsOK = s.authorizationStatus == .authorized || s.authorizationStatus == .provisional
                self.rebuild()
            }
        }
    }

    private func row(_ n: Int, _ title: String, _ why: String, done: Bool, button: String, action: Selector) {
        guard let s = stack else { return }
        let box = NSStackView()
        box.orientation = .vertical
        box.alignment = .leading
        box.spacing = 6
        box.edgeInsets = NSEdgeInsets(top: 14, left: 16, bottom: 14, right: 16)
        box.wantsLayer = true
        box.layer?.backgroundColor = Theme.surface.cgColor
        box.addArrangedSubview(Theme.label((done ? "\u{2713}  " : "\(n).  ") + title, size: 15, color: done ? Theme.ok : Theme.ink))
        if !done {
            let w = Theme.label(why, size: 13, color: Theme.ink2)
            w.preferredMaxLayoutWidth = 460
            box.addArrangedSubview(w)
            let b = Theme.button(button, primary: true, target: self, action: action)
            b.translatesAutoresizingMaskIntoConstraints = false
            b.heightAnchor.constraint(equalToConstant: 36).isActive = true
            b.widthAnchor.constraint(greaterThanOrEqualToConstant: 200).isActive = true
            box.addArrangedSubview(b)
        }
        box.translatesAutoresizingMaskIntoConstraints = false
        s.addArrangedSubview(box)
        box.widthAnchor.constraint(equalToConstant: 496).isActive = true
    }

    private func rebuild() {
        guard let s = stack else { return }
        s.arrangedSubviews.forEach { $0.removeFromSuperview() }
        s.addArrangedSubview(Theme.label("Screen Time setup", size: 28, color: Theme.ink, serif: true))
        let sub = Theme.label("Allow these once. Everything stays between this Mac, your phone and your own database.", size: 13, color: Theme.ink4)
        sub.preferredMaxLayoutWidth = 480
        s.addArrangedSubview(sub)

        var n = 1
        if Api.shared.token.isEmpty {
            let f = NSTextField(string: "")
            f.placeholderString = "st_..."
            f.translatesAutoresizingMaskIntoConstraints = false
            f.widthAnchor.constraint(equalToConstant: 496).isActive = true
            keyField = f
            s.addArrangedSubview(Theme.label("\(n).  Paste your device key", size: 15, color: Theme.ink))
            s.addArrangedSubview(f)
            let b = Theme.button("Save key", primary: true, target: self, action: #selector(saveKey))
            b.translatesAutoresizingMaskIntoConstraints = false
            b.heightAnchor.constraint(equalToConstant: 36).isActive = true
            b.widthAnchor.constraint(equalToConstant: 200).isActive = true
            s.addArrangedSubview(b)
        }
        n += 1
        row(n, "Allow Accessibility", "Lets Screen Time read window titles, like the YouTube video or document you have open. In System Settings, switch on Screen Time. If it is already on, switch it off and on again after an update.",
            done: AXIsProcessTrusted(), button: "Open Accessibility", action: #selector(openAccessibility))
        n += 1
        let running = NSWorkspace.shared.runningApplications.compactMap { $0.bundleIdentifier }.filter { MacBrowsers.all[$0] != nil && MacBrowsers.all[$0]!.kind != .titleOnly }
        let browsersOK = UserDefaults.standard.bool(forKey: "browsers_tested")
        row(n, "Allow browser access", "Reads the website open in Chrome, Safari, Arc, Brave or Edge. Open your browsers first, then click the button and choose OK on each prompt." + (running.isEmpty ? " No supported browser is open right now." : ""),
            done: browsersOK, button: "Ask my browsers", action: #selector(testBrowsers))
        n += 1
        row(n, "Allow notifications", "For the 80% heads-up and the 9 PM daily report.", done: notificationsOK, button: "Allow notifications", action: #selector(askNotifications))
        n += 1
        let loc = CLLocationManager().authorizationStatus
        row(n, "Allow location", "So the dashboard can tell home from office, using your Wi-Fi name.", done: loc == .authorizedAlways, button: loc == .denied ? "Open Location settings" : "Allow location", action: #selector(askLocation))
        n += 1
        let agent = FileManager.default.fileExists(atPath: NSHomeDirectory() + "/Library/LaunchAgents/com.pratikrenuse.screentime.plist")
        row(n, "Always on", "Starts at login and restarts itself if it is closed. The installer sets this up.", done: agent, button: "How to turn it on", action: #selector(enableLogin))

        let done = Theme.button("Open dashboard", primary: false, target: self, action: #selector(openDashboard))
        done.translatesAutoresizingMaskIntoConstraints = false
        done.heightAnchor.constraint(equalToConstant: 40).isActive = true
        done.widthAnchor.constraint(equalToConstant: 496).isActive = true
        s.addArrangedSubview(done)
        s.addArrangedSubview(Theme.label("Device \(Api.shared.deviceId)  \u{00B7}  version \(Api.version)", size: 11, color: Theme.ink4))
    }

    @objc private func saveKey() {
        let k = keyField?.stringValue ?? ""
        guard !k.isEmpty else { return }
        Api.shared.checkKey(k) { ok in
            if ok { Api.shared.sync() }
            let a = NSAlert()
            a.messageText = ok ? "Key saved. This Mac is connected." : "That key did not work. Check it and paste it again."
            a.runModal()
            self.refresh()
        }
    }

    @objc private func openAccessibility() {
        let opts = [kAXTrustedCheckOptionPrompt.takeUnretainedValue() as String: true] as CFDictionary
        _ = AXIsProcessTrustedWithOptions(opts)
        if let u = URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy_Accessibility") { NSWorkspace.shared.open(u) }
    }

    @objc private func testBrowsers() {
        var asked = 0
        for app in NSWorkspace.shared.runningApplications {
            guard let id = app.bundleIdentifier, let info = MacBrowsers.all[id], info.kind != .titleOnly else { continue }
            asked += 1
            _ = MacBrowsers.current(bundleId: id)
        }
        if asked > 0 { UserDefaults.standard.set(true, forKey: "browsers_tested") }
        refresh()
    }

    @objc private func askNotifications() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound]) { ok, _ in
            DispatchQueue.main.async {
                if !ok, let u = URL(string: "x-apple.systempreferences:com.apple.preference.notifications") { NSWorkspace.shared.open(u) }
                self.refresh()
            }
        }
    }

    @objc private func askLocation() {
        if CLLocationManager().authorizationStatus == .denied {
            if let u = URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy_LocationServices") { NSWorkspace.shared.open(u) }
        } else {
            Tracker.shared.askLocation()
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) { self.refresh() }
    }

    @objc private func enableLogin() {
        let a = NSAlert()
        a.messageText = "Run the Screen Time installer once more. It sets up the always-on helper that starts the app at login and restarts it if it closes."
        a.runModal()
        refresh()
    }

    @objc private func openDashboard() { DashboardWindow.shared.show() }
}

final class FlippedView: NSView {
    override var isFlipped: Bool { true }
}
