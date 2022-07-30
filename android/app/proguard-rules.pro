# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html


-dontnote android.net.**
-dontnote org.apache.**


-dontnote com.facebook.**
-dontnote sun.misc.Unsafe
-dontnote okhttp3.**
-dontnote okio.**

# Do not strip any method/class that is annotated with @DoNotStrip
# This should really come from React Native itself. See here: https://github.com/react-native-community/upgrade-support/issues/31
-keep @com.facebook.jni.annotations.DoNotStrip class *
-keep class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
    @com.facebook.common.internal.DoNotStrip *;
    @com.facebook.jni.annotations.DoNotStrip *;
}
-keepclassmembers class * {
    @com.facebook.jni.annotations.DoNotStrip *;
}

-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
}

-keep @com.facebook.proguard.annotations.DoNotStripAny class * {
    *;
}

-keepclassmembers @com.facebook.proguard.annotations.KeepGettersAndSetters class * {
  void set*(***);
  *** get*();
}

-keep class * implements com.facebook.react.bridge.JavaScriptModule { *; }
-keep class * implements com.facebook.react.bridge.NativeModule { *; }
-keepclassmembers,includedescriptorclasses class * { native <methods>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactProp <methods>; }
-keepclassmembers class *  { @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>; }

-dontwarn com.facebook.react.**
-keep,includedescriptorclasses class com.facebook.react.bridge.** { *; }
-keep,includedescriptorclasses class com.facebook.react.turbomodule.core.** { *; }

# hermes
-keep class com.facebook.jni.** { *; }
-keep class com.facebook.hermes.unicode.** { *; }


# okio

-keep class sun.misc.Unsafe { *; }
-dontwarn java.nio.file.*
-dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
-dontwarn okio.**

# Add any project specific keep options here:


# reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# suggestions
-keep class com.facebook.react.modules.systeminfo.ReactNativeVersion {*;}
-keep class com.facebook.react.modules.** { *; }