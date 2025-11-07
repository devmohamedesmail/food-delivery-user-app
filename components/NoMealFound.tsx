import React, { use } from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export default function NoMealFound() {
    const { t , i18n } = useTranslation();
    
    return (
        <View className="items-center justify-center py-20">
            <Ionicons name="search-outline" size={64} color="#D1D5DB" />
            <Text className="text-gray-400 text-lg mt-4" 
                style={{ fontFamily: 'Cairo_600SemiBold' }}
            >
                {t('menu.noMealsFound')}
            </Text>
            <Text className="text-gray-400 text-sm mt-2" 
                style={{ fontFamily: 'Cairo_400Regular' }}>
                {t('menu.tryDifferentSearch')}
            </Text>
        </View>
    )
}
