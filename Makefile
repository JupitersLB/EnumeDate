gpg_key:
	@test -n "${GPG_PASSPHRASE}" || (echo "GPG_PASSPHRASE needs to be specified in the ENV" ; exit 1)

android/app/enumedate.keystore.gpg: android/app/enumedate.keystore gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -c android/app/enumedate.keystore > android/app/enumedate.keystore.gpg

android/gradle.properties.gpg: android/gradle.properties gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -c android/gradle.properties > android/gradle.properties.gpg

ios/2K5N3DUFRL.cer.gpg: ios/2K5N3DUFRL.cer gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -c ios/2K5N3DUFRL.cer > ios/2K5N3DUFRL.cer.gpg

ios/2K5N3DUFRL.p12.gpg: ios/2K5N3DUFRL.p12 gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -c ios/2K5N3DUFRL.p12 > ios/2K5N3DUFRL.p12.gpg

ios/AppStore_com.EnumeDate.mobileprovision.gpg: ios/AppStore_com.EnumeDate.mobileprovision gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -c ios/AppStore_com.EnumeDate.mobileprovision > ios/AppStore_com.EnumeDate.mobileprovision.gpg

encrypt_secrets: android/app/enumedate.keystore.gpg \
	android/gradle.properties.gpg \
	ios/2K5N3DUFRL.cer.gpg \
	ios/2K5N3DUFRL.p12.gpg \
	ios/AppStore_com.EnumeDate.mobileprovision.gpg


secrets: gpg_key
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -d < android/app/enumedate.keystore.gpg > android/app/enumedate.keystore
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -d < android/gradle.properties.gpg > android/gradle.properties
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -d < ios/2K5N3DUFRL.cer.gpg > ios/2K5N3DUFRL.cer
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -d < ios/2K5N3DUFRL.p12.gpg > ios/2K5N3DUFRL.p12
	gpg --yes --batch --passphrase="${GPG_PASSPHRASE}" -d < ios/AppStore_com.EnumeDate.mobileprovision.gpg > ios/AppStore_com.EnumeDate.mobileprovision


build_android_debug:
	yarn react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
	