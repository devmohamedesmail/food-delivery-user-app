import React from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';
import BottomNavigation from '../common/BottomNavigation';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmptyWishlist() {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["bottom"]}>
        {/* Professional Wishlist Header */}
        <View className="bg-white px-5 pt-14 pb-4 border-b border-gray-100">
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <View className="bg-primary/10 p-3 rounded-full mr-3">
                        <Ionicons name="heart" size={24} color="#fd4a12" />
                    </View>
                    <View>
                        <Text className="text-2xl font-bold text-black arabic-font">
                            {t('navigation.wishlist')}
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
           

          

            {/* Professional Button */}
            <TouchableOpacity 
                onPress={() => router.push('/')}
                activeOpacity={0.8}
                className="px-8 py-4 rounded-2xl shadow-lg w-full mt-10"
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
                    {/* <Ionicons name="restaurant" size={22} color="white" /> */}
                    <Text className="text-white text-center font-bold text-lg ml-2 arabic-font">
                        {t('navigation.home')}
                    </Text>
                    <Ionicons name="arrow-forward" size={20} color="white" className="ml-2" />
                </View>
            </TouchableOpacity>
        </View>

       <BottomNavigation />
      </SafeAreaView>
  )
}
