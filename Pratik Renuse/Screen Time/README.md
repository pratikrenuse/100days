# Screen Time

Private screen-time tracker for Pratik's Mac and Android phone. Internal only, not for release.

## What is here

- `install.sh` builds and installs the Mac app, then builds the Android app. Run it from Terminal:
  `bash "/Users/pratikrenuse/Documents/GitHub/100days/Pratik Renuse/Screen Time/install.sh"`
  Use `install.sh mac` or `install.sh android` to build only one of them.
- `mac/` is the Mac menu bar app (Swift). It tracks the front app, the window title and the open website in Chrome, Safari, Arc, Brave, Edge, Vivaldi and Opera. It counts every second the screen is on and unlocked.
- `android/` is the phone app (Java). It reads Android's usage log for app time and the browser address bar for websites, through the Accessibility permission.
- `dashboard/index.html` is the dashboard. Both apps ship it inside and open it with their device key. You can also open the file in a browser and sign in with the dashboard password.
- `backend/` is the Supabase Edge Function `screentime` and the database tables. Both are already deployed to the Supabase project `spymrfgkwfjrcealulfh`.

## Secrets

`.secrets/` holds the device key, the dashboard password and the Android signing key. It is listed in `.gitignore`, so it never reaches GitHub. Keep the signing key: without it, a new Android build cannot update the installed app.

## How the data flows

Mac app and phone app keep a local queue, then upload sessions to the `screentime` function every 1 to 5 minutes. Limits are set in the dashboard and reach both devices within 2 minutes. A limit counts the Mac and the phone together, and a website limit also covers its phone app (youtube.com covers the YouTube app).

## Always on

The Mac app has no Quit option and refuses Cmd+Q. A keep-alive agent (`~/Library/LaunchAgents/com.pratikrenuse.screentime.plist`, set up by `install.sh`) starts it at login and restarts it within 5 seconds if it is force quit. Only a logout, restart or shutdown closes it.

To remove it for good, run in Terminal:
`launchctl bootout gui/$(id -u)/com.pratikrenuse.screentime && rm ~/Library/LaunchAgents/com.pratikrenuse.screentime.plist`
then delete Screen Time from Applications.
