import BottomNavigation from '@/components/BottomNavigation'
import { useRouter } from 'expo-router';
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  const serviceCards = [
    {
      id: 'restaurants',
      title: t('home.restaurants'),
      icon: 'restaurant-outline' as const,
      gradient: ['#FF6B6B', '#FF5252'] as const,
      route: '/restaurants/restaurants'
    },
    {
      id: 'wishlist',
      title: t('home.wishlist'),
      icon: 'heart-outline' as const,
      gradient: ['#FF6B9D', '#C44569'] as const,
      route: '/wishlist/wishlist'
    },
    {
      id: 'cart',
      title: t('home.cart'),
      icon: 'bag-outline' as const,
      gradient: ['#4ECDC4', '#26D0CE'] as const,
      route: '/cart/cart'
    },
    {
      id: 'rides',
      title: t('home.rides'),
      icon: 'car-outline' as const,
      gradient: ['#45B7D1', '#2196F3'] as const,
      route: '/rides/rides'
    }
  ];

  return (
    <View className='flex-1 bg-gray-50'>
      {/* Header */}
      <View className='pt-12 pb-6 px-6 bg-white'>
        <Text className='text-3xl arabic-font text-gray-900 mb-2'>{t('home.welcome')}</Text>
        <Text className='text-gray-600 text-lg arabic-font'>{t('home.whatDoYouNeed')}</Text>
      </View>

      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        {/* Service Cards Grid */}
        <View className='px-6 py-6'>
          <View className='flex-row flex-wrap justify-between'>
            {serviceCards.map((service, index) => (
              <TouchableOpacity
                key={service.id}
                onPress={() => handleNavigation(service.route)}
                className='w-[48%] mb-4 rounded-2xl overflow-hidden'
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={service.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className='rounded-2xl p-6 h-32'
                  style={{
                    shadowColor: service.gradient[0],
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 8,
                  }}
                >
                  <View className='flex-1 justify-between'>
                    <View className='items-center'>
                      <View className='bg-white/20 p-3 rounded-xl mb-3'>
                        <Ionicons 
                          name={service.icon as any} 
                          size={28} 
                          color="white" 
                        />
                      </View>
                    </View>
                    <Text className='text-white text-center font-semibold arabic-font text-base'>
                      {service.title}
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Additional spacing for BottomNavigation */}
        <View className='h-20' />
      </ScrollView>

      <BottomNavigation />
    </View>
  );
}
