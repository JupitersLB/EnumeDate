gpg_key:
	@test -n "${GPG_PASSPHRASE}" || (echo "GPG_PASSPHRASE needs to be specified in the ENV" ; exit 1)

android/app/enumedate.keystore.gpg: android/app/enumedate.keystore gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -c android/app/enumedate.keystore > android/app/enumedate.keystore.gpg

android/app/google-services.json.gpg: android/app/google-services.json gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -c android/app/google-services.json > android/app/google-services.json.gpg

android/gradle.properties.gpg: android/gradle.properties gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -c android/gradle.properties > android/gradle.properties.gpg

android/app/google-play-access-key.gpg: android/app/pc-api-5364934519941482702-201-42cd8cae9a9f.json gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -c android/app/pc-api-5364934519941482702-201-42cd8cae9a9f.json > android/app/pc-api-5364934519941482702-201-42cd8cae9a9f.json.gpg

ios/fastlane/.env.default.gpg: ios/fastlane/.env.default gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -c ios/fastlane/.env.default > ios/fastlane/.env.default.gpg

ios/firebase/GoogleService-Info.plist.gpg: ios/firebase/GoogleService-Info.plist gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -c ios/firebase/GoogleService-Info.plist > ios/firebase/GoogleService-Info.plist.gpg

ios/EnumeDate/EnumeDate.entitlements.gpg: ios/EnumeDate/EnumeDate.entitlements gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -c ios/EnumeDate/EnumeDate.entitlements > ios/EnumeDate/EnumeDate.entitlements.gpg

encrypt_secrets: android/app/enumedate.keystore.gpg \
	android/gradle.properties.gpg \
	android/app/google-services.json.gpg \
	android/app/google-play-access-key.gpg \
	ios/fastlane/.env.default.gpg \
	ios/firebase/GoogleService-Info.plist.gpg \
	ios/EnumeDate/EnumeDate.entitlements.gpg

secrets: gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -d < android/app/enumedate.keystore.gpg > android/app/enumedate.keystore
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -d < android/app/google-services.json.gpg > android/app/google-services.json
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -d < android/gradle.properties.gpg > android/gradle.properties
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -d < android/app/pc-api-5364934519941482702-201-42cd8cae9a9f.json.gpg > android/app/pc-api-5364934519941482702-201-42cd8cae9a9f.json
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -d < ios/fastlane/.env.default.gpg > ios/fastlane/.env.default
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -d < ios/firebase/GoogleService-Info.plist.gpg > ios/firebase/GoogleService-Info.plist
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -d < ios/EnumeDate/EnumeDate.entitlements.gpg > ios/EnumeDate/EnumeDate.entitlements

build_android_debug:
	yarn react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
	