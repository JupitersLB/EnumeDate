echo "y" | $ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --install "system-images;android-30;google_apis;x86"
echo "no" | $ANDROID_HOME/cmdline-tools/latest/bin/avdmanager create avd --force --name Pixel_4_XL_API_30 --device "Nexus 5X" -k 'system-images;android-30;google_apis;x86'
$ANDROID_HOME/emulator/emulator -list-avds
