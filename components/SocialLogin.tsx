import React from 'react'
import { View ,TouchableOpacity, Text, Alert} from 'react-native'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function SocialLogin() {
    const { t } = useTranslation();
    const router = useRouter();

    // Use the exact redirect URI configured in Google Cloud Console
      const redirectUri = 'https://auth.expo.io/@dev.mohamed.esmail/uber-app';
    
      console.log('Redirect URI:', redirectUri);
    
      const handleSocialLogin = async (provider: 'google' | 'facebook') => {
        try {
          console.log(`Starting ${provider} login`);
          const baseUrl = 'https://food-delivery-and-rides.onrender.com/api/v1/auth';
          const authUrl = `${baseUrl}/${provider}?redirect_uri=${encodeURIComponent(redirectUri)}`;
          
          console.log('Auth URL:', authUrl);
    
          // Open browser for OAuth authentication
          const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
    
          console.log('Auth result:', result);
    
          if (result.type === 'success' && result.url) {
            console.log('Success URL:', result.url);
            
            // Try multiple token extraction methods
            let token = null;
            
            // Method 1: Query parameter (?token=xxx)
            if (result.url.includes('token=')) {
              const parts = result.url.split('token=');
              if (parts.length > 1) {
                token = parts[1].split('&')[0]; // Get token and remove any other params
              }
            }
            
            // Method 2: Hash fragment (#token=xxx)
            if (!token && result.url.includes('#token=')) {
              const parts = result.url.split('#token=');
              if (parts.length > 1) {
                token = parts[1].split('&')[0];
              }
            }
            
            // Method 3: Path segment (/token/xxx)
            if (!token && result.url.includes('/token/')) {
              const match = result.url.match(/\/token\/([^/?&#]+)/);
              if (match && match[1]) {
                token = match[1];
              }
            }
    
            if (token) {
              console.log('Token extracted successfully');
              await AsyncStorage.setItem('token', token);
              Alert.alert('✅ تم تسجيل الدخول بنجاح');
              router.replace('/');
            } else {
              console.error('No token found in URL:', result.url);
              Alert.alert('⚠️ خطأ', 'فشل الحصول على رمز المصادقة');
            }
          } else if (result.type === 'cancel') {
            console.log('User cancelled login');
            Alert.alert('⚠️ تم إلغاء تسجيل الدخول');
          } else {
            console.log('Login failed or dismissed');
            Alert.alert('⚠️ فشل تسجيل الدخول');
          }
        } catch (error) {
          console.log('Error in social login:', error);
          Alert.alert('❌ حدث خطأ أثناء تسجيل الدخول');
        }
      };
    
  return (
    <View>
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
                  className="flex-row mb-2 items-center justify-center bg-black border-2 border-gray-200 rounded-xl py-4 px-6 shadow-sm active:bg-gray-50"
                >
                  <View className="w-6 h-6 mr-3">
                    <Ionicons name="logo-google" size={24} color="#DB4437" />
                  </View>
                  <Text className="text-white text-base font-semibold" style={{ fontFamily: 'Cairo_600SemiBold' }}>
                    {t('auth.continueWithGoogle')}
                  </Text>
                </TouchableOpacity>

                {/* Facebook Login */}
                <TouchableOpacity
                  onPress={() => handleSocialLogin('facebook')}
                  className="flex-row items-center justify-center bg-[#1877F2] rounded-xl py-4 px-6 shadow-sm active:bg-[#166FE5]"
                >
                  <View className="w-6 h-6 mr-3">
                    <Ionicons name="logo-facebook" size={24} color="#FFFFFF" />
                  </View>
                  <Text className="text-white text-base font-semibold" style={{ fontFamily: 'Cairo_600SemiBold' }}>
                    {t('auth.continueWithFacebook')}
                  </Text>
                </TouchableOpacity>
              </View>
    </View>
  )
}
