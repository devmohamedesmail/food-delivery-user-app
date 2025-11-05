import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import CustomHeader from '../../components/custom/customheader';
import Loading from '../../components/Loading';
import RestaurantItem from '../../items/RestaurantItem';
import BottomNavigation from '@/components/BottomNavigation';
import useFetch from '@/hooks/useFetch';
import CustomLoading from '@/components/custom/customloading';

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
      {/* Header */}
      <CustomHeader
        title={t('restaurants.restaurants')}
        onBackPress={() => router.back()}
      />





      {loading ? (<CustomLoading message={t('restaurants.loading')} />) : (<>
        {/* Search Bar */}
        <View className="px-4 py-4 bg-white">
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
        </View>

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
          <View className="flex-1 items-center justify-center px-8">
            <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center mb-4">
              <Ionicons name="restaurant-outline" size={40} color="#9CA3AF" />
            </View>
            <Text className="text-gray-900 text-xl font-bold mb-2" style={{ fontFamily: 'Cairo_700Bold' }}>
              {searchQuery ? 'No restaurants found' : 'No restaurants available'}
            </Text>
            <Text className="text-gray-500 text-center leading-6" style={{ fontFamily: 'Cairo_400Regular' }}>
              {searchQuery
                ? `No restaurants match "${searchQuery}". Try a different search term.`
                : 'There are no restaurants available at the moment.'
              }
            </Text>
            {searchQuery && (
              <TouchableOpacity
                onPress={() => handleSearch('')}
                className="bg-gray-900 px-6 py-3 rounded-xl mt-4"
              >
                <Text className="text-white font-semibold" style={{ fontFamily: 'Cairo_600SemiBold' }}>
                  Clear Search
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

      </>)}










      <BottomNavigation />
    </View>
  );
}
