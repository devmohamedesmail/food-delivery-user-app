import React, { useEffect, useState } from 'react';
import { View,Text,FlatList,TextInput,TouchableOpacity,Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import CustomHeader from '../../components/custom/customheader';
import Loading from '../../components/Loading';
import RestaurantItem from '../../items/RestaurantItem';
import BottomNavigation from '@/components/BottomNavigation';

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
  
  // State management
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Fetch restaurants from API
  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://uber-express-project.onrender.com/api/resturants');
      
      if (response.data.success && response.data.data.restaurants) {
        setRestaurants(response.data.data.restaurants);
        setFilteredRestaurants(response.data.data.restaurants);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load restaurants. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  };

  // Refresh functionality
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRestaurants();
    setRefreshing(false);
  };

  

  // Load data on component mount
  useEffect(() => {
    fetchRestaurants();
  }, []);



  // Loading state
  if (loading) {
    return (
      <View className="flex-1 bg-gray-50">
        <CustomHeader 
          title={t('restaurants.restaurants')} 
          onBackPress={() => router.back()}
        />
        <View className="flex-1 items-center justify-center">
          <Loading message={t('restaurants.loading')} />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <CustomHeader 
        title={t('restaurants.restaurants')} 
        onBackPress={() => router.back()}
      />

      {/* Search Bar */}
      <View className="px-4 py-4 bg-white">
        <View className="flex-row items-center bg-gray-100 rounded-2xl overflow-hidden px-4 py-1">
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
          {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} found
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

      <BottomNavigation />
    </View>
  );
}
