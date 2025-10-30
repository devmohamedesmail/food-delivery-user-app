import React from 'react'
import { View,SafeAreaView } from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';
import BottomNavigation from './BottomNavigation';
import { useRouter } from 'expo-router';
import CustomHeader from '../components/custom/customheader';
import { useTranslation } from 'react-i18next';

export default function EmptyWishlist() {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
        <CustomHeader title={t('navigation.wishlist')} />
        
        {/* Empty State */}
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-24 h-24 rounded-full bg-gray-100 items-center justify-center mb-6">
            <Ionicons name="heart-outline" size={48} color="#9CA3AF" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            {t('wishlist.emptyTitle')}
          </Text>
          <Text className="text-gray-500 text-center mb-8">
            
            {t('wishlist.emptySubtitle')}
          </Text>
          <TouchableOpacity 
            onPress={() => router.push('/restaurants/restaurants')}
            className="bg-gray-900 px-8 py-4 rounded-xl"
          >
            <Text className="text-white font-semibold arabic-font text-lg">
              {t('wishlist.browseRestaurants')}
            </Text>
          </TouchableOpacity>
        </View>

        <BottomNavigation />
      </SafeAreaView>
  )
}
