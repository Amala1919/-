// The web app (android/app/src/main/assets/www) is built from ../web with `npm run build`.
plugins {
    id("com.android.application")
}

android {
    namespace = "com.chronoatlas.app"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.chronoatlas.app"
        minSdk = 24
        targetSdk = 34
        versionCode = 5
        versionName = "1.4.0"
    }

    signingConfigs {
        // Same key as scripts/build-apk.sh, so both builds can update each other.
        create("shared") {
            storeFile = file("../debug.keystore")
            storePassword = "chronoatlas"
            keyAlias = "chronoatlas"
            keyPassword = "chronoatlas"
        }
    }

    buildTypes {
        debug {
            signingConfig = signingConfigs.getByName("shared")
        }
        release {
            isMinifyEnabled = false
            signingConfig = signingConfigs.getByName("shared")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }

    androidResources {
        // Pre-compressed binary assets load faster uncompressed.
        noCompress += listOf("glb", "png")
    }
}
