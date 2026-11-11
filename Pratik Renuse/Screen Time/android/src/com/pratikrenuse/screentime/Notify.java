package com.pratikrenuse.screentime;

import android.Manifest;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;

final class Notify {
    static void channels(Context ctx) {
        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null) return;
        nm.createNotificationChannel(new NotificationChannel("limits", "Limit heads-ups", NotificationManager.IMPORTANCE_HIGH));
        nm.createNotificationChannel(new NotificationChannel("report", "Daily report", NotificationManager.IMPORTANCE_DEFAULT));
    }

    private static boolean allowed(Context ctx) {
        return Build.VERSION.SDK_INT < 33 || ctx.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED;
    }

    private static PendingIntent openDashboard(Context ctx) {
        Intent i = new Intent(ctx, DashboardActivity.class);
        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        return PendingIntent.getActivity(ctx, 1, i, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
    }

    static void warn(Context ctx, String label, int used, int cap) {
        if (!allowed(ctx)) return;
        channels(ctx);
        Notification n = new Notification.Builder(ctx, "limits")
                .setSmallIcon(android.R.drawable.ic_popup_reminder)
                .setContentTitle(label + ": " + used + " of " + cap + " min used")
                .setContentText("You have about " + Math.max(1, cap - used) + " min left today across Mac and phone.")
                .setAutoCancel(true)
                .setContentIntent(openDashboard(ctx))
                .build();
        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm != null) nm.notify(label.hashCode(), n);
    }

    static void report(Context ctx, String title, String text) {
        if (!allowed(ctx)) return;
        channels(ctx);
        Notification n = new Notification.Builder(ctx, "report")
                .setSmallIcon(android.R.drawable.ic_menu_recent_history)
                .setContentTitle(title)
                .setContentText(text)
                .setStyle(new Notification.BigTextStyle().bigText(text))
                .setAutoCancel(true)
                .setContentIntent(openDashboard(ctx))
                .build();
        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm != null) nm.notify(2100, n);
    }
}
