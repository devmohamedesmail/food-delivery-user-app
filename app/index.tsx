
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/context/auth_context';
import { useAppSelector, selectCartTotalItems } from '@/store/hooks';
import CreativeBottomNavigation from '@/components/common/CreativeBottomNavigation';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Location from 'expo-location';

import HomeCategories from '@/components/home/HomeCategories';
import FeaturedMeals from '@/components/home/FeaturedMeals';
import Copouns from '@/components/home/Copouns';
import FeaturedResturants from '@/components/home/FeaturedResturants';
import { SafeAreaView } from 'react-native-safe-area-context';
import SpecialOffers from '@/components/home/SpecialOffers';
import BottomNavigation from '@/components/common/BottomNavigation';
import useFetch from '@/hooks/useFetch';
import { StoreTypes } from '@/components/home/StoreTypes';

export default function Home() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { auth } = useAuth();
  const totalItems = useAppSelector(selectCartTotalItems);

  const [location, setLocation] = useState<string>('');
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      setLoadingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setLocation('Location not available');
        setLoadingLocation(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      // Reverse geocode to get city name
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (reverseGeocode && reverseGeocode.length > 0) {
        const { city, district, subregion, region } = reverseGeocode[0];
        const locationName = city || district || subregion || region || 'Unknown';
        setLocation(locationName);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      setLocation('Unknown');
    } finally {
      setLoadingLocation(false);
    }
  };




  const { data, loading, error } = useFetch('/business-types/place/1')






  return (
    <SafeAreaView
      edges={['bottom']}
      className='flex-1 bg-white'>
      {/* Creative Header with Gradient */}
      <StatusBar hidden={true} translucent={true} />
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

        <TouchableOpacity
          onPress={getCurrentLocation}
          className="bg-white/20 rounded-full px-4 py-2 flex-row items-center border border-white/30"
          activeOpacity={0.7}
        >
          <Ionicons name="location" size={16} color="white" />
          {loadingLocation ? (
            <ActivityIndicator size="small" color="white" className="ml-2" />
          ) : (
            <Text className="text-white text-sm font-medium ml-2 arabic-font" numberOfLines={1}>
              {location || 'Get Location'}
            </Text>
          )}
        </TouchableOpacity>

        {/* Quick Stats */}
        {/* <View className="flex-row justify-between">
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
        </View> */}
      </LinearGradient>

      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>


        {/* Service Cards - Circular Design */}
        {/* <HomeCategories /> */}

        <StoreTypes />

        {/* Special Offers Section */}
        <SpecialOffers />


        {/* Featured Meals with Offers */}
        <FeaturedMeals />

        {/* Coupons Section */}
        <Copouns />

        {/* Popular Restaurants */}
        <FeaturedResturants />


        <View className='h-20' />
      </ScrollView>

      {/* <CreativeBottomNavigation /> */}
      <BottomNavigation />
    </SafeAreaView>
  );
}
