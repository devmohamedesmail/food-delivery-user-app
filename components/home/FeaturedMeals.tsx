import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { config } from '@/constants/config';
import useFetch from '@/hooks/useFetch';

export default function FeaturedMeals() {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const { data, loading, error } = useFetch('/menu/sale/meals')

    const handleNavigation = (route: string) => {
        router.push(route as any);
    };


    return (
        <>
            {data && !loading && data.length > 0 ? (
                <View className='px-5 mb-6 py-3'>
                    <View className={`flex-row justify-between items-center mb-4 ${i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <Text className='text-xl font-bold text-black arabic-font'>
                            {t('home.hotDeals')}
                        </Text>
                        <TouchableOpacity onPress={() => handleNavigation('/offers')}>
                            <Text className='text-primary font-semibold'>
                                {t('home.viewAll')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='py-3'>


                        {loading ? (
                            <View className='flex-row items-center justify-center py-8 px-4'>
                                <ActivityIndicator size="large" color="#fd4a12" />
                                <Text className='text-gray-400 ml-3 text-center'>{t('home.loading')}</Text>
                            </View>
                        ) : (
                            <>
                                {data && data.length > 0 ? (
                                    <>
                                        {data.map((meal: any, index: number) => {
                                            const discount = meal.sale && meal.price
                                                ? Math.round(((parseFloat(meal.price) - parseFloat(meal.sale)) / parseFloat(meal.price)) * 100)
                                                : 0;
                                            const hasDiscount = parseFloat(meal.sale) < parseFloat(meal.price);

                                            return (
                                                <TouchableOpacity
                                                    key={meal.id}
                                                    activeOpacity={0.8}
                                                    className='mr-4'
                                                    style={{ width: 220 }}
                                                    onPress={() => handleNavigation('/restaurants/menu')}
                                                >
                                                    <View
                                                        className='bg-white rounded-3xl overflow-hidden'
                                                        style={{
                                                            shadowColor: '#000',
                                                            shadowOffset: { width: 0, height: 4 },
                                                            shadowOpacity: 0.1,
                                                            shadowRadius: 12,
                                                            elevation: 1,
                                                        }}
                                                    >
                                                        {/* Image Section */}
                                                        <View className='relative'>
                                                            <Image
                                                                source={{ uri: meal.image }}
                                                                style={{ width: '100%', height: 140 }}
                                                                resizeMode='cover'
                                                            />
                                                            {hasDiscount && (
                                                                <View className='absolute top-3 right-3 rounded-full px-3 py-1' style={{ backgroundColor: '#fd4a12' }}>
                                                                    <Text className='text-xs font-bold text-white'>
                                                                        {discount}% OFF
                                                                    </Text>
                                                                </View>
                                                            )}
                                                            {meal.category && (
                                                                <View className='absolute bottom-3 left-3 bg-black/70 rounded-full px-3 py-1'>
                                                                    <Text className='text-xs text-white arabic-font'>
                                                                        {meal.category.name}
                                                                    </Text>
                                                                </View>
                                                            )}
                                                        </View>

                                                        {/* Content Section */}
                                                        <View className='p-4'>
                                                            <Text
                                                                className='text-base font-bold text-gray-800 mb-1 arabic-font'
                                                                numberOfLines={1}
                                                            >
                                                                {meal.title}
                                                            </Text>
                                                            {meal.restaurant && (
                                                                <View className='flex-row items-center mb-2'>
                                                                    <Ionicons name="restaurant-outline" size={12} color="#9CA3AF" />
                                                                    <Text
                                                                        className='text-xs text-gray-500 ml-1 arabic-font'
                                                                        numberOfLines={1}
                                                                    >
                                                                        {meal.restaurant.name}
                                                                    </Text>
                                                                </View>
                                                            )}

                                                            {/* Price Section */}
                                                            <View className='flex-row items-center justify-between mt-2'>
                                                                <View className='flex-row items-center flex-1'>
                                                                    <Text className='text-lg font-bold mr-2' style={{ color: '#fd4a12' }}>
                                                                        {config.CurrencySymbol}{parseFloat(meal.sale).toFixed(2)}
                                                                    </Text>
                                                                    {hasDiscount && (
                                                                        <Text className='text-sm text-gray-400 line-through'>
                                                                            {config.CurrencySymbol}{parseFloat(meal.price).toFixed(2)}
                                                                        </Text>
                                                                    )}
                                                                </View>
                                                                <TouchableOpacity
                                                                    className='rounded-full p-2'
                                                                    style={{ backgroundColor: '#fd4a12' }}
                                                                    onPress={() => {/* Add to cart logic */ }}
                                                                >
                                                                    <Ionicons name="add" size={16} color="white" />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <View className='flex-1 items-center justify-center py-8 px-4'>
                                        <Ionicons name="fast-food-outline" size={48} color="#D1D5DB" />
                                        <Text className='text-gray-400 mt-3 text-center arabic-font'>
                                            {t('home.noOffers') || 'No special offers available'}
                                        </Text>
                                    </View>
                                )}
                            </>
                        )}
                    </ScrollView>
                </View>
            ) : (<></>)}
        </>
    )
}
