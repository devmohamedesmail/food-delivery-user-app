import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

export default function NoOrdersFound() {
    const { t } = useTranslation();
    const router = useRouter();
    return (
        <View className="flex-1 justify-center items-center px-4">
            <Ionicons name="receipt-outline" size={80} color="#d1d5db" />
            <Text className="text-gray-900 font-bold text-xl mt-4">{t('orders.noOrders')}</Text>
            <Text className="text-gray-500 text-center mt-2">{t('orders.noOrdersDescription')}</Text>
            <TouchableOpacity
                className="bg-blue-600 px-6 py-3 rounded-xl mt-6"
                onPress={() => router.push('/restaurants/restaurants')}
            >
                <Text className="text-white font-bold">{t('home.restaurants')}</Text>
            </TouchableOpacity>
        </View>
    )
}
