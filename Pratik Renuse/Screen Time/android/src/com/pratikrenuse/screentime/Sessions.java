package com.pratikrenuse.screentime;

import android.app.usage.UsageEvents;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.view.inputmethod.InputMethodInfo;
import android.view.inputmethod.InputMethodManager;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/** Rebuilds the phone's app and website sessions from Android's own usage log. */
final class Sessions {
    static final class Piece {
        String uid, pkg, appName, browser, domain, url, title;
        long start, end;

        long seconds() {
            return Math.max(0, (end - start) / 1000);
        }
    }

    private static final Map<String, String> labelCache = new HashMap<>();
    private static Set<String> ignored;

    static long midnight(long t, int dayOffset) {
        Calendar c = Calendar.getInstance();
        c.setTimeInMillis(t);
        c.set(Calendar.HOUR_OF_DAY, 0);
        c.set(Calendar.MINUTE, 0);
        c.set(Calendar.SECOND, 0);
        c.set(Calendar.MILLISECOND, 0);
        c.add(Calendar.DAY_OF_MONTH, dayOffset);
        return c.getTimeInMillis();
    }

    static String label(Context ctx, String pkg) {
        String l = labelCache.get(pkg);
        if (l != null) return l;
        try {
            PackageManager pm = ctx.getPackageManager();
            ApplicationInfo ai = pm.getApplicationInfo(pkg, 0);
            l = String.valueOf(pm.getApplicationLabel(ai));
        } catch (Exception e) {
            l = pkg;
        }
        labelCache.put(pkg, l);
        return l;
    }

    private static synchronized Set<String> ignored(Context ctx) {
        if (ignored != null) return ignored;
        Set<String> s = new HashSet<>();
        s.add("com.android.systemui");
        s.add("android");
        try {
            InputMethodManager imm = (InputMethodManager) ctx.getSystemService(Context.INPUT_METHOD_SERVICE);
            if (imm != null) for (InputMethodInfo i : imm.getInputMethodList()) s.add(i.getPackageName());
        } catch (Exception ignoredErr) {
        }
        ignored = s;
        return s;
    }

    static boolean isIgnored(Context ctx, String pkg) {
        return pkg == null || ignored(ctx).contains(pkg);
    }

    /** App sessions between from and to, built from foreground and screen events. */
    static List<Piece> appSessions(Context ctx, long from, long to) {
        List<Piece> out = new ArrayList<>();
        UsageStatsManager usm = (UsageStatsManager) ctx.getSystemService(Context.USAGE_STATS_SERVICE);
        if (usm == null) return out;
        // Start a little earlier so an app already open at "from" is caught.
        UsageEvents ev = usm.queryEvents(from - 3 * 3600_000L, to);
        if (ev == null) return out;
        UsageEvents.Event e = new UsageEvents.Event();
        String cur = null;
        long curStart = 0;
        boolean screenOn = true;
        while (ev.hasNextEvent()) {
            ev.getNextEvent(e);
            int type = e.getEventType();
            long t = e.getTimeStamp();
            String pkg = e.getPackageName();
            if (type == UsageEvents.Event.ACTIVITY_RESUMED) {
                if (isIgnored(ctx, pkg)) continue;
                screenOn = true;
                if (cur != null && !cur.equals(pkg)) {
                    add(out, ctx, cur, curStart, t);
                    cur = null;
                }
                if (cur == null) {
                    cur = pkg;
                    curStart = t;
                }
            } else if (type == UsageEvents.Event.ACTIVITY_PAUSED || type == UsageEvents.Event.ACTIVITY_STOPPED) {
                if (cur != null && cur.equals(pkg)) {
                    add(out, ctx, cur, curStart, t);
                    cur = null;
                }
            } else if (type == UsageEvents.Event.SCREEN_NON_INTERACTIVE || type == UsageEvents.Event.KEYGUARD_SHOWN || type == UsageEvents.Event.DEVICE_SHUTDOWN) {
                if (cur != null) add(out, ctx, cur, curStart, t);
                cur = null;
                screenOn = false;
            } else if (type == UsageEvents.Event.SCREEN_INTERACTIVE || type == UsageEvents.Event.KEYGUARD_HIDDEN) {
                screenOn = true;
            }
        }
        if (cur != null && screenOn) add(out, ctx, cur, curStart, to);
        // Merge the tiny gaps Android leaves when an app moves between its own screens.
        List<Piece> merged = new ArrayList<>();
        for (Piece p : out) {
            Piece last = merged.isEmpty() ? null : merged.get(merged.size() - 1);
            if (last != null && last.pkg.equals(p.pkg) && p.start - last.end <= 3000) {
                last.end = Math.max(last.end, p.end);
            } else merged.add(p);
        }
        // Clip to the window and split at midnight.
        List<Piece> clipped = new ArrayList<>();
        for (Piece p : merged) {
            long s = Math.max(p.start, from), en = Math.min(p.end, to);
            while (en > s) {
                long nextMidnight = midnight(s, 1);
                long pieceEnd = Math.min(en, nextMidnight);
                Piece q = copy(p);
                q.start = s;
                q.end = pieceEnd;
                if (q.end - q.start >= 1000) clipped.add(q);
                s = pieceEnd;
            }
        }
        return clipped;
    }

    private static void add(List<Piece> out, Context ctx, String pkg, long s, long e) {
        if (e <= s) return;
        Piece p = new Piece();
        p.pkg = pkg;
        p.appName = label(ctx, pkg);
        p.start = s;
        p.end = e;
        out.add(p);
    }

    private static Piece copy(Piece p) {
        Piece q = new Piece();
        q.pkg = p.pkg;
        q.appName = p.appName;
        q.browser = p.browser;
        q.domain = p.domain;
        q.url = p.url;
        q.title = p.title;
        q.start = p.start;
        q.end = p.end;
        return q;
    }

    /** Times the phone was unlocked (or switched on without a lock screen) between from and to. */
    static List<Long> unlocks(Context ctx, long from, long to) {
        List<Long> out = new ArrayList<>();
        UsageStatsManager usm = (UsageStatsManager) ctx.getSystemService(Context.USAGE_STATS_SERVICE);
        if (usm == null) return out;
        UsageEvents ev = usm.queryEvents(from, to);
        if (ev == null) return out;
        UsageEvents.Event e = new UsageEvents.Event();
        long last = 0;
        boolean sawKeyguard = false;
        List<Long> screenOns = new ArrayList<>();
        while (ev.hasNextEvent()) {
            ev.getNextEvent(e);
            int type = e.getEventType();
            long t = e.getTimeStamp();
            if (type == UsageEvents.Event.KEYGUARD_HIDDEN) {
                sawKeyguard = true;
                if (t - last > 15_000) out.add(t);
                last = t;
            } else if (type == UsageEvents.Event.SCREEN_INTERACTIVE) {
                screenOns.add(t);
            }
        }
        // Phones without a lock screen never report KEYGUARD_HIDDEN, so count screen-ons instead.
        return sawKeyguard ? out : screenOns;
    }

    /** App sessions with browser time split into the websites seen in the address bar. */
    static List<Piece> pieces(Context ctx, long from, long to) {
        List<Piece> apps = appSessions(ctx, from, to);
        List<Store.Segment> segs = Store.get(ctx).segments(from, to);
        // Close the gap between a visit and the next one in the same browser, so time reading a page counts.
        Map<String, List<Store.Segment>> byPkg = new HashMap<>();
        for (Store.Segment s : segs) {
            List<Store.Segment> l = byPkg.get(s.pkg);
            if (l == null) byPkg.put(s.pkg, l = new ArrayList<>());
            l.add(s);
        }
        List<Piece> out = new ArrayList<>();
        for (Piece a : apps) {
            if (!Browsers.isBrowser(a.pkg)) {
                a.uid = a.pkg + "|" + a.start;
                out.add(a);
                continue;
            }
            String browserName = Browsers.ALL.get(a.pkg).name;
            List<Store.Segment> list = byPkg.get(a.pkg);
            long cursor = a.start;
            if (list != null) {
                for (int i = 0; i < list.size(); i++) {
                    Store.Segment s = list.get(i);
                    long segEnd = s.end;
                    // A visit lasts until the next visit in this browser starts, or the app session ends.
                    if (i + 1 < list.size()) segEnd = Math.max(segEnd, Math.min(list.get(i + 1).start, a.end));
                    else segEnd = Math.max(segEnd, a.end);
                    long st = Math.max(s.start, a.start), en = Math.min(segEnd, a.end);
                    if (en <= st) continue;
                    if (st > cursor + 1000) {
                        Piece gap = copy(a);
                        gap.start = cursor;
                        gap.end = st;
                        gap.browser = browserName;
                        gap.uid = a.pkg + "|" + gap.start;
                        out.add(gap);
                    }
                    Piece p = copy(a);
                    p.start = Math.max(st, cursor);
                    p.end = en;
                    if (p.end <= p.start) continue;
                    p.browser = browserName;
                    p.domain = s.domain;
                    p.url = s.url;
                    p.title = s.title;
                    p.uid = a.pkg + "|" + p.start + "|" + s.domain;
                    out.add(p);
                    cursor = p.end;
                }
            }
            if (a.end > cursor + 1000) {
                Piece rest = copy(a);
                rest.start = cursor;
                rest.browser = browserName;
                rest.uid = a.pkg + "|" + rest.start;
                out.add(rest);
            }
        }
        Collections.sort(out, (x, y) -> Long.compare(x.start, y.start));
        return out;
    }
}
