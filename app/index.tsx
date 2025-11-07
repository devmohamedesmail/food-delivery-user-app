import BottomNavigation from '@/components/BottomNavigation'
import { useRouter } from 'expo-router';
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/context/auth_context';
import { useAppSelector, selectCartTotalItems } from '@/store/hooks';
import Banner from '@/components/Banner';
import CreativeBottomNavigation from '@/components/CreativeBottomNavigation';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const { auth } = useAuth();
  const totalItems = useAppSelector(selectCartTotalItems);

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  const serviceCards = [
    {
      id: 'restaurants',
      title: t('home.restaurants'),
      icon: 'restaurant-outline' as const,
      gradient: ['#fd4a12', '#fd4a12'] as const,
      route: '/restaurants/restaurants'
    },
    {
      id: 'wishlist',
      title: t('home.wishlist'),
      icon: 'heart-outline' as const,
      // gradient: ['#FF6B9D', '#C44569'] as const,
      gradient: ['#fd4a12', '#FF6A3D', '#FFC24A'] as const,
      route: '/wishlist/wishlist'
    },
    {
      id: 'cart',
      title: t('home.cart'),
      icon: 'bag-outline' as const,
      // gradient: ['#4ECDC4', '#26D0CE'] as const,
      gradient: ['#fd4a12', '#C1370C'] as const,
      route: '/cart/cart'
    },
    {
      id: 'rides',
      title: t('home.rides'),
      icon: 'car-outline' as const,
      // gradient: ['#45B7D1', '#2196F3'] as const,
      gradient: ['#FF6A3D', '#fd4a12', '#FFC24A'] as const,
      route: '/rides/rides'
    }
  ];

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>

      <View className="px-6 py-3  pt-20">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">


            <View>
              <Text className="text-base text-primary font-semibold arabic-font">
                {t('home.welcome')}
              </Text>
              <Text className="text-sm text-gray-600 arabic-font">
                {auth?.user?.name || auth?.name || t('home.guest')}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.push('/notifications/notifications')} className="p-2">
              <View className="relative">
                <FontAwesome name="bell" size={20} color="black" />
                <View className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full px-2 py-0.5">
                  {/* <Text className="text-xs text-white"></Text> */}
                </View>
              </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => router.push('/cart/cart')} className="p-2">
              <View className="relative">
                <Ionicons name="bag" size={24} color="black" />
                {totalItems > 0 && (
                  <View className="absolute -top-2 -right-2 bg-primary rounded-full px-2 py-0.5">
                    <Text className="text-xs text-white">{totalItems}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>


        </View>
      </View>

      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        {/* Service Cards Grid */}
        <View className='px-5 py-4'>

          <Text className='text-xl font-bold text-gray-800 mb-5 arabic-font'>
            {t('home.services')}
          </Text>

          <View className='flex-row flex-wrap -mx-2'>
            {serviceCards.map((service, index) => (
              <View key={service.id} className='w-1/2 px-2 mb-4'>
                <TouchableOpacity
                  onPress={() => handleNavigation(service.route)}
                  activeOpacity={10}
                  className='bg-white rounded-3xl overflow-hidden'
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                    elevation: 2,
                  }}
                >
                  <LinearGradient
                    colors={[service.gradient[0] + '', service.gradient[1] + '']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className='p-5 h-36'
                  >
                    <View className='flex-1 justify-between'>
                      <View 
                        className='w-14 h-14 rounded-2xl items-center justify-center mb-2'
                        style={{ backgroundColor: service.gradient[0] + '20' }}
                      >
                        <View 
                          className='w-12 h-12 rounded-xl items-center justify-center'
                          style={{ backgroundColor: service.gradient[0] }}
                        >
                          <Ionicons
                            name={service.icon as any}
                            size={24}
                            color="white"
                          />
                        </View>
                      </View>
                      <View>
                        <Text className='text-white  arabic-font-bold text-base mb-1'>
                          {service.title}
                        </Text>
                        <View className='flex-row items-center'>
                          <Text 
                            className='text-xs font-semibold arabic-font text-white'
                            // style={{ color: service.gradient[0] }}
                          >
                            {t('home.explore')}
                          </Text>
                          <Ionicons
                            name="arrow-forward"
                            size={12}
                            // color={service.gradient[0]}
                            color="white"
                            style={{ marginLeft: 4 }}
                          />
                        </View>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <Banner />
        <View className='h-20' />
      </ScrollView>

      {/* <BottomNavigation /> */}
      <CreativeBottomNavigation />
    </SafeAreaView>
  );
}
