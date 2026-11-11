package com.pratikrenuse.screentime;

import android.accessibilityservice.AccessibilityService;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Color;
import android.graphics.PixelFormat;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.os.Handler;
import android.os.Looper;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.WindowManager;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityNodeInfo;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Runs all the time once Accessibility is on. It notes which app is in front, reads the
 * address bar of supported browsers, and shows the limit pop-up over any app.
 */
public class Tracker extends AccessibilityService {
    static volatile Tracker instance;

    private final Handler main = new Handler(Looper.getMainLooper());
    private final ExecutorService bg = Executors.newSingleThreadExecutor();
    private String fgPkg;
    private String segDomain, segPkg, segUrl, segTitle;
    private long segId = -1, lastRead = 0, lastSync = 0, lastStatus = 0, piecesAt = 0;
    private List<Sessions.Piece> todayPieces;
    private View overlay;
    private String overlayLimit;
    private boolean screenOn = true;
    private final Map<String, Long> snoozeUntil = new HashMap<>();

    private final BroadcastReceiver screen = new BroadcastReceiver() {
        @Override
        public void onReceive(Context c, Intent i) {
            if (Intent.ACTION_SCREEN_OFF.equals(i.getAction())) {
                screenOn = false;
                closeSegment();
                hideOverlay();
            } else if (Intent.ACTION_USER_PRESENT.equals(i.getAction()) || Intent.ACTION_SCREEN_ON.equals(i.getAction())) {
                screenOn = true;
            }
        }
    };

    private final Runnable tick = new Runnable() {
        @Override
        public void run() {
            try {
                onTick();
            } catch (Throwable ignored) {
            }
            main.postDelayed(this, 30_000);
        }
    };

    @Override
    protected void onServiceConnected() {
        instance = this;
        IntentFilter f = new IntentFilter();
        f.addAction(Intent.ACTION_SCREEN_OFF);
        f.addAction(Intent.ACTION_SCREEN_ON);
        f.addAction(Intent.ACTION_USER_PRESENT);
        if (android.os.Build.VERSION.SDK_INT >= 33) registerReceiver(screen, f, Context.RECEIVER_NOT_EXPORTED);
        else registerReceiver(screen, f);
        Notify.channels(this);
        Sync.schedule(this);
        main.postDelayed(tick, 5_000);
    }

    @Override
    public void onDestroy() {
        closeSegment();
        try {
            unregisterReceiver(screen);
        } catch (Exception ignored) {
        }
        main.removeCallbacks(tick);
        hideOverlay();
        instance = null;
        super.onDestroy();
    }

    @Override
    public void onInterrupt() {
    }

    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        if (event == null || event.getPackageName() == null) return;
        String pkg = event.getPackageName().toString();
        if (pkg.equals(getPackageName()) && overlay != null) return;
        int type = event.getEventType();
        if (type == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {
            if (Sessions.isIgnored(this, pkg)) return;
            if (!pkg.equals(fgPkg)) {
                fgPkg = pkg;
                if (!Browsers.isBrowser(pkg)) closeSegment();
                if (overlay != null && !matchesLimit(overlayLimit)) hideOverlay();
                main.post(this::checkLimits);
            }
        }
        if (Browsers.isBrowser(pkg) && pkg.equals(fgPkg)) {
            long now = System.currentTimeMillis();
            if (type == AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED && now - lastRead < 1500) return;
            lastRead = now;
            readAddressBar(pkg);
        }
    }

    private void readAddressBar(String pkg) {
        AccessibilityNodeInfo root = getRootInActiveWindow();
        if (root == null) return;
        try {
            if (root.getPackageName() == null || !pkg.equals(root.getPackageName().toString())) return;
            Browsers.Info info = Browsers.ALL.get(pkg);
            String text = null;
            for (String id : info.urlBarIds) {
                List<AccessibilityNodeInfo> nodes = root.findAccessibilityNodeInfosByViewId(pkg + ":id/" + id);
                if (nodes != null && !nodes.isEmpty()) {
                    AccessibilityNodeInfo n = nodes.get(0);
                    if (n.isFocused()) return; // The person is typing a new address.
                    CharSequence t = n.getText();
                    if (t != null) text = t.toString();
                    break;
                }
            }
            String domain = Browsers.domainOf(text);
            if (domain == null) return;
            String url = text.startsWith("http") ? text : "https://" + text;
            if (url.length() > 500) url = url.substring(0, 500);
            String title = null;
            CharSequence wt = root.getContentDescription();
            if (wt != null) title = wt.toString();
            onSite(pkg, domain, url, title);
        } finally {
            root.recycle();
        }
    }

    private void onSite(String pkg, String domain, String url, String title) {
        long now = System.currentTimeMillis();
        if (domain.equals(segDomain) && pkg.equals(segPkg) && segId >= 0) {
            segUrl = url;
            return;
        }
        closeSegment();
        segPkg = pkg;
        segDomain = domain;
        segUrl = url;
        segTitle = title;
        final String bName = Browsers.ALL.get(pkg).name;
        segId = Store.get(this).openSegment(pkg, bName, domain, url, title, now);
        if (overlay != null && !matchesLimit(overlayLimit)) hideOverlay();
        main.post(this::checkLimits);
    }

    /** Saves how long the current website has been on screen. Called before every sync. */
    synchronized void flushSegment() {
        if (segId >= 0 && screenOn) Store.get(this).touchSegment(segId, System.currentTimeMillis(), segUrl, segTitle);
    }

    private synchronized void closeSegment() {
        if (segId >= 0) Store.get(this).touchSegment(segId, System.currentTimeMillis(), segUrl, segTitle);
        segId = -1;
        segDomain = null;
        segPkg = null;
    }

    // ---------- periodic work ----------
    private void onTick() {
        long now = System.currentTimeMillis();
        if (screenOn) flushSegment();
        if (now - lastSync > 5 * 60_000L) {
            lastSync = now;
            bg.execute(() -> Sync.run(this));
        } else if (now - lastStatus > 2 * 60_000L) {
            lastStatus = now;
            bg.execute(() -> Sync.refreshStatus(this));
        }
        checkLimits();
        maybeReport();
    }

    private void maybeReport() {
        Calendar c = Calendar.getInstance();
        if (c.get(Calendar.HOUR_OF_DAY) < 21) return;
        String today = String.format(Locale.US, "%d-%02d-%02d", c.get(Calendar.YEAR), c.get(Calendar.MONTH) + 1, c.get(Calendar.DAY_OF_MONTH));
        if (today.equals(Store.get(this).prefs().getString("report_day", ""))) return;
        Store.get(this).prefs().edit().putString("report_day", today).apply();
        bg.execute(() -> {
            try {
                Sync.run(this);
                JSONObject r = Sync.call(this, "report", null, null);
                Notify.report(this, r.optString("title", "Your screen time today"), r.optString("text", ""));
            } catch (Exception e) {
                Store.get(this).prefs().edit().remove("report_day").apply();
            }
        });
    }

    // ---------- limits ----------
    private List<Sessions.Piece> pieces() {
        long now = System.currentTimeMillis();
        if (todayPieces == null || now - piecesAt > 60_000) {
            if (screenOn) flushSegment();
            todayPieces = Sessions.pieces(this, Sessions.midnight(now, 0), now);
            piecesAt = now;
        }
        return todayPieces;
    }

    private static boolean match(JSONObject limit, String pkg, String domain) {
        if (domain != null) {
            JSONArray ds = limit.optJSONArray("match_domains");
            if (ds != null) for (int i = 0; i < ds.length(); i++) {
                String d = ds.optString(i);
                if (domain.equals(d) || domain.endsWith("." + d)) return true;
            }
            return false;
        }
        if (pkg == null) return false;
        JSONArray as = limit.optJSONArray("match_apps");
        if (as != null) for (int i = 0; i < as.length(); i++) if (pkg.equalsIgnoreCase(as.optString(i))) return true;
        return false;
    }

    private boolean matchesLimit(String limitId) {
        if (limitId == null) return false;
        JSONObject st = Sync.cachedStatus(this);
        if (st == null) return false;
        JSONArray ls = st.optJSONArray("limits");
        if (ls == null) return false;
        for (int i = 0; i < ls.length(); i++) {
            JSONObject l = ls.optJSONObject(i);
            if (l != null && limitId.equals(l.optString("id"))) return match(l, fgPkg, currentDomain());
        }
        return false;
    }

    private String currentDomain() {
        return Browsers.isBrowser(fgPkg) && fgPkg.equals(segPkg) ? segDomain : null;
    }

    private void checkLimits() {
        if (!screenOn || fgPkg == null) return;
        JSONObject st = Sync.cachedStatus(this);
        if (st == null) return;
        JSONArray ls = st.optJSONArray("limits");
        if (ls == null) return;
        String domain = currentDomain();
        Calendar c = Calendar.getInstance();
        String today = c.get(Calendar.YEAR) + "-" + c.get(Calendar.DAY_OF_YEAR);
        for (int i = 0; i < ls.length(); i++) {
            JSONObject l = ls.optJSONObject(i);
            if (l == null || !match(l, fgPkg, domain)) continue;
            long own = 0;
            for (Sessions.Piece p : pieces()) if (match(l, p.pkg, p.domain)) own += p.seconds();
            long used = own + l.optLong("other_devices_seconds", 0);
            long cap = l.optLong("daily_minutes", 60) * 60;
            String id = l.optString("id");
            String label = l.optString("label", l.optString("target"));
            int usedMin = (int) (used / 60);
            if (used >= cap) {
                Long until = snoozeUntil.get(id);
                if ((until == null || System.currentTimeMillis() > until) && overlay == null) showOverlay(id, label, usedMin, (int) (cap / 60));
            } else if (used >= cap * 8 / 10) {
                String key = "warned_" + id + "_" + today;
                if (!Store.get(this).prefs().getBoolean(key, false)) {
                    Store.get(this).prefs().edit().putBoolean(key, true).apply();
                    Notify.warn(this, label, usedMin, (int) (cap / 60));
                    Store.get(this).addNudge(label, "warn", usedMin);
                }
            }
            return;
        }
    }

    private int dp(float v) {
        return Math.round(TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v, getResources().getDisplayMetrics()));
    }

    private void showOverlay(String limitId, String label, int usedMin, int capMin) {
        WindowManager wm = (WindowManager) getSystemService(WINDOW_SERVICE);
        if (wm == null) return;
        LinearLayout box = new LinearLayout(this);
        box.setOrientation(LinearLayout.VERTICAL);
        box.setGravity(Gravity.CENTER);
        box.setBackgroundColor(Color.parseColor("#E61A1512"));
        box.setPadding(dp(28), dp(28), dp(28), dp(28));

        LinearLayout card = new LinearLayout(this);
        card.setOrientation(LinearLayout.VERTICAL);
        card.setPadding(dp(28), dp(28), dp(28), dp(24));
        GradientDrawable bgd = new GradientDrawable();
        bgd.setColor(Color.parseColor("#F6F2F1"));
        bgd.setCornerRadius(dp(6));
        card.setBackground(bgd);

        TextView kicker = new TextView(this);
        kicker.setText("DAILY LIMIT REACHED");
        kicker.setTextColor(Color.parseColor("#8C6A18"));
        kicker.setTextSize(11);
        kicker.setLetterSpacing(0.18f);
        card.addView(kicker);

        TextView title = new TextView(this);
        title.setText(usedMin + " min on " + label + " today");
        title.setTextColor(Color.parseColor("#1A1512"));
        title.setTextSize(26);
        title.setTypeface(Typeface.SERIF);
        title.setPadding(0, dp(10), 0, dp(8));
        card.addView(title);

        TextView body = new TextView(this);
        body.setText("Your limit is " + capMin + " min across your Mac and phone. Close it now and the rest of your evening is yours.");
        body.setTextColor(Color.parseColor("#38302A"));
        body.setTextSize(17);
        body.setLineSpacing(0, 1.3f);
        card.addView(body);

        Button leave = new Button(this);
        leave.setText("Close " + label);
        leave.setAllCaps(true);
        leave.setTextColor(Color.parseColor("#F6F2F1"));
        leave.setBackgroundColor(Color.parseColor("#1A1512"));
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, dp(52));
        lp.topMargin = dp(22);
        card.addView(leave, lp);

        Button more = new Button(this);
        more.setText("Give me 10 more minutes");
        more.setAllCaps(false);
        more.setTextColor(Color.parseColor("#38302A"));
        more.setBackgroundColor(Color.TRANSPARENT);
        LinearLayout.LayoutParams lp2 = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, dp(48));
        lp2.topMargin = dp(6);
        card.addView(more, lp2);

        box.addView(card, new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT));

        leave.setOnClickListener(v -> {
            Store.get(this).addNudge(label, "closed", usedMin);
            hideOverlay();
            performGlobalAction(GLOBAL_ACTION_HOME);
        });
        more.setOnClickListener(v -> {
            snoozeUntil.put(limitId, System.currentTimeMillis() + 10 * 60_000L);
            Store.get(this).addNudge(label, "snooze", usedMin);
            hideOverlay();
        });

        WindowManager.LayoutParams p = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.MATCH_PARENT,
                WindowManager.LayoutParams.MATCH_PARENT,
                WindowManager.LayoutParams.TYPE_ACCESSIBILITY_OVERLAY,
                WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN,
                PixelFormat.TRANSLUCENT);
        try {
            wm.addView(box, p);
            overlay = box;
            overlayLimit = limitId;
            Store.get(this).addNudge(label, "limit", usedMin);
        } catch (Exception ignored) {
        }
    }

    private void hideOverlay() {
        if (overlay == null) return;
        try {
            WindowManager wm = (WindowManager) getSystemService(WINDOW_SERVICE);
            if (wm != null) wm.removeView(overlay);
        } catch (Exception ignored) {
        }
        overlay = null;
        overlayLimit = null;
    }
}
