import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function HomeCategories() {
    const {t,i18n}=useTranslation();
    const router = useRouter();
     const serviceCards = [
    {
      id: 'restaurants',
      title: t('home.restaurants'),
      icon: 'restaurant-outline' as const,
      gradient: ['#fd4a12', '#FF6A3D'] as const,
      route: '/restaurants/restaurants',
      image: '🍽️'
    },
    {
      id: 'wishlist',
      title: t('home.wishlist'),
      icon: 'heart-outline' as const,
      gradient: ['#FF6B9D', '#fd4a12'] as const,
      route: '/wishlist/wishlist',
      image: '❤️'
    },
    {
      id: 'cart',
      title: t('home.cart'),
      icon: 'bag-outline' as const,
      gradient: ['#4ECDC4', '#26D0CE'] as const,
      route: '/cart/cart',
      image: '🛍️'
    },
    {
      id: 'rides',
      title: t('home.rides'),
      icon: 'car-outline' as const,
      gradient: ['#FFB347', '#FFC24A'] as const,
      route: '/rides/rides',
      image: '🚗'
    }
  ];
    const handleNavigation = (route: string) => {
    router.push(route as any);
  };
  return (
     <View className='px-5 py-6'>
              <Text className={`text-xl text-gray-800 mb-5 arabic-font ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
                {t('home.services')}
              </Text>
    
              <View className='flex-row flex-wrap justify-around'>
                {serviceCards.map((service, index) => (
                  <TouchableOpacity
                    key={service.id}
                    onPress={() => handleNavigation(service.route)}
                    activeOpacity={0.7}
                    className='items-center mb-6'
                    style={{ width: '25%' }}
                  >
                    <LinearGradient
                      colors={service.gradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      className='w-20 h-20 rounded-full items-center justify-center mb-3'
                      style={{
                        shadowColor: service.gradient[0],
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 5,
                      }}
                    >
                      <View className='w-18 h-18 rounded-full bg-white/20 items-center justify-center'>
                        <Text className='text-4xl'>{service.image}</Text>
                      </View>
                    </LinearGradient>
                    <Text className='text-sm font-semibold text-gray-700 text-center arabic-font'>
                      {service.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
  )
}
