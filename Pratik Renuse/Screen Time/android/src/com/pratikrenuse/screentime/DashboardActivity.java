package com.pratikrenuse.screentime;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;

/** The full dashboard, bundled inside the app and signed in with this phone's device key. */
public class DashboardActivity extends Activity {
    private WebView web;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        web = new WebView(this);
        web.setBackgroundColor(Color.parseColor("#F6F2F1"));
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest req) {
                Uri u = req.getUrl();
                if (u != null && "screentime.app".equals(u.getHost())) return false;
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, u));
                } catch (Exception ignored) {
                }
                return true;
            }
        });
        setContentView(web);
        try {
            InputStream in = getAssets().open("dashboard.html");
            ByteArrayOutputStream bo = new ByteArrayOutputStream();
            byte[] buf = new byte[8192];
            int n;
            while ((n = in.read(buf)) > 0) bo.write(buf, 0, n);
            in.close();
            String html = bo.toString("UTF-8");
            String inject = "window.ST_TOKEN=" + JSONObject.quote(Store.get(this).token()) + ";";
            html = html.replace("/*ST_INJECT*/", inject);
            web.loadDataWithBaseURL("https://screentime.app/", html, "text/html", "UTF-8", null);
        } catch (Exception e) {
            web.loadData("<p style='font-family:sans-serif;padding:24px'>Could not open the dashboard: " + e.getMessage() + "</p>", "text/html", "UTF-8");
        }
    }

    @Override
    public void onBackPressed() {
        if (web != null && web.canGoBack()) web.goBack();
        else super.onBackPressed();
    }
}
