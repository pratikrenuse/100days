package com.pratikrenuse.screentime;

import android.content.ContentValues;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.res.AssetManager;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.provider.Settings;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

/** Settings, the baked-in server config and the small local database. */
final class Store extends SQLiteOpenHelper {
    private static Store instance;
    private final Context app;
    private final Properties config = new Properties();

    static synchronized Store get(Context c) {
        if (instance == null) instance = new Store(c.getApplicationContext());
        return instance;
    }

    private Store(Context c) {
        super(c, "screentime.db", null, 1);
        app = c;
        try {
            AssetManager am = c.getAssets();
            InputStream in = am.open("config.properties");
            config.load(in);
            in.close();
        } catch (Exception ignored) {
        }
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("CREATE TABLE segments (id INTEGER PRIMARY KEY AUTOINCREMENT, pkg TEXT NOT NULL, browser TEXT, domain TEXT NOT NULL, url TEXT, title TEXT, start_ms INTEGER NOT NULL, end_ms INTEGER NOT NULL)");
        db.execSQL("CREATE INDEX seg_time ON segments(start_ms)");
        db.execSQL("CREATE TABLE sent (uid TEXT PRIMARY KEY, end_ms INTEGER NOT NULL, start_ms INTEGER NOT NULL)");
        db.execSQL("CREATE TABLE nudges (uid TEXT PRIMARY KEY, at_ms INTEGER NOT NULL, target TEXT, kind TEXT, used_minutes INTEGER, sent INTEGER NOT NULL DEFAULT 0)");
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldV, int newV) {
    }

    // ---------- config ----------
    String server() {
        String s = prefs().getString("server", null);
        if (s == null || s.isEmpty()) s = config.getProperty("server", "https://spymrfgkwfjrcealulfh.supabase.co/functions/v1/screentime");
        return s;
    }

    String token() {
        String t = prefs().getString("token", null);
        if (t == null || t.isEmpty()) t = config.getProperty("token", "");
        return t.trim();
    }

    void setToken(String t) {
        prefs().edit().putString("token", t.trim()).apply();
    }

    String deviceId() {
        String id = prefs().getString("device_id", null);
        if (id == null) {
            String a = Settings.Secure.getString(app.getContentResolver(), Settings.Secure.ANDROID_ID);
            id = "android-" + (a == null ? Long.toHexString(System.nanoTime()) : a);
            prefs().edit().putString("device_id", id).apply();
        }
        return id;
    }

    SharedPreferences prefs() {
        return app.getSharedPreferences("screentime", Context.MODE_PRIVATE);
    }

    // ---------- segments (website visits seen by the accessibility service) ----------
    long openSegment(String pkg, String browser, String domain, String url, String title, long start) {
        ContentValues v = new ContentValues();
        v.put("pkg", pkg);
        v.put("browser", browser);
        v.put("domain", domain);
        v.put("url", url);
        v.put("title", title);
        v.put("start_ms", start);
        v.put("end_ms", start);
        return getWritableDatabase().insert("segments", null, v);
    }

    void touchSegment(long id, long end, String url, String title) {
        ContentValues v = new ContentValues();
        v.put("end_ms", end);
        if (url != null) v.put("url", url);
        if (title != null) v.put("title", title);
        getWritableDatabase().update("segments", v, "id=?", new String[]{String.valueOf(id)});
    }

    static final class Segment {
        String pkg, browser, domain, url, title;
        long start, end;
    }

    List<Segment> segments(long from, long to) {
        List<Segment> out = new ArrayList<>();
        Cursor c = getReadableDatabase().rawQuery(
                "SELECT pkg, browser, domain, url, title, start_ms, end_ms FROM segments WHERE end_ms >= ? AND start_ms <= ? ORDER BY start_ms",
                new String[]{String.valueOf(from), String.valueOf(to)});
        try {
            while (c.moveToNext()) {
                Segment s = new Segment();
                s.pkg = c.getString(0);
                s.browser = c.getString(1);
                s.domain = c.getString(2);
                s.url = c.getString(3);
                s.title = c.getString(4);
                s.start = c.getLong(5);
                s.end = c.getLong(6);
                out.add(s);
            }
        } finally {
            c.close();
        }
        return out;
    }

    // ---------- upload bookkeeping ----------
    long sentEnd(String uid) {
        Cursor c = getReadableDatabase().rawQuery("SELECT end_ms FROM sent WHERE uid=?", new String[]{uid});
        try {
            return c.moveToFirst() ? c.getLong(0) : -1;
        } finally {
            c.close();
        }
    }

    void markSent(String uid, long start, long end) {
        ContentValues v = new ContentValues();
        v.put("uid", uid);
        v.put("start_ms", start);
        v.put("end_ms", end);
        getWritableDatabase().insertWithOnConflict("sent", null, v, SQLiteDatabase.CONFLICT_REPLACE);
    }

    void prune(long before) {
        SQLiteDatabase db = getWritableDatabase();
        db.delete("sent", "start_ms < ?", new String[]{String.valueOf(before)});
        db.delete("segments", "end_ms < ?", new String[]{String.valueOf(before)});
        db.delete("nudges", "sent = 1 AND at_ms < ?", new String[]{String.valueOf(before)});
    }

    // ---------- nudges ----------
    void addNudge(String target, String kind, int usedMinutes) {
        long now = System.currentTimeMillis();
        ContentValues v = new ContentValues();
        v.put("uid", "n-" + now + "-" + kind);
        v.put("at_ms", now);
        v.put("target", target);
        v.put("kind", kind);
        v.put("used_minutes", usedMinutes);
        getWritableDatabase().insertWithOnConflict("nudges", null, v, SQLiteDatabase.CONFLICT_REPLACE);
    }

    static final class Nudge {
        String uid, target, kind;
        long at;
        int used;
    }

    List<Nudge> unsentNudges() {
        List<Nudge> out = new ArrayList<>();
        Cursor c = getReadableDatabase().rawQuery("SELECT uid, at_ms, target, kind, used_minutes FROM nudges WHERE sent = 0 LIMIT 200", null);
        try {
            while (c.moveToNext()) {
                Nudge n = new Nudge();
                n.uid = c.getString(0);
                n.at = c.getLong(1);
                n.target = c.getString(2);
                n.kind = c.getString(3);
                n.used = c.getInt(4);
                out.add(n);
            }
        } finally {
            c.close();
        }
        return out;
    }

    void markNudgesSent(List<Nudge> list) {
        SQLiteDatabase db = getWritableDatabase();
        for (Nudge n : list) {
            ContentValues v = new ContentValues();
            v.put("sent", 1);
            db.update("nudges", v, "uid=?", new String[]{n.uid});
        }
    }
}
