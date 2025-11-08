# Google OAuth "Access Blocked" Fix

## Current Error
You're seeing "Access Blocked: This app's request is invalid" from Google.

## Root Cause
Your backend domain `food-delivery-and-rides.onrender.com` is not authorized in your Google Cloud Console OAuth settings.

## Solution - Update Google Cloud Console

### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID

### Step 2: Update Authorized JavaScript Origins
Add these EXACT URLs (one per line):

```
https://auth.expo.io
https://food-delivery-and-rides.onrender.com
```

**Important:** Do NOT include trailing slashes!

### Step 3: Update Authorized Redirect URIs
Add these EXACT URLs (one per line):

```
https://auth.expo.io/@dev.mohamed.esmail/uber-app
https://food-delivery-and-rides.onrender.com/api/v1/auth/google/callback
```

### Step 4: Save Changes
1. Click **SAVE** at the bottom
2. Wait 5-10 minutes for changes to propagate (Google's servers need time)
3. Clear your browser cache or use incognito mode for testing

## Visual Guide

Your Google OAuth settings should look like this:

```
┌─────────────────────────────────────────────────────────────┐
│ Authorized JavaScript origins                               │
├─────────────────────────────────────────────────────────────┤
│ 1. https://auth.expo.io                                     │
│ 2. https://food-delivery-and-rides.onrender.com           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Authorized redirect URIs                                    │
├─────────────────────────────────────────────────────────────┤
│ 1. https://auth.expo.io/@dev.mohamed.esmail/uber-app      │
│ 2. https://food-delivery-and-rides.onrender.com/api/v1/auth/google/callback │
└─────────────────────────────────────────────────────────────┘
```

## Common Mistakes to Avoid

❌ **DON'T:**
- Add `http://` URLs (must be `https://`)
- Add trailing slashes: `https://example.com/` 
- Add wildcards: `https://*.example.com`
- Mix up origins and redirect URIs

✅ **DO:**
- Use exact URLs without trailing slashes
- Use HTTPS for all URLs
- Wait 5-10 minutes after saving changes
- Test in incognito mode

## Testing After Configuration

1. **Wait 5-10 minutes** after saving (Google needs time to propagate changes)

2. **Clear your app cache:**
   ```bash
   npx expo start -c
   ```

3. **Test the OAuth flow:**
   - Click "Sign in with Google"
   - You should see Google's permission screen (not "Access Blocked")
   - Grant permissions
   - You should be redirected back to your app

4. **Check console logs:**
   - Should see: "Auth result: {type: 'success', url: '...'}"
   - Should see: "Token extracted successfully"

## Alternative: Backend-Only OAuth Flow

If you continue having issues with the Expo auth proxy, you can use a direct backend flow:

### Option A: Use Deep Link (Recommended for Production)

1. Update `app.json` to ensure scheme is set:
   ```json
   {
     "expo": {
       "scheme": "uberapp"
     }
   }
   ```

2. Update Google Cloud redirect URI to:
   ```
   https://food-delivery-and-rides.onrender.com/api/v1/auth/google/callback
   ```

3. Your backend should redirect to:
   ```
   uberapp://auth?token=YOUR_JWT_TOKEN
   ```

4. Update login.tsx:
   ```typescript
   const redirectUri = 'https://food-delivery-and-rides.onrender.com/api/v1/auth/google/callback';
   ```

This way, Google only interacts with your backend, and your backend uses a deep link to send the token back to your app.

## Next Steps

1. ✅ Update Google Cloud Console settings (Steps 1-4 above)
2. ⏱️ Wait 5-10 minutes
3. 🧹 Clear cache: `npx expo start -c`
4. 🧪 Test OAuth flow
5. 📝 Check console logs

If you still have issues after following these steps, share the exact error message you're seeing!
