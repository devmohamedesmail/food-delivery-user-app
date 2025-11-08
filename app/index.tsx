import BottomNavigation from '@/components/BottomNavigation'
import { useRouter } from 'expo-router';
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, TouchableOpacity, SafeAreaView, Image, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/context/auth_context';
import { useAppSelector, selectCartTotalItems } from '@/store/hooks';
import Banner from '@/components/Banner';
import CreativeBottomNavigation from '@/components/CreativeBottomNavigation';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import i18n from '@/lib/i18n';
import HomeCategories from '@/components/HomeCategories';
import FeaturedMeals from '@/components/FeaturedMeals';
import Copouns from '@/components/Copouns';
import PopularResturants from '@/components/PopularResturants';

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const { auth } = useAuth();
  const totalItems = useAppSelector(selectCartTotalItems);

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

 

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



  const coupons = [
    {
      id: 1,
      code: 'FIRST50',
      discount: '50% OFF',
      description: t('home.firstOrderCoupon') || 'First order discount',
      color: '#fd4a12',
      icon: '🎫',
    },
    {
      id: 2,
      code: 'FREE20',
      discount: 'FREE DELIVERY',
      description: t('home.ordersAbove20') || 'On orders above $20',
      color: '#4ECDC4',
      icon: '🚚',
    },
    {
      id: 3,
      code: 'WEEKEND30',
      discount: '30% OFF',
      description: t('home.weekendSpecial') || 'Weekend special offer',
      color: '#FFB347',
      icon: '🎉',
    },
  ];

 

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      {/* Creative Header with Gradient */}
      <LinearGradient
        colors={['#fd4a12', '#FF6A3D', '#FFC24A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-6 py-6 pt-14 pb-8 rounded-b-[32px]"
        style={{
          shadowColor: '#fd4a12',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 8,
        }}
      >
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center flex-1">
            <View className="w-14 h-14 rounded-full bg-white/20 items-center justify-center mr-3 border-2 border-white/30">
              <Text className="text-2xl">👋</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white/80 text-sm arabic-font mb-1">
                {t('home.welcome')}
              </Text>
              <Text className="text-white text-lg font-bold arabic-font-bold">
                {auth?.user?.name || auth?.name || t('home.guest')}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => router.push('/notifications/notifications')} 
              className="w-11 h-11 rounded-full bg-white/20 items-center justify-center mr-2 border border-white/30"
            >
              <FontAwesome name="bell" size={20} color="white" />
              <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center border-2 border-white">
                <Text className="text-[10px] text-white font-bold">3</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => router.push('/cart/cart')} 
              className="w-11 h-11 rounded-full bg-white/20 items-center justify-center border border-white/30"
            >
              <Ionicons name="bag" size={22} color="white" />
              {totalItems > 0 && (
                <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center border-2 border-white">
                  <Text className="text-[10px] text-white font-bold">{totalItems}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="flex-row justify-between">
          <View className="bg-white/20 rounded-2xl px-4 py-3 flex-1 mr-2 border border-white/30">
            <Text className="text-white/80 text-xs arabic-font mb-1">
              {t('home.totalOrders')}
            </Text>
            <Text className="text-white text-xl font-bold">24</Text>
          </View>
          <View className="bg-white/20 rounded-2xl px-4 py-3 flex-1 ml-2 border border-white/30">
            <Text className="text-white/80 text-xs arabic-font mb-1">
              {t('home.totalRides')}
            </Text>
            <Text className="text-white text-xl font-bold">350</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        {/* Service Cards - Circular Design */}
       <HomeCategories />

        {/* Special Offers Section */}
        <View className='px-5 mb-6'>
          <View className='flex-row justify-between items-center mb-4'>
            <Text className='text-xl font-bold text-gray-800 arabic-font'>
              {t('home.specialOffers') || 'Special Offers'}
            </Text>
            <TouchableOpacity>
              <Text className='text-primary font-semibold arabic-font'>
                {t('home.viewAll')}
              </Text>
            </TouchableOpacity>
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

        {/* Featured Meals with Offers */}
       <FeaturedMeals />

        {/* Coupons Section */}
        <Copouns />

        {/* Popular Restaurants */}
       <PopularResturants />

      
        <View className='h-20' />
      </ScrollView>

      <CreativeBottomNavigation />
    </SafeAreaView>
  );
}
