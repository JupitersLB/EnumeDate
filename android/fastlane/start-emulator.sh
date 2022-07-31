echo "Starting emulator"
nohup $ANDROID_HOME/emulator/emulator -avd Pixel_4_XL_API_30 -no-audio -no-snapshot -no-window &
$ANDROID_HOME/platform-tools/adb wait-for-device shell 'while [[ -z $(getprop sys.boot_completed | tr -d '\r') ]]; do sleep 1; done; input keyevent 82'
$ANDROID_HOME/platform-tools/adb devices
echo "Emulator started"
