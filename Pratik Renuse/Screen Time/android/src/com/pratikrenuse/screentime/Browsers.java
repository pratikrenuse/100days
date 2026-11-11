package com.pratikrenuse.screentime;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

/** Browsers whose address bar we can read, and how to turn its text into a site. */
final class Browsers {
    static final class Info {
        final String name;
        final String[] urlBarIds;

        Info(String name, String... ids) {
            this.name = name;
            this.urlBarIds = ids;
        }
    }

    static final Map<String, Info> ALL = new HashMap<>();

    static {
        ALL.put("com.android.chrome", new Info("Chrome", "url_bar"));
        ALL.put("com.chrome.beta", new Info("Chrome Beta", "url_bar"));
        ALL.put("com.chrome.dev", new Info("Chrome Dev", "url_bar"));
        ALL.put("com.chrome.canary", new Info("Chrome Canary", "url_bar"));
        ALL.put("com.brave.browser", new Info("Brave", "url_bar"));
        ALL.put("com.microsoft.emmx", new Info("Edge", "url_bar"));
        ALL.put("com.vivaldi.browser", new Info("Vivaldi", "url_bar"));
        ALL.put("com.kiwibrowser.browser", new Info("Kiwi", "url_bar"));
        ALL.put("com.sec.android.app.sbrowser", new Info("Samsung Internet", "location_bar_edit_text"));
        ALL.put("com.sec.android.app.sbrowser.beta", new Info("Samsung Internet Beta", "location_bar_edit_text"));
        ALL.put("org.mozilla.firefox", new Info("Firefox", "mozac_browser_toolbar_url_view", "url_bar_title"));
        ALL.put("org.mozilla.firefox_beta", new Info("Firefox Beta", "mozac_browser_toolbar_url_view"));
        ALL.put("org.mozilla.fenix", new Info("Firefox Nightly", "mozac_browser_toolbar_url_view"));
        ALL.put("org.mozilla.focus", new Info("Firefox Focus", "display_url", "mozac_browser_toolbar_url_view"));
        ALL.put("com.opera.browser", new Info("Opera", "url_field"));
        ALL.put("com.opera.mini.native", new Info("Opera Mini", "url_field"));
        ALL.put("com.duckduckgo.mobile.android", new Info("DuckDuckGo", "omnibarTextInput"));
        ALL.put("com.mi.globalbrowser", new Info("Mi Browser", "url"));
    }

    static boolean isBrowser(String pkg) {
        return pkg != null && ALL.containsKey(pkg);
    }

    /** Turns address bar text into a bare domain, or null when it is a search or not a web address. */
    static String domainOf(String text) {
        if (text == null) return null;
        String s = text.trim().toLowerCase(Locale.ROOT);
        if (s.isEmpty() || s.contains(" ")) return null;
        int scheme = s.indexOf("://");
        if (scheme >= 0) s = s.substring(scheme + 3);
        int cut = s.length();
        for (char ch : new char[]{'/', '?', '#', ':'}) {
            int i = s.indexOf(ch);
            if (i >= 0 && i < cut) cut = i;
        }
        s = s.substring(0, cut);
        if (s.startsWith("www.")) s = s.substring(4);
        else if (s.startsWith("m.")) s = s.substring(2);
        else if (s.startsWith("mobile.")) s = s.substring(7);
        if (!s.contains(".") || s.length() > 120 || s.startsWith(".") || s.endsWith(".")) return null;
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (!(Character.isLetterOrDigit(ch) || ch == '.' || ch == '-')) return null;
        }
        return s;
    }
}
