import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RestaurantItem({ restaurant }: any) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);



  // functions
  const handleRestaurantPress = (restaurant: any) => {
    router.push({
      pathname: "/restaurants/menu",
      params: { 
        id: restaurant.id,
        name: restaurant.name,
      }, 
    });
  };

  return (
    <TouchableOpacity
      onPress={() => handleRestaurantPress(restaurant)}
      className="bg-white mx-4 mb-4 rounded-2xl overflow-hidden"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      {/* Image Container */}
      <View style={{ height: 192, width: '100%', backgroundColor: '#f3f4f6' }}>
        {!imageError && restaurant?.image ? (
          <Image 
            source={{ uri: restaurant.image }} 
            style={{
              height: '100%',
              width: '100%',
              resizeMode: 'cover'
            }}
            onError={() => {
              console.log('Image failed to load:', restaurant.image);
              setImageError(true);
            }}
          />
        ) : (
          // Placeholder when image fails or doesn't exist
          <View className="flex-1 items-center justify-center bg-gray-200">
            <Ionicons name="restaurant" size={40} color="#9CA3AF" />
            <Text className="text-gray-500 text-sm mt-2">No Image</Text>
          </View>
        )}
      </View>

      {/* Restaurant Info */}
      <View className="p-4">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900 mb-1" numberOfLines={1}>
              {restaurant.name || 'Restaurant Name'}
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={14} color="#9CA3AF" />
              <Text className="text-gray-600 text-sm ml-1 flex-1" numberOfLines={1}>
                {restaurant.address || 'Address not available'}
              </Text>
            </View>
          </View>
          
          {/* Rating */}
          <View className="flex-row items-center bg-gray-50 px-2 py-1 rounded-lg ml-2">
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text className="text-gray-900 font-semibold text-sm ml-1">
              {restaurant.rating ? restaurant.rating.toFixed(1) : '0.0'}
            </Text>
          </View>
        </View>

        {/* Additional Info */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="flex-row items-center bg-blue-50 px-3 py-1.5 rounded-lg mr-3">
              <Ionicons name="time-outline" size={14} color="#3B82F6" />
              <Text className="text-blue-600 text-sm font-medium ml-1">
                {restaurant.delivery_time || '30'} min
              </Text>
            </View>
            
            {restaurant.is_verified && (
              <View className="bg-green-50 px-2 py-1 rounded-lg">
                <Text className="text-green-600 text-xs font-medium">Verified</Text>
              </View>
            )}
          </View>

          {/* Status */}
          <View className={`px-2 py-1 rounded-lg ${
            restaurant.is_active ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <Text className={`text-xs font-medium ${
              restaurant.is_active ? 'text-green-600' : 'text-red-600'
            }`}>
              {restaurant.is_active ? 'Open' : 'Closed'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
