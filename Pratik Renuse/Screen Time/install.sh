#!/bin/bash
# Screen Time installer. Builds and installs the Mac app, then builds the Android app.
# Run it with:  bash "/Users/pratikrenuse/Documents/GitHub/100days/Pratik Renuse/Screen Time/install.sh"
# Every run writes a log to build/install.log next to this file.

set -uo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUILD="$HERE/build"
mkdir -p "$BUILD"
LOG="$BUILD/install.log"
exec > >(tee "$LOG") 2>&1

step() { echo; echo "==> $*"; }
fail() { echo; echo "STOPPED: $*"; echo "The full log is in: $LOG"; exit 1; }

echo "Screen Time installer, $(date)"
echo "macOS $(sw_vers -productVersion), $(uname -m)"

[ -f "$HERE/.secrets/device-key.txt" ] || fail "The device key file is missing: $HERE/.secrets/device-key.txt"
TOKEN="$(tr -d '[:space:]' < "$HERE/.secrets/device-key.txt")"
SERVER="https://spymrfgkwfjrcealulfh.supabase.co/functions/v1/screentime"
ONLY="${1:-all}"

# ------------------------------------------------------------------ Mac app
if [ "$ONLY" = "all" ] || [ "$ONLY" = "mac" ]; then
  step "1 of 2: Building the Mac app"
  if ! xcrun --find swiftc >/dev/null 2>&1; then
    echo "Apple's free developer tools are not installed yet."
    echo "A window will open. Click Install and wait until it says done (about 10 minutes)."
    echo "Then run this same command again."
    xcode-select --install >/dev/null 2>&1
    exit 1
  fi
  APP="$BUILD/Screen Time.app"
  rm -rf "$APP"
  mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources"
  cp "$HERE/mac/Info.plist" "$APP/Contents/Info.plist"
  cp "$HERE/dashboard/index.html" "$APP/Contents/Resources/dashboard.html"
  iconutil -c icns "$HERE/mac/AppIcon.iconset" -o "$APP/Contents/Resources/AppIcon.icns" || fail "Could not build the app icon."
  cp "$HERE/mac/menubar.png" "$HERE/mac/menubar@2x.png" "$APP/Contents/Resources/"
  ARCH="$(uname -m)"
  xcrun swiftc -O -target "${ARCH}-apple-macos13.0" \
    -o "$APP/Contents/MacOS/ScreenTime" \
    "$HERE"/mac/Sources/*.swift \
    -framework AppKit -framework WebKit -framework CoreLocation -framework CoreWLAN \
    -framework UserNotifications -framework ServiceManagement -framework ApplicationServices \
    -lsqlite3 || fail "The Mac app did not compile. Send me the log and I will fix it."
  codesign --force --deep --sign - "$APP" || fail "Could not sign the Mac app."

  DEST="/Applications"
  [ -w "$DEST" ] || DEST="$HOME/Applications"
  mkdir -p "$DEST"
  LABEL="com.pratikrenuse.screentime"
  AGENT="$HOME/Library/LaunchAgents/$LABEL.plist"
  # Stop the keep-alive first, or macOS would restart the old copy while we replace it.
  launchctl bootout "gui/$(id -u)/$LABEL" >/dev/null 2>&1
  pkill -x ScreenTime >/dev/null 2>&1 && sleep 2
  rm -rf "$DEST/Screen Time.app"
  cp -R "$APP" "$DEST/" || fail "Could not copy the app into $DEST."
  # A new build has a new signature, so clear the old Accessibility entry and allow it once more.
  tccutil reset Accessibility "$LABEL" >/dev/null 2>&1
  tccutil reset AppleEvents "$LABEL" >/dev/null 2>&1
  defaults write "$LABEL" token "$TOKEN"

  # Keep-alive: macOS starts the app at login and restarts it within seconds if it is ever closed or force quit.
  mkdir -p "$HOME/Library/LaunchAgents"
  cat > "$AGENT" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$LABEL</string>
  <key>ProgramArguments</key><array><string>$DEST/Screen Time.app/Contents/MacOS/ScreenTime</string></array>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>ThrottleInterval</key><integer>5</integer>
  <key>ProcessType</key><string>Interactive</string>
  <key>LimitLoadToSessionType</key><string>Aqua</string>
</dict>
</plist>
PLIST
  launchctl bootstrap "gui/$(id -u)" "$AGENT" || fail "Could not set up the keep-alive."
  launchctl kickstart -k "gui/$(id -u)/$LABEL" >/dev/null 2>&1
  echo "Mac app installed in $DEST and running. Look for the ring icon in your menu bar."
  echo "It starts at login and restarts itself within 5 seconds if it is ever closed."
fi

# ------------------------------------------------------------------ Android app
if [ "$ONLY" = "all" ] || [ "$ONLY" = "android" ]; then
  step "2 of 2: Building the Android app"
  # Google's sdkmanager breaks on folder names with spaces, so the build tools live in a hidden folder without any.
  TOOLS="$HOME/.screentime-build"
  OLD_TOOLS="$HOME/Library/Application Support/ScreenTimeBuild"
  mkdir -p "$TOOLS"
  if [ ! -d "$TOOLS/jdk" ] && [ -x "$OLD_TOOLS/jdk/Contents/Home/bin/javac" ]; then mv "$OLD_TOOLS/jdk" "$TOOLS/jdk"; fi
  rm -rf "$OLD_TOOLS"

  # Java 17 or newer, needed by Google's Android build tools.
  JH=""
  if /usr/libexec/java_home -v 17+ >/dev/null 2>&1; then JH="$(/usr/libexec/java_home -v 17+)"; fi
  if [ -z "$JH" ] && [ -x "$TOOLS/jdk/Contents/Home/bin/javac" ]; then JH="$TOOLS/jdk/Contents/Home"; fi
  if [ -z "$JH" ]; then
    echo "Downloading Java 17 (Eclipse Temurin, about 190 MB)..."
    JARCH="aarch64"; [ "$(uname -m)" = "x86_64" ] && JARCH="x64"
    curl -fL --retry 3 -o "$TOOLS/jdk.tar.gz" "https://api.adoptium.net/v3/binary/latest/17/ga/mac/${JARCH}/jdk/hotspot/normal/eclipse" || fail "Could not download Java."
    rm -rf "$TOOLS/jdk-unpack" && mkdir -p "$TOOLS/jdk-unpack"
    tar -xzf "$TOOLS/jdk.tar.gz" -C "$TOOLS/jdk-unpack" || fail "Could not unpack Java."
    rm -rf "$TOOLS/jdk"
    mv "$TOOLS/jdk-unpack"/* "$TOOLS/jdk"
    rm -rf "$TOOLS/jdk-unpack" "$TOOLS/jdk.tar.gz"
    JH="$TOOLS/jdk/Contents/Home"
  fi
  export JAVA_HOME="$JH"
  export PATH="$JAVA_HOME/bin:$PATH"
  echo "Using Java at $JAVA_HOME"

  # Android SDK: reuse Android Studio's if it has what we need, else install a small private copy.
  SDK="$HOME/Library/Android/sdk"
  if [ ! -f "$SDK/platforms/android-34/android.jar" ] || [ ! -x "$SDK/build-tools/34.0.0/aapt2" ]; then
    SDK="$TOOLS/android-sdk"
    if [ ! -f "$SDK/platforms/android-34/android.jar" ] || [ ! -x "$SDK/build-tools/34.0.0/aapt2" ]; then
      if [ ! -x "$SDK/cmdline-tools/latest/bin/sdkmanager" ]; then
        echo "Downloading Google's Android command line tools (about 150 MB)..."
        curl -fL --retry 3 -o "$TOOLS/cmdline-tools.zip" "https://dl.google.com/android/repository/commandlinetools-mac-11076708_latest.zip" || fail "Could not download the Android tools."
        rm -rf "$SDK/cmdline-tools" && mkdir -p "$SDK/cmdline-tools"
        unzip -q "$TOOLS/cmdline-tools.zip" -d "$SDK/cmdline-tools" || fail "Could not unpack the Android tools."
        mv "$SDK/cmdline-tools/cmdline-tools" "$SDK/cmdline-tools/latest"
        rm -f "$TOOLS/cmdline-tools.zip"
      fi
      echo "Installing the Android 14 platform and build tools..."
      yes | "$SDK/cmdline-tools/latest/bin/sdkmanager" --sdk_root="$SDK" --licenses >/dev/null 2>&1
      "$SDK/cmdline-tools/latest/bin/sdkmanager" --sdk_root="$SDK" "platforms;android-34" "build-tools;34.0.0" || fail "Could not install the Android platform."
    fi
  fi
  BT="$SDK/build-tools/34.0.0"
  PLATFORM="$SDK/platforms/android-34/android.jar"
  echo "Using Android SDK at $SDK"

  A="$HERE/android"
  OUT="$BUILD/android"
  rm -rf "$OUT"
  mkdir -p "$OUT/assets" "$OUT/classes" "$OUT/dex"
  cp "$HERE/dashboard/index.html" "$OUT/assets/dashboard.html"
  printf 'server=%s\ntoken=%s\n' "$SERVER" "$TOKEN" > "$OUT/assets/config.properties"

  "$BT/aapt2" compile --dir "$A/res" -o "$OUT/res.zip" || fail "Android resources did not compile."
  "$BT/aapt2" link -o "$OUT/unsigned.apk" -I "$PLATFORM" --manifest "$A/AndroidManifest.xml" \
    -A "$OUT/assets" --auto-add-overlay "$OUT/res.zip" || fail "Android packaging failed."
  find "$A/src" -name '*.java' | sed 's/.*/"&"/' > "$OUT/sources.txt"
  javac --release 8 -nowarn -encoding UTF-8 -cp "$PLATFORM" -d "$OUT/classes" @"$OUT/sources.txt" || fail "The Android code did not compile. Send me the log and I will fix it."
  (cd "$OUT/classes" && jar cf "$OUT/classes.jar" .) || fail "Could not package the Android classes."
  "$BT/d8" --release --min-api 26 --lib "$PLATFORM" --output "$OUT/dex" "$OUT/classes.jar" || fail "Could not convert the Android code."
  (cd "$OUT/dex" && zip -q -j "$OUT/unsigned.apk" classes.dex) || fail "Could not add the code to the app."
  "$BT/zipalign" -f -p 4 "$OUT/unsigned.apk" "$OUT/aligned.apk" || fail "Could not align the app."

  KS="$HERE/.secrets/android-signing.keystore"
  if [ ! -f "$KS" ]; then
    openssl rand -hex 16 > "$HERE/.secrets/android-signing-pass.txt"
    KP="$(cat "$HERE/.secrets/android-signing-pass.txt")"
    keytool -genkeypair -keystore "$KS" -alias screentime -keyalg RSA -keysize 2048 -validity 10000 \
      -storepass "$KP" -keypass "$KP" -dname "CN=Screen Time, O=Pratik Renuse" >/dev/null 2>&1 || fail "Could not create the signing key."
  fi
  KP="$(cat "$HERE/.secrets/android-signing-pass.txt")"
  "$BT/apksigner" sign --ks "$KS" --ks-pass "pass:$KP" --key-pass "pass:$KP" --out "$BUILD/ScreenTime.apk" "$OUT/aligned.apk" || fail "Could not sign the Android app."
  "$BT/apksigner" verify "$BUILD/ScreenTime.apk" || fail "The signed Android app did not verify."
  echo "Android app ready: $BUILD/ScreenTime.apk ($(du -h "$BUILD/ScreenTime.apk" | cut -f1))"
fi

echo
echo "ALL DONE."
