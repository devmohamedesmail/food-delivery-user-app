import React from 'react';
import { View, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

// Required for OAuth to work properly
WebBrowser.maybeCompleteAuthSession();

const API_BASE_URL = 'https://food-delivery-and-rides.onrender.com/api/v1/auth';
const REDIRECT_URI = 'https://auth.expo.io/@dev.mohamed.esmail/uber-app';

export default function SocialLogin() {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = React.useState<string | null>(null);

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      setLoading(provider);
      

      // Build OAuth URL with redirect URI
      const authUrl = `${API_BASE_URL}/login/${provider}?redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
      console.log('📍 Auth URL:', authUrl);

      // Open OAuth flow in browser
      const result = await WebBrowser.openAuthSessionAsync(authUrl, REDIRECT_URI);

      console.log('✅ Auth result:', result);

      if (result.type === 'success' && result.url) {
        console.log('🔗 Success URL:', result.url);

        // Extract token from URL
        const token = extractToken(result.url);

        if (token) {
          console.log('🎫 Token extracted successfully');
          
          // Save token to AsyncStorage
          await AsyncStorage.setItem('token', token);

          // Fetch user data
          await fetchUserData(token);

          Alert.alert('✅ نجاح', 'تم تسجيل الدخول بنجاح!');
          router.replace('/');
        } else {
          console.error('❌ No token found in URL:', result.url);
          Alert.alert('⚠️ خطأ', 'فشل الحصول على رمز المصادقة');
        }
      } else if (result.type === 'cancel') {
        console.log('🚫 User cancelled login');
        Alert.alert('ℹ️ إلغاء', 'تم إلغاء تسجيل الدخول');
      } else {
        console.log('⚠️ Login failed or dismissed');
        Alert.alert('⚠️ فشل', 'فشل تسجيل الدخول');
      }
    } catch (error) {
      console.error('❌ Error in social login:', error);
      Alert.alert('❌ خطأ', 'حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setLoading(null);
    }
  };

  const extractToken = (url: string): string | null => {
    try {
      // Method 1: Query parameter (?token=xxx)
      if (url.includes('token=')) {
        const match = url.match(/[?&]token=([^&]+)/);
        if (match && match[1]) {
          return decodeURIComponent(match[1]);
        }
      }

      // Method 2: Hash fragment (#token=xxx)
      if (url.includes('#token=')) {
        const match = url.match(/#token=([^&]+)/);
        if (match && match[1]) {
          return decodeURIComponent(match[1]);
        }
      }

      // Method 3: Path segment (/token/xxx)
      if (url.includes('/token/')) {
        const match = url.match(/\/token\/([^/?&#]+)/);
        if (match && match[1]) {
          return decodeURIComponent(match[1]);
        }
      }

      return null;
    } catch (error) {
      console.error('Error extracting token:', error);
      return null;
    }
  };

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success && data.user) {
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        console.log('👤 User data saved:', data.user);
      } else {
        console.warn('⚠️ Failed to fetch user data:', data);
      }
    } catch (error) {
      console.error('❌ Error fetching user data:', error);
    }
  };

  return (
    <View className="w-full">
      {/* Divider */}
      <View className="flex-row items-center my-6">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 text-gray-500" style={{ fontFamily: 'Cairo_400Regular' }}>
          {t('auth.orContinueWith')}
        </Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      {/* Social Login Buttons */}
      <View className="space-y-3">
        {/* Google Login */}
        <TouchableOpacity
          onPress={() => handleSocialLogin('google')}
          disabled={loading !== null}
          className="flex-row mb-3 items-center justify-center bg-white border-2 border-gray-200 rounded-xl py-4 px-6 shadow-sm active:bg-gray-50"
          style={{ opacity: loading !== null ? 0.6 : 1 }}
        >
          {loading === 'google' ? (
            <ActivityIndicator size="small" color="#DB4437" />
          ) : (
            <>
              <Ionicons name="logo-google" size={24} color="#DB4437" style={{ marginRight: 12 }} />
              <Text className="text-gray-700 text-base font-semibold" style={{ fontFamily: 'Cairo_600SemiBold' }}>
                {t('auth.continueWithGoogle')}
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Facebook Login */}
        <TouchableOpacity
          onPress={() => handleSocialLogin('facebook')}
          disabled={loading !== null}
          className="flex-row items-center justify-center bg-[#1877F2] rounded-xl py-4 px-6 shadow-sm active:bg-[#166FE5]"
          style={{ opacity: loading !== null ? 0.6 : 1 }}
        >
          {loading === 'facebook' ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="logo-facebook" size={24} color="#FFFFFF" style={{ marginRight: 12 }} />
              <Text className="text-white text-base font-semibold" style={{ fontFamily: 'Cairo_600SemiBold' }}>
                {t('auth.continueWithFacebook')}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}