#!/usr/bin/env bash
# Builds the Android APK without Gradle, using the command-line SDK tools
# shipped by Ubuntu/Debian:
#   sudo apt-get install aapt apksigner dalvik-exchange zipalign android-sdk-platform-23
# Output: dist/ChronoAtlas.apk
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APP="$ROOT/android/app/src/main"
OUT="$ROOT/build/apk"
ANDROID_JAR="${ANDROID_JAR:-/usr/lib/android-sdk/platforms/android-23/android.jar}"
DX="$(command -v dalvik-exchange || command -v dx)"
KEYSTORE="$ROOT/android/debug.keystore"

if [[ "${SKIP_WEB:-0}" != "1" ]]; then
  echo "== Building web bundle"
  (cd "$ROOT/web" && npm run build --silent)
fi

rm -rf "$OUT" && mkdir -p "$OUT/gen" "$OUT/classes"

echo "== Packaging resources"
aapt package -f -m \
  -M "$APP/AndroidManifest.xml" \
  -S "$APP/res" \
  -A "$APP/assets" \
  -I "$ANDROID_JAR" \
  -J "$OUT/gen" \
  -F "$OUT/app.unsigned.apk" \
  -0 arsc -0 glb -0 png

echo "== Compiling Java"
javac -nowarn -source 8 -target 8 -encoding UTF-8 \
  -bootclasspath "$ANDROID_JAR" -classpath "$ANDROID_JAR" \
  -d "$OUT/classes" \
  $(find "$OUT/gen" "$APP/java" -name '*.java')

echo "== Dexing"
"$DX" --dex --min-sdk-version=24 --output="$OUT/classes.dex" "$OUT/classes"
(cd "$OUT" && aapt add -f app.unsigned.apk classes.dex >/dev/null)

echo "== Aligning & signing"
if [[ ! -f "$KEYSTORE" ]]; then
  keytool -genkeypair -keystore "$KEYSTORE" -storepass chronoatlas -keypass chronoatlas \
    -alias chronoatlas -keyalg RSA -keysize 2048 -validity 10000 \
    -dname "CN=ChronoAtlas, OU=Dev, O=ChronoAtlas, C=JP"
fi
zipalign -p -f 4 "$OUT/app.unsigned.apk" "$OUT/app.aligned.apk"
mkdir -p "$ROOT/dist"
apksigner sign --ks "$KEYSTORE" --ks-pass pass:chronoatlas --key-pass pass:chronoatlas \
  --ks-key-alias chronoatlas --min-sdk-version 24 --v4-signing-enabled false \
  --out "$ROOT/dist/ChronoAtlas.apk" "$OUT/app.aligned.apk"
apksigner verify "$ROOT/dist/ChronoAtlas.apk"
ls -la "$ROOT/dist/ChronoAtlas.apk"
echo "== Done: dist/ChronoAtlas.apk"
