import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export default function NoResturantFound() {
    const {t}= useTranslation();
  return (
    <View className="flex-1 items-center justify-center px-8">
            <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center mb-4">
              <Ionicons name="restaurant-outline" size={40} color="#9CA3AF" />
            </View>
            <Text className="text-gray-900 text-xl font-bold mb-2" style={{ fontFamily: 'Cairo_700Bold' }}>
              {t('restaurants.noRestaurantsFound')}
            </Text>
            <Text className="text-gray-500 text-center leading-6" style={{ fontFamily: 'Cairo_400Regular' }}>
              
              {t('restaurants.tryAgainLater')}
            </Text>
            {/* {searchQuery && (
              <TouchableOpacity
                onPress={() => handleSearch('')}
                className="bg-gray-900 px-6 py-3 rounded-xl mt-4"
              >
                <Text className="text-white font-semibold" style={{ fontFamily: 'Cairo_600SemiBold' }}>
                  Clear Search
                </Text>
              </TouchableOpacity>
            )} */}
          </View>
  )
}
