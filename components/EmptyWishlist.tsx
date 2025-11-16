import React from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';
import BottomNavigation from './common/BottomNavigation';
import { useRouter } from 'expo-router';
import CustomHeader from './custom/Header';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import CreativeBottomNavigation from './common/CreativeBottomNavigation';

export default function EmptyWishlist() {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
        {/* Professional Wishlist Header */}
        <View className="bg-white px-5 py-4 border-b border-gray-100">
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <View className="bg-primary/10 p-3 rounded-full mr-3">
                        <Ionicons name="heart" size={24} color="#fd4a12" />
                    </View>
                    <View>
                        <Text className="text-2xl font-bold text-black arabic-font">
                            {t('navigation.wishlist')}
                        </Text>
                        <Text className="text-sm text-gray-500 arabic-font">
                            0 {t('wishlist.favorites') || 'favorites'}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity 
                    onPress={() => router.back()}
                    className="bg-gray-100 p-2 rounded-full"
                >
                    <Ionicons name="close" size={24} color="#000000" />
                </TouchableOpacity>
            </View>
        </View>
        
        {/* Professional Empty State */}
        <View className="flex-1 items-center justify-center px-8">
            {/* Decorative Heart Icon */}
            <View className="relative mb-8">
                <View 
                    className="w-32 h-32 rounded-full items-center justify-center"
                    style={{
                        backgroundColor: '#FFF5F2',
                        shadowColor: '#fd4a12',
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.2,
                        shadowRadius: 16,
                        elevation: 8,
                    }}
                >
                    <Ionicons name="heart-outline" size={64} color="#fd4a12" />
                </View>
                {/* Decorative Mini Hearts */}
                <View className="absolute -top-2 -right-2 p-2 rounded-full" style={{ backgroundColor: '#fd4a12' }}>
                    <Ionicons name="heart" size={16} color="white" />
                </View>
                <View className="absolute -bottom-2 -left-2 p-2 rounded-full" style={{ backgroundColor: '#000000' }}>
                    <Ionicons name="heart" size={12} color="white" />
                </View>
            </View>

            <Text className="text-2xl font-bold text-black mb-2 text-center arabic-font">
                {t('wishlist.emptyTitle')}
            </Text>
            <Text className="text-gray-500 text-center mb-8 arabic-font leading-6">
                {t('wishlist.emptySubtitle')}
            </Text>

            {/* Helper Tip */}
            <View className="p-4 rounded-xl mb-8 flex-row items-center" style={{ backgroundColor: '#FFF5F2' }}>
                <Ionicons name="information-circle" size={20} color="#fd4a12" />
                <Text className="text-sm text-gray-600 ml-2 flex-1 arabic-font">
                    {t('wishlist.tip') || 'Tap the heart icon on any meal to add it to your favorites'}
                </Text>
            </View>

            {/* Professional Button */}
            <TouchableOpacity 
                onPress={() => router.push('/restaurants/restaurants')}
                activeOpacity={0.8}
                className="px-8 py-4 rounded-2xl shadow-lg w-full"
                style={{
                    backgroundColor: '#fd4a12',
                    shadowColor: '#fd4a12',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 8,
                }}
            >
                <View className="flex-row items-center justify-center">
                    <Ionicons name="restaurant" size={22} color="white" />
                    <Text className="text-white text-center font-bold text-lg ml-2 arabic-font">
                        {t('wishlist.browseRestaurants')}
                    </Text>
                    <Ionicons name="arrow-forward" size={20} color="white" className="ml-2" />
                </View>
            </TouchableOpacity>
        </View>

       <CreativeBottomNavigation />
      </SafeAreaView>
  )
}
