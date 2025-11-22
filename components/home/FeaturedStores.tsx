import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useFetch from '@/hooks/useFetch';

export default function FeaturedStores() {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const { data: featuredStores, loading: featuredStoresLoading } = useFetch('/stores/featured')



    const handleNavigation = (route: string) => {
        router.push(route as any);
    };

    const averageRating = (reviews: any[]) => {
        if (!reviews || reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + Number(review.rating), 0);
        return (sum / reviews.length).toFixed(1);
    };


    return (
        <>
            {featuredStores && featuredStores.length > 0 ? (
                <View className='px-5 mb-6'>
                    <View className={`flex-row justify-between items-center mb-4 ${i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <Text className={`text-xl font-bold text-gray-800 arabic-font ${i18n.language === 'ar' ? 'text-right' : ''}`}>
                            {t('home.popularRestaurants')}
                        </Text>
                        <TouchableOpacity onPress={() => handleNavigation('/restaurants/restaurants')}>
                            <Text className='text-primary'>
                                {t('home.viewAll')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='py-3'>
                        {featuredStores && featuredStores.length > 0 && featuredStores.map((store: any, index: any) => (
                            <TouchableOpacity
                                key={store.id}
                                activeOpacity={0.8}
                                className='mr-4'
                                style={{ width: 160 }}
                                onPress={() => {
                                    router.push({
                                        pathname: '/stores/products',
                                        params: { storeItem: JSON.stringify(store) }
                                    })

                                }}
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
                                        style={{ backgroundColor: store.color + '15' }}
                                    >
                                        {/* <Text className='text-6xl'>{store.logo}</Text> */}
                                        <Image
                                            source={{ uri: `${store.logo}` }}
                                            className='w-20 h-20 rounded-full'
                                            resizeMode='cover'
                                        />
                                    </View>

                                    <View className='p-3'>
                                        <Text className='text-sm font-bold text-gray-800 mb-1 arabic-font'>
                                            {store.name}
                                        </Text>

                                        <View className='flex-row items-center'>
                                            <Ionicons name="star" size={12} color="#FFC24A" />
                                            <Text className='text-xs text-gray-600 mr-1 arabic-font'>
                                                {averageRating(store.reviews)} ({store.reviews.length})
                                            </Text>
                                        </View>
                                    </View>


                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            ) : null}
        </>
    )
}
