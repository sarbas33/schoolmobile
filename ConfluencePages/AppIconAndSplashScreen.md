To set the logo as the app icon and display it during the app's loading (splash screen) phase in a React Native app, follow these steps:

Step 1: Set the App Icon
1. Prepare the Icon
   Prepare the app icon in various resolutions as required by both iOS and Android. You can use tools like App Icon Generator to generate the necessary sizes automatically.
2. Add the Icon to Your Project
   For Android:

Place the icon files in the android/app/src/main/res directory under respective folders (mipmap-mdpi, mipmap-hdpi, mipmap-xhdpi, etc.).
Ensure the icon filenames follow this convention: ic_launcher.png (default) and ic_launcher_round.png (for rounded icons if needed).
For iOS:

Open your project in Xcode.
In the project navigator, go to Images.xcassets.
Drag and drop the icon images into the AppIcon set.
3. Configure the Icon
   For Android:

The app icon should automatically be picked up from the res directory. If you need a custom launcher icon, you may need to edit android/app/src/main/AndroidManifest.xml.
For iOS:

Xcode automatically uses the icon set you placed in Images.xcassets for the app icon.
Step 2: Set Up the Splash Screen
1. Prepare the Splash Screen Image
   Prepare the splash screen image (the logo) in appropriate dimensions.
2. Configure Splash Screen for Android
   Install the Splash Screen Library:

bash
Copy code
npm install react-native-splash-screen
Modify Android Files:

In android/app/src/main/res/drawable/, place your splash screen image (e.g., splash_screen.png).
Edit android/app/src/main/res/values/styles.xml:
xml
Copy code
<style name="SplashTheme" parent="Theme.AppCompat.NoActionBar">
    <item name="android:windowBackground">@drawable/splash_screen</item>
</style>
In android/app/src/main/AndroidManifest.xml, set the splash theme:
xml
Copy code
<activity
android:name=".MainActivity"
android:theme="@style/SplashTheme">
Initialize Splash Screen in MainActivity.java:

Edit android/app/src/main/java/com/yourproject/MainActivity.java:
java
Copy code
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen; // Import this
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
@Override
protected void onCreate(Bundle savedInstanceState) {
SplashScreen.show(this);  // Add this
super.onCreate(savedInstanceState);
}
}
3. Configure Splash Screen for iOS
   Install the Splash Screen Library:

bash
Copy code
cd ios
pod install
Modify iOS Files:

In Xcode, go to your project settings.
Select your target, then go to the "General" tab.
Scroll down to the "Launch Screen File" and ensure you have a launch screen storyboard (LaunchScreen.storyboard).
Edit LaunchScreen.storyboard to display your splash image.
Initialize Splash Screen in AppDelegate.m:

Edit ios/YourProjectName/AppDelegate.m:
objective
Copy code
#import "RNSplashScreen.h"  // Import this

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [RNSplashScreen show];  // Add this
  return YES;
  }
  Step 3: Run Your App
  After following these steps, the splash screen will display the logo when the app is loading, and the app icon will be set to your logo.

Result
App Icon: Your logo will appear as the app icon on the home screen and app drawer.
Splash Screen: Your logo will appear as the splash screen image when the app is launched, providing a branded experience right from the start.
This setup ensures that your app's branding is consistent from the moment the user sees the icon to when they launch the app.