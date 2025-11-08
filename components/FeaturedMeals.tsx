import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { config } from '@/constants/config';

export default function FeaturedMeals() {
    const { t } = useTranslation();
    const router = useRouter();

    const handleNavigation = (route: string) => {
        router.push(route as any);
    };
    const featuredMeals = [
        {
            id: 1,
            name: t('home.pizzaMargherita') || 'Pizza Margherita',
            restaurant: 'Italian Kitchen',
            price: '12.99',
            oldPrice: '18.99',
            discount: '40% OFF',
            rating: '4.8',
            image: '🍕',
            gradient: ['#fd4a12', '#FF6A3D'] as const,
        },
        {
            id: 2,
            name: t('home.burgerCombo') || 'Burger Combo',
            restaurant: 'Burger House',
            price: '9.99',
            oldPrice: '15.99',
            discount: '35% OFF',
            rating: '4.6',
            image: '🍔',
            gradient: ['#FFB347', '#FFC24A'] as const,
        },
        {
            id: 3,
            name: t('home.sushiPlatter') || 'Sushi Platter',
            restaurant: 'Sushi Bar',
            price: '24.99',
            oldPrice: '34.99',
            discount: '30% OFF',
            rating: '4.9',
            image: '🍣',
            gradient: ['#4ECDC4', '#45B7D1'] as const,
        },
    ];
    return (
        <View className='px-5 mb-6 py-3'>
            <View className='flex-row justify-between items-center mb-4'>
                <Text className='text-xl font-bold text-gray-800 arabic-font'>
                    {t('home.hotDeals')}
                </Text>
                <TouchableOpacity onPress={() => handleNavigation('/restaurants/restaurants')}>
                    <Text className='text-primary font-semibold arabic-font'>
                        {t('home.viewAll')}
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className='py-3'>
                {featuredMeals.map((meal, index) => (
                    <TouchableOpacity
                        key={meal.id}
                        activeOpacity={0.8}
                        className='mr-4'
                        style={{ width: 220 }}
                        onPress={() => handleNavigation('/restaurants/restaurants')}
                    >
                        <View
                            className='bg-white rounded-3xl overflow-hidden'
                            style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.1,
                                shadowRadius: 12,
                                elevation: 4,
                            }}
                        >
                            <LinearGradient
                                colors={meal.gradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                className='h-32 items-center justify-center relative'
                            >
                                <Text className='text-7xl'>{meal.image}</Text>
                                <View className='absolute top-3 right-3 bg-white rounded-full px-3 py-1'>
                                    <Text className='text-xs font-bold text-red-500'>
                                        {meal.discount}
                                    </Text>
                                </View>
                            </LinearGradient>

                            <View className='p-4'>
                                <Text className='text-base font-bold text-gray-800 mb-1 arabic-font'>
                                    {meal.name}
                                </Text>
                                <Text className='text-xs text-gray-500 mb-2 arabic-font'>
                                    {meal.restaurant}
                                </Text>
                                <View className='flex-row items-center justify-between'>
                                    <View className='flex-row items-center'>
                                        <Text className='text-lg font-bold text-primary mr-2'>
                                          {config.CurrencySymbol} {meal.price}
                                        </Text>
                                        <Text className='text-sm text-gray-400 line-through'>
                                            {config.CurrencySymbol} {meal.oldPrice}
                                        </Text>
                                    </View>
                                    <View className='flex-row items-center bg-yellow-50 px-2 py-1 rounded-lg'>
                                        <Ionicons name="star" size={14} color="#FFC24A" />
                                        <Text className='text-xs font-semibold text-gray-700 ml-1'>
                                            {meal.rating}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}
