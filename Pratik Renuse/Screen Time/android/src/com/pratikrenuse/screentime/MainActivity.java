package com.pratikrenuse.screentime;

import android.Manifest;
import android.app.Activity;
import android.content.ComponentName;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.graphics.Typeface;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.PowerManager;
import android.provider.Settings;
import android.text.InputType;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONObject;

/** Setup checklist, today at a glance, and the way into the dashboard. */
public class MainActivity extends Activity {
    private static final int INK = Color.parseColor("#1A1512");
    private static final int INK2 = Color.parseColor("#38302A");
    private static final int INK4 = Color.parseColor("#786E66");
    private static final int GOLD = Color.parseColor("#8C6A18");
    private static final int BG = Color.parseColor("#F6F2F1");
    private static final int SURFACE = Color.parseColor("#EEE8E4");
    private static final int OK = Color.parseColor("#3C7A4A");

    private LinearLayout root;
    private final Handler main = new Handler(Looper.getMainLooper());

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        Notify.channels(this);
        Sync.schedule(this);
        ScrollView sv = new ScrollView(this);
        sv.setBackgroundColor(BG);
        root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(dp(22), dp(36), dp(22), dp(40));
        sv.addView(root);
        setContentView(sv);
    }

    @Override
    protected void onResume() {
        super.onResume();
        build();
        if (Sync.hasUsageAccess(this)) new Thread(() -> {
            Sync.run(getApplicationContext());
            main.post(this::build);
        }).start();
    }

    private int dp(float v) {
        return Math.round(TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, v, getResources().getDisplayMetrics()));
    }

    private TextView text(String s, float size, int color, boolean serif) {
        TextView t = new TextView(this);
        t.setText(s);
        t.setTextSize(size);
        t.setTextColor(color);
        t.setLineSpacing(0, 1.25f);
        if (serif) t.setTypeface(Typeface.SERIF);
        return t;
    }

    private TextView label(String s) {
        TextView t = text(s.toUpperCase(), 11, GOLD, false);
        t.setLetterSpacing(0.18f);
        t.setPadding(0, dp(26), 0, dp(10));
        return t;
    }

    private Button button(String s, boolean primary, View.OnClickListener l) {
        Button b = new Button(this);
        b.setText(s);
        b.setAllCaps(true);
        b.setLetterSpacing(0.1f);
        b.setTextColor(primary ? BG : INK2);
        b.setBackgroundColor(primary ? INK : SURFACE);
        b.setOnClickListener(l);
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, dp(52));
        lp.topMargin = dp(10);
        b.setLayoutParams(lp);
        return b;
    }

    private static String fmt(long sec) {
        long m = Math.round(sec / 60.0);
        if (m < 60) return m + "m";
        return (m / 60) + "h " + String.format("%02d", m % 60) + "m";
    }

    private boolean accessibilityOn() {
        String s = Settings.Secure.getString(getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
        if (s == null) return false;
        String me = new ComponentName(this, Tracker.class).flattenToString();
        for (String part : s.split(":")) if (part.equalsIgnoreCase(me)) return true;
        return false;
    }

    private boolean granted(String perm) {
        return checkSelfPermission(perm) == PackageManager.PERMISSION_GRANTED;
    }

    private void step(int n, String title, String why, boolean done, String action, View.OnClickListener l) {
        LinearLayout row = new LinearLayout(this);
        row.setOrientation(LinearLayout.VERTICAL);
        row.setPadding(dp(18), dp(16), dp(18), dp(16));
        row.setBackgroundColor(SURFACE);
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        lp.bottomMargin = dp(8);
        row.setLayoutParams(lp);
        TextView t = text((done ? "✓  " : n + ".  ") + title, 17, done ? OK : INK, false);
        row.addView(t);
        if (!done) {
            TextView w = text(why, 15, INK2, false);
            w.setPadding(0, dp(4), 0, 0);
            row.addView(w);
            row.addView(button(action, true, l));
        }
        root.addView(row);
    }

    private void build() {
        root.removeAllViews();
        Store st = Store.get(this);
        root.addView(text("Screen Time", 34, INK, true));

        JSONObject status = Sync.cachedStatus(this);
        if (status != null) {
            JSONObject t = status.optJSONObject("today_seconds");
            long mac = t == null ? 0 : t.optLong("mac"), ph = t == null ? 0 : t.optLong("android");
            root.addView(label("Today, both devices"));
            root.addView(text(fmt(mac + ph), 48, INK, true));
            root.addView(text("Mac " + fmt(mac) + "   Phone " + fmt(ph), 16, INK2, false));
            JSONArray top = status.optJSONArray("top_today");
            if (top != null && top.length() > 0) {
                LinearLayout list = new LinearLayout(this);
                list.setOrientation(LinearLayout.VERTICAL);
                list.setPadding(0, dp(14), 0, 0);
                for (int i = 0; i < Math.min(5, top.length()); i++) {
                    JSONObject it = top.optJSONObject(i);
                    LinearLayout r = new LinearLayout(this);
                    r.setOrientation(LinearLayout.HORIZONTAL);
                    r.setPadding(0, dp(5), 0, dp(5));
                    TextView name = text(it.optString("label"), 16, INK, false);
                    r.addView(name, new LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1));
                    r.addView(text(fmt(it.optLong("seconds")), 16, INK2, false));
                    list.addView(r);
                }
                root.addView(list);
            }
        }
        root.addView(button("Open dashboard", true, v -> startActivity(new Intent(this, DashboardActivity.class))));
        root.addView(button("Sync now", false, v -> {
            ((Button) v).setText("Syncing");
            new Thread(() -> {
                String msg = Sync.run(getApplicationContext());
                main.post(() -> {
                    build();
                    android.widget.Toast.makeText(this, msg, android.widget.Toast.LENGTH_LONG).show();
                });
            }).start();
        }));
        String last = st.prefs().getString("last_error", null);
        if (last == null) last = st.prefs().getString("last_sync", "Not synced yet.");
        TextView ls = text(last, 14, INK4, false);
        ls.setPadding(0, dp(8), 0, 0);
        root.addView(ls);

        root.addView(label("Setup"));
        int n = 1;
        if (st.token().isEmpty()) {
            LinearLayout row = new LinearLayout(this);
            row.setOrientation(LinearLayout.VERTICAL);
            row.setBackgroundColor(SURFACE);
            row.setPadding(dp(18), dp(16), dp(18), dp(16));
            row.addView(text(n + ".  Paste your device key", 17, INK, false));
            final EditText key = new EditText(this);
            key.setHint("st_...");
            key.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD);
            row.addView(key);
            row.addView(button("Save key", true, v -> {
                st.setToken(key.getText().toString());
                build();
            }));
            root.addView(row);
        }
        n++;
        step(n++, "Allow usage access", "Lets the app read how long each app was open. Find Screen Time in the list and switch it on.",
                Sync.hasUsageAccess(this), "Open usage access", v -> startActivity(new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS)));
        boolean acc = accessibilityOn();
        if (Build.VERSION.SDK_INT >= 33 && !acc) {
            step(n++, "Allow restricted settings", "Android hides Accessibility for apps installed from a file. In App info, tap the three dots at the top right, then Allow restricted settings. If you do not see the dots, skip this step.",
                    false, "Open app info", v -> startActivity(new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.parse("package:" + getPackageName()))));
        }
        step(n++, "Turn on the tracker", "Reads the website in your browser and shows limit pop-ups. Open Installed apps or Downloaded apps, tap Screen Time tracker, and switch it on.",
                acc, "Open accessibility", v -> startActivity(new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)));
        boolean notif = Build.VERSION.SDK_INT < 33 || granted(Manifest.permission.POST_NOTIFICATIONS);
        step(n++, "Allow notifications", "For the 80% heads-up and the 9 PM daily report.", notif, "Allow notifications",
                v -> requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, 1));
        boolean loc = granted(Manifest.permission.ACCESS_FINE_LOCATION);
        step(n++, "Allow location", "So the dashboard can tell home from office. Choose Precise and While using the app.", loc, "Allow location",
                v -> requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION}, 2));
        if (loc) {
            boolean bgLoc = granted(Manifest.permission.ACCESS_BACKGROUND_LOCATION);
            step(n++, "Allow location all the time", "Location is only read when sessions sync. On the next screen choose Allow all the time.", bgLoc, "Allow all the time",
                    v -> requestPermissions(new String[]{Manifest.permission.ACCESS_BACKGROUND_LOCATION}, 3));
        }
        PowerManager pm = (PowerManager) getSystemService(POWER_SERVICE);
        boolean battery = pm != null && pm.isIgnoringBatteryOptimizations(getPackageName());
        step(n, "Keep it running", "Stops Android from pausing the tracker to save battery. It uses very little.", battery, "Allow in background",
                v -> {
                    try {
                        startActivity(new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS, Uri.parse("package:" + getPackageName())));
                    } catch (Exception e) {
                        startActivity(new Intent(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS));
                    }
                });
        TextView foot = text("Device " + st.deviceId() + "  ·  version " + Sync.VERSION, 12, INK4, false);
        foot.setGravity(Gravity.START);
        foot.setPadding(0, dp(24), 0, 0);
        root.addView(foot);
    }

    @Override
    public void onRequestPermissionsResult(int code, String[] perms, int[] results) {
        super.onRequestPermissionsResult(code, perms, results);
        build();
    }
}
