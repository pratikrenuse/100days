package com.pratikrenuse.screentime;

import android.Manifest;
import android.app.AppOpsManager;
import android.app.job.JobInfo;
import android.app.job.JobScheduler;
import android.content.ComponentName;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Process;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

/** Talks to the Screen Time backend: uploads sessions, fetches limits and the daily report. */
final class Sync {
    static final String VERSION = "1.0";
    private static final Object LOCK = new Object();

    static boolean hasUsageAccess(Context ctx) {
        AppOpsManager ops = (AppOpsManager) ctx.getSystemService(Context.APP_OPS_SERVICE);
        if (ops == null) return false;
        int mode;
        if (Build.VERSION.SDK_INT >= 29) mode = ops.unsafeCheckOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, Process.myUid(), ctx.getPackageName());
        else mode = ops.checkOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, Process.myUid(), ctx.getPackageName());
        return mode == AppOpsManager.MODE_ALLOWED;
    }

    static void schedule(Context ctx) {
        JobScheduler js = (JobScheduler) ctx.getSystemService(Context.JOB_SCHEDULER_SERVICE);
        if (js == null) return;
        JobInfo job = new JobInfo.Builder(4207, new ComponentName(ctx, SyncJob.class))
                .setPeriodic(15 * 60 * 1000L)
                .setRequiredNetworkType(JobInfo.NETWORK_TYPE_ANY)
                .setPersisted(true)
                .build();
        js.schedule(job);
    }

    // ---------- HTTP ----------
    static JSONObject call(Context ctx, String action, String query, JSONObject body) throws Exception {
        Store st = Store.get(ctx);
        String u = st.server() + "?action=" + action + (query == null ? "" : query);
        HttpURLConnection c = (HttpURLConnection) new URL(u).openConnection();
        c.setConnectTimeout(15000);
        c.setReadTimeout(30000);
        c.setRequestProperty("x-st-token", st.token());
        c.setRequestProperty("Content-Type", "application/json");
        if (body != null) {
            c.setRequestMethod("POST");
            c.setDoOutput(true);
            byte[] b = body.toString().getBytes("UTF-8");
            OutputStream os = c.getOutputStream();
            os.write(b);
            os.close();
        }
        int code = c.getResponseCode();
        InputStream in = code >= 400 ? c.getErrorStream() : c.getInputStream();
        ByteArrayOutputStream bo = new ByteArrayOutputStream();
        if (in != null) {
            byte[] buf = new byte[8192];
            int n;
            while ((n = in.read(buf)) > 0) bo.write(buf, 0, n);
            in.close();
        }
        c.disconnect();
        String text = bo.toString("UTF-8");
        JSONObject j = text.isEmpty() ? new JSONObject() : new JSONObject(text);
        if (code >= 400) throw new Exception(j.optString("error", "Server error " + code));
        return j;
    }

    static String iso(long ms) {
        SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US);
        f.setTimeZone(TimeZone.getTimeZone("UTC"));
        return f.format(new Date(ms));
    }

    // ---------- location ----------
    static double[] location(Context ctx) {
        if (ctx.checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) return null;
        try {
            LocationManager lm = (LocationManager) ctx.getSystemService(Context.LOCATION_SERVICE);
            if (lm == null) return null;
            Location best = null;
            for (String p : lm.getProviders(true)) {
                Location l = lm.getLastKnownLocation(p);
                if (l != null && (best == null || l.getTime() > best.getTime())) best = l;
            }
            if (best == null || System.currentTimeMillis() - best.getTime() > 6 * 3600_000L) return null;
            return new double[]{Math.round(best.getLatitude() * 10000) / 10000.0, Math.round(best.getLongitude() * 10000) / 10000.0};
        } catch (SecurityException e) {
            return null;
        }
    }

    @SuppressWarnings("deprecation")
    static String ssid(Context ctx) {
        if (ctx.checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) return null;
        try {
            WifiManager wm = (WifiManager) ctx.getApplicationContext().getSystemService(Context.WIFI_SERVICE);
            if (wm == null) return null;
            WifiInfo wi = wm.getConnectionInfo();
            if (wi == null) return null;
            String s = wi.getSSID();
            if (s == null || s.contains("unknown ssid") || s.equals("0x")) return null;
            if (s.startsWith("\"") && s.endsWith("\"") && s.length() >= 2) s = s.substring(1, s.length() - 1);
            return s.isEmpty() ? null : s;
        } catch (Exception e) {
            return null;
        }
    }

    // ---------- the sync itself ----------
    /** Uploads new and changed sessions from yesterday and today. Returns a short status line. */
    static String run(Context ctx) {
        synchronized (LOCK) {
            Store st = Store.get(ctx);
            SharedPreferences p = st.prefs();
            if (st.token().isEmpty()) return "Add your device key first.";
            if (!hasUsageAccess(ctx)) return "Turn on usage access first.";
            long now = System.currentTimeMillis();
            long from = Sessions.midnight(now, -1);
            try {
                Tracker t = Tracker.instance;
                if (t != null) t.flushSegment();
                List<Sessions.Piece> pieces = Sessions.pieces(ctx, from, now);
                double[] loc = location(ctx);
                String wifi = ssid(ctx);
                JSONArray events = new JSONArray();
                List<Sessions.Piece> changed = new ArrayList<>();
                for (Sessions.Piece pc : pieces) {
                    long prev = st.sentEnd(pc.uid);
                    if (prev == pc.end) continue;
                    JSONObject e = new JSONObject();
                    e.put("uid", pc.uid);
                    e.put("start", iso(pc.start));
                    e.put("end", iso(pc.end));
                    e.put("app_id", pc.pkg);
                    e.put("app_name", pc.appName);
                    if (pc.browser != null) e.put("browser", pc.browser);
                    if (pc.domain != null) e.put("domain", pc.domain);
                    if (pc.url != null) e.put("url", pc.url);
                    if (pc.title != null) e.put("title", pc.title);
                    // Location is only known for recent sessions, so tag the ones from the last 20 minutes.
                    if (now - pc.end < 20 * 60_000L) {
                        if (wifi != null) e.put("ssid", wifi);
                        if (loc != null) {
                            e.put("lat", loc[0]);
                            e.put("lon", loc[1]);
                        }
                    }
                    events.put(e);
                    changed.add(pc);
                    if (events.length() >= 800) break;
                }
                List<Store.Nudge> nudges = st.unsentNudges();
                JSONArray nj = new JSONArray();
                for (Store.Nudge n : nudges) {
                    JSONObject o = new JSONObject();
                    o.put("uid", n.uid);
                    o.put("at", iso(n.at));
                    o.put("target", n.target);
                    o.put("kind", n.kind);
                    o.put("used_minutes", n.used);
                    nj.put(o);
                }
                for (Long ut : Sessions.unlocks(ctx, from, now)) {
                    JSONObject o = new JSONObject();
                    o.put("uid", "android-unlock-" + ut);
                    o.put("at", iso(ut));
                    o.put("target", "Phone");
                    o.put("kind", "unlock");
                    o.put("used_minutes", 0);
                    nj.put(o);
                }
                JSONObject device = new JSONObject();
                device.put("id", st.deviceId());
                device.put("kind", "android");
                device.put("name", Build.MANUFACTURER + " " + Build.MODEL);
                device.put("version", VERSION);
                JSONObject body = new JSONObject();
                body.put("device", device);
                body.put("events", events);
                body.put("nudges", nj);
                call(ctx, "ingest", null, body);
                for (Sessions.Piece pc : changed) st.markSent(pc.uid, pc.start, pc.end);
                st.markNudgesSent(nudges);
                st.prune(Sessions.midnight(now, -3));
                refreshStatus(ctx);
                String msg = "Synced " + changed.size() + " sessions at " + new SimpleDateFormat("h:mm a", Locale.US).format(new Date());
                p.edit().putString("last_sync", msg).putLong("last_sync_ms", now).remove("last_error").apply();
                return msg;
            } catch (Exception e) {
                String msg = "Sync failed: " + e.getMessage();
                p.edit().putString("last_error", msg).apply();
                return msg;
            }
        }
    }

    /** Fetches limits and the other devices' usage for today, cached for the tracker. */
    static void refreshStatus(Context ctx) {
        try {
            Store st = Store.get(ctx);
            JSONObject s = call(ctx, "status", "&device=" + URLEncoder.encode(st.deviceId(), "UTF-8"), null);
            st.prefs().edit().putString("status", s.toString()).putLong("status_ms", System.currentTimeMillis()).apply();
        } catch (Exception ignored) {
        }
    }

    static JSONObject cachedStatus(Context ctx) {
        try {
            String s = Store.get(ctx).prefs().getString("status", null);
            return s == null ? null : new JSONObject(s);
        } catch (Exception e) {
            return null;
        }
    }
}
