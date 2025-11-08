import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PopularResturants() {
    const { t } = useTranslation();
    const router = useRouter();

    const handleNavigation = (route: string) => {
        router.push(route as any);
    };



    const popularRestaurants = [
        {
            id: 1,
            name: 'Pizza Palace',
            cuisine: t('home.italian') || 'Italian',
            rating: '4.8',
            deliveryTime: '20-30 min',
            image: '🍕',
            color: '#fd4a12',
        },
        {
            id: 2,
            name: 'Sushi Master',
            cuisine: t('home.japanese') || 'Japanese',
            rating: '4.9',
            deliveryTime: '25-35 min',
            image: '🍱',
            color: '#4ECDC4',
        },
        {
            id: 3,
            name: 'Burger King',
            cuisine: t('home.american') || 'American',
            rating: '4.7',
            deliveryTime: '15-25 min',
            image: '🍔',
            color: '#FFB347',
        },
        {
            id: 4,
            name: 'Taco Fiesta',
            cuisine: t('home.mexican') || 'Mexican',
            rating: '4.6',
            deliveryTime: '20-30 min',
            image: '🌮',
            color: '#FF6B9D',
        },
    ];
    return (
        <View className='px-5 mb-6'>
            <View className='flex-row justify-between items-center mb-4'>
                <Text className='text-xl font-bold text-gray-800 arabic-font'>
                    {t('home.popularRestaurants')}
                </Text>
                <TouchableOpacity onPress={() => handleNavigation('/restaurants/restaurants')}>
                    <Text className='text-primary font-semibold arabic-font'>
                        {t('home.viewAll') || 'View All'}
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {popularRestaurants.map((restaurant, index) => (
                    <TouchableOpacity
                        key={restaurant.id}
                        activeOpacity={0.8}
                        className='mr-4'
                        style={{ width: 160 }}
                        onPress={() => handleNavigation('/restaurants/restaurants')}
                    >
                        <View
                            className='bg-white rounded-2xl overflow-hidden'
                            style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.1,
                                shadowRadius: 10,
                                elevation: 3,
                            }}
                        >
                            <View
                                className='h-28 items-center justify-center'
                                style={{ backgroundColor: restaurant.color + '15' }}
                            >
                                <Text className='text-6xl'>{restaurant.image}</Text>
                            </View>

                            <View className='p-3'>
                                <Text className='text-sm font-bold text-gray-800 mb-1 arabic-font'>
                                    {restaurant.name}
                                </Text>
                                <Text className='text-xs text-gray-500 mb-2 arabic-font'>
                                    {restaurant.cuisine}
                                </Text>
                                <View className='flex-row items-center justify-between'>
                                    <View className='flex-row items-center'>
                                        <Ionicons name="star" size={12} color="#FFC24A" />
                                        <Text className='text-xs text-gray-600 ml-1'>
                                            {restaurant.rating}
                                        </Text>
                                    </View>
                                    <View className='flex-row items-center'>
                                        <Ionicons name="time-outline" size={12} color="#9CA3AF" />
                                        <Text className='text-xs text-gray-500 ml-1'>
                                            {restaurant.deliveryTime.split(' ')[0]}
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
