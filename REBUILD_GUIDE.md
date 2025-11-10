# App Crash Fix Guide - Rides Screen

## Problem
The app crashes when navigating to the rides screen in production build due to missing native configurations for Google Maps and gesture handlers.

## Solutions Applied

### 1. Updated app.json Configuration

Added the following configurations:

#### Android Configuration
- Added location permissions (ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION)
- Added Google Maps API key configuration
- Permissions are now properly declared

#### iOS Configuration
- Added Google Maps API key
- Added location usage descriptions for App Store compliance
- Added bundle identifier

### 2. Steps to Fix the Crash

#### Option 1: Clean Rebuild (Recommended)

```bash
# 1. Clear all caches
rm -rf node_modules
rm -rf .expo
rm -rf android/build
rm -rf ios/build
npm cache clean --force

# 2. Reinstall dependencies
npm install

# 3. Prebuild (regenerate native code)
npx expo prebuild --clean

# 4. Build for Android
eas build --platform android --profile preview

# or for local development
npx expo run:android
```

#### Option 2: Using EAS Build

```bash
# Build APK for testing
eas build --platform android --profile preview

# Build AAB for Play Store
eas build --platform android --profile production
```

### 3. Verify Google Maps Setup

Make sure your Google Cloud Console has:
- ✅ Maps SDK for Android enabled
- ✅ Maps SDK for iOS enabled  
- ✅ Places API enabled
- ✅ Directions API enabled
- ✅ Geocoding API enabled
- ✅ API key restrictions properly set

### 4. Additional Debugging

If the app still crashes:

1. **Check native logs:**
```bash
# For Android
adb logcat | grep -i "error\|exception\|crash"

# Check specific errors
npx react-native log-android
```

2. **Test in development build:**
```bash
npx expo start --dev-client
```

3. **Create a development build:**
```bash
eas build --profile development --platform android
```

### 5. Common Issues & Fixes

#### Issue: "Google Maps API key not found"
**Fix:** Rebuild the app after updating app.json

#### Issue: "Failed to load map"
**Fix:** 
- Verify API key in Google Cloud Console
- Check API restrictions
- Ensure billing is enabled

#### Issue: "Gesture handler not initialized"
**Fix:** Make sure the entry point has GestureHandlerRootView wrapper (already implemented)

#### Issue: "Bottom sheet crashes"
**Fix:** 
- Ensure react-native-reanimated is properly configured
- Check that babel.config.js has reanimated plugin

### 6. Testing Checklist

Before submitting to Play Store:
- [ ] Test location permissions
- [ ] Test map rendering
- [ ] Test place search
- [ ] Test route calculation
- [ ] Test vehicle selection
- [ ] Test on different Android versions
- [ ] Test with/without Google Play Services

## Production Build Commands

```bash
# 1. Update version in app.json
# 2. Clean install
npm install

# 3. Build production APK/AAB
eas build --platform android --profile production

# 4. Submit to Play Store (optional)
eas submit --platform android
```

## Notes

- The Google Maps API key is currently exposed in the code. Consider moving it to environment variables for production.
- Always test production builds on physical devices before releasing.
- Keep the development build for faster testing during development.
