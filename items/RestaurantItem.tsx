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
    <View className="bg-white  mx-4 mb-4 rounded-2xl overflow-hidden">
      <View className="flex-row  items-center justify-center">
        {/* Image Container - Left Side */}
        <View  className="rounded-l-2xl flex-row  bg-gray-100">
          {!imageError && restaurant?.image ? (
            <Image 
              source={{ uri: restaurant.image }} 
              style={{
                height: 100,
                width: 100,
                resizeMode: 'cover',
                borderRadius:10,
              }}
              className="rounded-l-2xl"
              onError={() => {
                console.log('Image failed to load:', restaurant.image);
                setImageError(true);
              }}
            />
          ) : (
            // Placeholder when image fails or doesn't exist
            <View className="flex-1 items-center justify-center bg-gray-200 rounded-l-2xl">
              <Ionicons name="restaurant" size={32} color="#9CA3AF" />
              <Text className="text-gray-500 text-xs mt-1">No Image</Text>
            </View>
          )}
        </View>

        {/* Restaurant Info - Right Side */}
        <View className="flex-1 p-4 justify-between">
          <View>
            {/* Restaurant Name and Rating */}
            <View className="flex-row justify-between items-start mb-2">
              <View className="flex-1 pr-2">
                <Text className="text-lg font-bold text-gray-900 mb-1" numberOfLines={1}>
                  {restaurant.name}
                </Text>
                <View className="flex-row items-center mb-2">
                  <Ionicons name="location-outline" size={12} color="#9CA3AF" />
                  <Text className="text-gray-600 text-xs ml-1 flex-1" numberOfLines={1}>
                    {restaurant.address}
                  </Text>
                </View>
              </View>
              
              {/* Rating */}
              <View className="flex-row items-center bg-gray-50 px-2 py-1 rounded-lg">
                <Ionicons name="star" size={12} color="#F59E0B" />
                <Text className="text-gray-900 font-semibold text-xs ml-1">
                  {restaurant.rating ? restaurant.rating.toFixed(1) : '0.0'}
                </Text>
              </View>
            </View>

            {/* Additional Info */}
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <View className="flex-row items-center bg-blue-50 px-2 py-1 rounded-lg mr-2">
                  <Ionicons name="time-outline" size={12} color="#3B82F6" />
                  <Text className="text-blue-600 text-xs font-medium ml-1">
                    {restaurant.delivery_time || '30'} min
                  </Text>
                </View>
                
                {restaurant.is_verified && (
                  <View className="bg-green-50 px-2 py-1 rounded-lg mr-2">
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

          {/* View Menu Button */}
          <TouchableOpacity
            onPress={() => handleRestaurantPress(restaurant)}
            className=" bg-primary py-2 px-4 rounded-lg"
            style={{
              shadowColor: '#3B82F6',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text className="text-white text-sm font-semibold text-center">View Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
