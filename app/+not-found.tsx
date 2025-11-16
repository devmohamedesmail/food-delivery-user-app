import { Link, Stack, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

export default function NotFoundScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className='flex-1 bg-gray-50'>
        {/* Gradient Background */}
        <LinearGradient
          colors={['#fd4a12', '#FF6A3D', '#FFC24A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className='absolute inset-0 opacity-5'
        />

        <View className='flex-1 items-center justify-center px-8'>
          {/* Error Icon */}
          <View className='items-center mb-8'>
            <View
              className='w-32 h-32 rounded-full items-center justify-center mb-6'
              style={{
                backgroundColor: '#fff',
                shadowColor: '#fd4a12',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <Ionicons name="warning-outline" size={80} color="#fd4a12" />
            </View>

            {/* 404 Text */}
            <Text className='text-6xl font-bold mb-2' style={{ color: '#fd4a12' }}>
              404
            </Text>
          </View>

          {/* Title */}
          <Text className='text-2xl font-bold text-gray-800 text-center mb-3'>
            {t('notFound.title')}
          </Text>

          {/* Description */}
          <Text className='text-base text-gray-500 text-center mb-8 leading-6'>
            {t('notFound.description')}
          </Text>

          {/* Suggestions */}
          <View className='w-full bg-white rounded-2xl p-6 mb-8' style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}>
            <Text className='text-sm font-bold text-gray-700 mb-3'>
              {t('notFound.suggestions')}
            </Text>
            <View className='space-y-2'>
              <View className='flex-row items-start mb-2'>
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text className='text-sm text-gray-600 ml-2 flex-1'>
                  {t('notFound.checkUrl')}
                </Text>
              </View>
              <View className='flex-row items-start mb-2'>
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text className='text-sm text-gray-600 ml-2 flex-1'>
                  {t('notFound.goBack')}
                </Text>
              </View>
              <View className='flex-row items-start'>
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text className='text-sm text-gray-600 ml-2 flex-1'>
                  {t('notFound.goHome')}
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View className='w-full space-y-3'>
            {/* Go Home Button */}
            <TouchableOpacity
              onPress={() => router.push('/')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#fd4a12', '#FF6A3D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className='rounded-full py-4 flex-row items-center justify-center'
                style={{
                  shadowColor: '#fd4a12',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              >
                <Ionicons name="home" size={22} color="white" />
                <Text className='text-white text-base font-bold ml-2'>
                  {t('notFound.homeButton')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Go Back Button */}
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.8}
              className='bg-white rounded-full py-4 flex-row items-center justify-center border-2 border-gray-200'
            >
              <Ionicons name="arrow-back" size={22} color="#6b7280" />
              <Text className='text-gray-700 text-base font-bold ml-2'>
                {t('notFound.backButton')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}


