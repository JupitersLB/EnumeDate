gpg_key:
	@test -n "${GPG_PASSPHRASE}" || (echo "GPG_PASSPHRASE needs to be specified in the ENV" ; exit 1)

android/app/enumedate.keystore.gpg: android/app/enumedate.keystore gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -c android/app/enumedate.keystore > android/app/enumedate.keystore.gpg

android/gradle.properties.gpg: android/gradle.properties gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -c android/gradle.properties > android/gradle.properties.gpg

ios/H9Y76D7587.cer.gpg: ios/H9Y76D7587.cer gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -c ios/H9Y76D7587.cer > ios/H9Y76D7587.cer.gpg

ios/H9Y76D7587.p12.gpg: ios/H9Y76D7587.p12 gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -c ios/H9Y76D7587.p12 > ios/H9Y76D7587.p12.gpg

ios/distribution.p8.gpg: ios/distribution.p8 gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -c ios/distribution.p8 > ios/distribution.p8.gpg

ios/AppStore_com.EnumeDate.mobileprovision.gpg: ios/AppStore_com.EnumeDate.mobileprovision gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -c ios/AppStore_com.EnumeDate.mobileprovision > ios/AppStore_com.EnumeDate.mobileprovision.gpg

ios/fastlane/.env.default.gpg: ios/fastlane/.env.default gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -c ios/fastlane/.env.default > ios/fastlane/.env.default.gpg

encrypt_secrets: android/app/enumedate.keystore.gpg \
	android/gradle.properties.gpg \
	ios/H9Y76D7587.cer.gpg \
	ios/H9Y76D7587.p12.gpg \
	ios/AppStore_com.EnumeDate.mobileprovision.gpg \
	ios/distribution.p8.gpg \
	ios/fastlane/.env.default.gpg


secrets: gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -d < android/app/enumedate.keystore.gpg > android/app/enumedate.keystore
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -d < android/gradle.properties.gpg > android/gradle.properties
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -d < ios/H9Y76D7587.cer.gpg > ios/H9Y76D7587.cer
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -d < ios/H9Y76D7587.p12.gpg > ios/H9Y76D7587.p12
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -d < ios/distribution.p8.gpg > ios/distribution.p8
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -d < ios/AppStore_com.EnumeDate.mobileprovision.gpg > ios/AppStore_com.EnumeDate.mobileprovision
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -d < ios/fastlane/.env.default.gpg > ios/fastlane/.env.default


build_android_debug:
	yarn react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
	