import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Swiper from 'react-native-swiper';

export default function SpecialOffers() {
    const { t, i18n } = useTranslation();
    const offers = [
        {
            id: 1,
            title: t('home.specialOffer') || 'Special Offer',
            discount: '50% OFF',
            description: t('home.firstOrder') || 'On your first order',
            gradient: ['#FF6B6B', '#fd4a12'] as const,
        },
        {
            id: 2,
            title: t('home.freeDelivery') || 'Free Delivery',
            discount: 'FREE',
            description: t('home.ordersAbove') || 'Orders above $20',
            gradient: ['#4ECDC4', '#45B7D1'] as const,
        },
        {
            id: 3,
            title: t('home.weekendDeal') || 'Weekend Deal',
            discount: '30% OFF',
            description: t('home.allRestaurants') || 'All restaurants',
            gradient: ['#FFB347', '#FFC24A'] as const,
        },
    ];

    return (
        <View className='px-5 mb-6'>
            <View className='justify-between flex-row-reverse items-center mb-4'>
                 {/* <TouchableOpacity>
                    <Text className='text-primary font-semibold arabic-font'>
                        {t('home.viewAll')}
                    </Text>
                </TouchableOpacity> */}
                <Text className='text-xl font-bold text-black arabic-font text-right'>
                    {t('home.specialOffers')}
                </Text>
               
            </View>

            <View style={{ height: 180 }}>
                <Swiper
                    autoplay
                    autoplayTimeout={4}
                    showsPagination={true}
                    dotStyle={{
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                    }}
                    activeDotStyle={{
                        backgroundColor: '#fd4a12',
                        width: 20,
                        height: 8,
                        borderRadius: 4,
                    }}
                    paginationStyle={{
                        bottom: -20,
                    }}
                >
                    {offers.map((offer) => (
                        <View key={offer.id} className='px-1'>
                            <LinearGradient
                                colors={offer.gradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                className='rounded-3xl p-6 h-40'
                                style={{
                                    shadowColor: offer.gradient[0],
                                    shadowOffset: { width: 0, height: 6 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 12,
                                    elevation: 6,
                                }}
                            >
                                <View className='flex-row justify-between items-start'>
                                    <View className='flex-1'>
                                        <Text className='text-white/90 text-sm font-semibold arabic-font mb-2'>
                                            {offer.title}
                                        </Text>
                                        <Text className='text-white text-4xl font-bold mb-2'>
                                            {offer.discount}
                                        </Text>
                                        <Text className='text-white/90 text-base arabic-font mb-4'>
                                            {offer.description}
                                        </Text>
                                        <TouchableOpacity className='bg-white rounded-full px-6 py-2 self-start'>
                                            <Text className='text-gray-800 font-bold arabic-font'>
                                                {t('home.claimNow')}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View className='w-24 h-24 rounded-full bg-white/20 items-center justify-center'>
                                        <Text className='text-6xl'>🎁</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>
                    ))}
                </Swiper>
            </View>
        </View>
    )
}
