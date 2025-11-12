import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import CustomHeader from '../../components/custom/customheader';
import RestaurantItem from '../../items/RestaurantItem';
import BottomNavigation from '@/components/common/BottomNavigation';
import useFetch from '@/hooks/useFetch';
import CustomLoading from '@/components/custom/customloading';
import NoResturantFound from '@/components/NoResturantFound';
import CreativeBottomNavigation from '@/components/common/CreativeBottomNavigation';

interface Restaurant {
  id: number;
  name: string;
  image: string;
  address: string;
  phone: string;
  start_time: string;
  end_time: string;
  delivery_time: string;
  rating: number;
  total_reviews: number;
  is_active: boolean;
  is_verified: boolean;
}

export default function Restaurants() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: restaurants, loading, error } = useFetch('/restaurants');

  // State management
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Update filtered restaurants when data changes
  useEffect(() => {
    if (restaurants) {
      setFilteredRestaurants(restaurants);
    }
  }, [restaurants]);

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!restaurants) return;

    if (query.trim() === '') {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter((restaurant: Restaurant) =>
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  };

  // Refresh functionality
  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };




  return (
    <View className="flex-1 bg-gray-50">
      {/* Header with Background Image */}
      <View className='relative'>
        <Image
          source={require('../../assets/images/banners/8.jpg')}
          className="w-full h-72"
          style={{ resizeMode: 'cover' }}
        />

        {/* Dark Overlay */}
        <View className="absolute inset-0 bg-black/40" />

        {/* Back Button */}
        <View className="absolute top-14 left-5">
          <TouchableOpacity
            onPress={() => router.back()}
            className='w-11 h-11 rounded-2xl items-center justify-center'
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <Ionicons name="arrow-back" size={22} color="#1a1a1a" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View className="absolute bottom-20 left-5 right-5">
          <Text className="text-white text-3xl  mb-1" style={{ fontFamily: 'Cairo_700Bold' }}>
            {t('restaurants.restaurants')}
          </Text>
          <Text className="text-white/90 text-base" style={{ fontFamily: 'Cairo_400Regular' }}>
            {t('restaurants.searchRestaurants')}
          </Text>
        </View>

        {/* Search Bar */}
        <View className="absolute bottom-5 left-5 right-5">
          <View
            className="flex-row items-center bg-white rounded-2xl px-4 py-3.5"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.2,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <Ionicons name="search" size={22} color="#fd4a12" />
            <TextInput
              placeholder={t('restaurants.searchRestaurants')}
              value={searchQuery}
              onChangeText={handleSearch}
              className="flex-1 ml-3 text-gray-900 text-base text-ri"
              placeholderTextColor="#9CA3AF"
              style={{ fontFamily: 'Cairo_400Regular' }}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <Ionicons name="close-circle" size={22} color="#fd4a12" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      {/* Header */}
      {/* <CustomHeader
        title={t('restaurants.restaurants')}
        onBackPress={() => router.back()}
      /> */}





      {loading ? (<CustomLoading message={t('restaurants.loading')} />) : (<>
        {/* Search Bar */}
        {/* <View className="px-4 py-4 bg-white">
          <View className="flex-row items-center bg-gray-100 rounded-3xl overflow-hidden px-4 py-1">
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              placeholder={t('restaurants.searchRestaurants')}
              value={searchQuery}
              onChangeText={handleSearch}
              className="flex-1 ml-3 text-gray-900"
              style={{ fontFamily: 'Cairo_400Regular' }}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        </View> */}

        {/* Results Count */}
        <View className="px-4 py-2">
          <Text className="text-gray-600 text-sm" style={{ fontFamily: 'Cairo_400Regular' }}>
            {filteredRestaurants.length}  {t('restaurants.restaurant')} {filteredRestaurants.length !== 1 ? '' : ''} {t('restaurants.found')}
          </Text>
        </View>

        {/* Restaurants List */}
        {filteredRestaurants.length > 0 ? (
          <FlatList
            data={filteredRestaurants}
            renderItem={({ item }) => <RestaurantItem restaurant={item} />}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={onRefresh}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <NoResturantFound />
        )}

      </>)}
      {/* <BottomNavigation /> */}
      <CreativeBottomNavigation />
    </View>
  );
}
