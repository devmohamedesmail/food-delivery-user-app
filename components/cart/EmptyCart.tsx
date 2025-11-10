import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import CreativeBottomNavigation from '../CreativeBottomNavigation';


export default function EmptyCart() {
    const router = useRouter();
    const {t}=useTranslation();
    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Professional Cart Header */}
            <View className="bg-white px-5 py-4 border-b border-gray-100">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <View className="bg-primary/10 p-3 rounded-full mr-3">
                            <Ionicons name="cart" size={24} color="#FF6A3D" />
                        </View>
                        <View>
                            <Text className="text-2xl font-bold text-gray-900 arabic-font">
                                {t('navigation.cart')}
                            </Text>
                            <Text className="text-sm text-gray-500 arabic-font">
                                0 {t('cart.items') || 'items'}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity 
                        onPress={() => router.back()}
                        className="bg-gray-100 p-2 rounded-full"
                    >
                        <Ionicons name="close" size={24} color="#374151" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Empty State */}
            <View className="flex-1  px-8">
                <View className="w-96 h-96  items-center justify-center mb-6">
                    {/* <Ionicons name="bag-outline" size={48} color="#9CA3AF" /> */}
                    <Image
                        source={require('../../assets/images/banners/cartempty.png')}
                        style={{ width: 200, height: 200 }}
                    />
                </View>
                <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">{t('cart.title')}</Text>
                <Text className="text-gray-500  mb-8 text-center">
                    {t('cart.description')}
                </Text>
                <TouchableOpacity
                    onPress={() => router.push('/restaurants/restaurants')}
                    activeOpacity={0.8}
                    className="bg-primary px-8 py-4 rounded-2xl shadow-lg"
                    style={{
                        shadowColor: '#FF6A3D',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 8,
                    }}
                >
                    <View className="flex-row items-center justify-center">
                        <Ionicons name="restaurant" size={22} color="white" />
                        <Text className="text-white text-center font-bold text-lg ml-2 arabic-font">
                            {t('cart.browseRestaurants')}
                        </Text>
                        <Ionicons name="arrow-forward" size={20} color="white" className="ml-2" />
                    </View>
                </TouchableOpacity>
            </View>


            <CreativeBottomNavigation />
        </SafeAreaView>
    )
}
