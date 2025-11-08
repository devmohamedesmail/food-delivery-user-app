# Google OAuth Configuration Guide

## Problem
The Google OAuth authentication wasn't working because of a mismatch between the redirect URI being sent to Google and the authorized redirect URIs configured in Google Cloud Console.

## Solution

### 1. Fixed Redirect URI
Changed from dynamic `AuthSession.makeRedirectUri({ useProxy: true })` to the exact URI configured in Google Cloud Console:

```typescript
const redirectUri = 'https://auth.expo.io/@dev.mohamed.esmail/uber-app';
```

### 2. Google Cloud Console Configuration
Ensure your Google Cloud Console OAuth 2.0 credentials have these exact settings:

**Authorized JavaScript origins:**
- `https://auth.expo.io`

**Authorized redirect URIs:**
- `https://auth.expo.io/@dev.mohamed.esmail/uber-app`
- `https://food-delivery-and-rides.onrender.com/api/v1/auth/google/callback`

### 3. Backend Configuration
Your backend at `https://food-delivery-and-rides.onrender.com/api/v1/auth` must:

1. Accept the redirect_uri parameter:
   ```
   GET /google?redirect_uri=https://auth.expo.io/@dev.mohamed.esmail/uber-app
   ```

2. After successful Google authentication, redirect back to your app with the token:
   ```
   https://auth.expo.io/@dev.mohamed.esmail/uber-app?token=YOUR_JWT_TOKEN
   ```
   
   Or alternatively:
   ```
   https://auth.expo.io/@dev.mohamed.esmail/uber-app#token=YOUR_JWT_TOKEN
   ```

### 4. Authentication Flow

1. User clicks "Sign in with Google"
2. App opens browser with: `https://food-delivery-and-rides.onrender.com/api/v1/auth/google?redirect_uri=https://auth.expo.io/@dev.mohamed.esmail/uber-app`
3. User authenticates with Google
4. Google redirects to your backend: `https://food-delivery-and-rides.onrender.com/api/v1/auth/google/callback`
5. Backend processes the Google token and redirects to: `https://auth.expo.io/@dev.mohamed.esmail/uber-app?token=YOUR_JWT_TOKEN`
6. Expo's auth proxy redirects back to your app
7. App extracts the token and saves it to AsyncStorage
8. User is redirected to the home screen

### 5. Token Extraction
The app now supports multiple token formats:
- Query parameter: `?token=xxx`
- Hash fragment: `#token=xxx`
- Path segment: `/token/xxx`

### 6. Testing

To test the OAuth flow:

1. Make sure your backend is running and properly configured
2. Run your app: `npx expo start`
3. Click the Google sign-in button
4. Check the console logs for:
   - "Redirect URI: https://auth.expo.io/@dev.mohamed.esmail/uber-app"
   - "Auth URL: https://food-delivery-and-rides.onrender.com/api/v1/auth/google?redirect_uri=..."
   - "Auth result: ..." (should show type: 'success')
   - "Token extracted successfully" (if successful)

### 7. Common Issues

**Issue:** "redirect_uri_mismatch" error
- **Solution:** Ensure the redirect URI in Google Cloud Console exactly matches `https://auth.expo.io/@dev.mohamed.esmail/uber-app`

**Issue:** Browser opens but doesn't redirect back
- **Solution:** Check that your backend is properly redirecting to the redirect_uri with the token

**Issue:** "No token found in URL"
- **Solution:** Check your backend logs to ensure it's appending the token to the redirect URL

**Issue:** Authentication works in development but not in production
- **Solution:** Make sure you have different OAuth credentials for development and production, or use the same Expo account handle in both

### 8. Security Notes

1. Never commit your Google OAuth Client Secret to version control
2. Use environment variables for sensitive configuration
3. Implement token expiration and refresh logic
4. Validate tokens on your backend before granting access
5. Use HTTPS for all OAuth endpoints (already done ✅)

## Files Modified
- `app/auth/login.tsx` - Updated OAuth redirect URI and token extraction logic
