import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function RestaurantItem({ restaurant }: any) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const { t } = useTranslation();



  // functions
  const handleRestaurantPress = (restaurant: any) => {
    router.push({
      pathname: "/restaurants/menu",
      params: {
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address
      },
    });
  };

  return (
    <TouchableOpacity
      onPress={() => handleRestaurantPress(restaurant)}
      activeOpacity={0.95}
      className="mx-4 mb-4"
    >
      <View
        className="bg-white rounded-2xl overflow-hidden"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 1,
        }}
      >
        <View className="flex-row">
          {/* Image Container - Left Side */}
          <View className="relative">
            {!imageError && restaurant?.image ? (
              <Image
                source={{ uri: restaurant.image }}
                style={{
                  height: 140,
                  width: 120,
                  resizeMode: 'cover',
                }}
                onError={() => {
                  console.log('Image failed to load:', restaurant.image);
                  setImageError(true);
                }}
              />
            ) : (
              <View
                className="items-center justify-center bg-gray-100"
                style={{ height: 140, width: 120 }}
              >
                <Ionicons name="restaurant-outline" size={36} color="#9CA3AF" />
                <Text className="text-gray-400 text-xs mt-1">No Image</Text>
              </View>
            )}

            {/* Status Badge on Image */}
            <View
              className={`absolute top-2 left-2 px-2 py-1 rounded-full ${restaurant.is_active ? 'bg-green-500' : 'bg-red-500'
                }`}
            >
              <Text className="text-white text-xs font-semibold">
                {restaurant.is_active ? t('restaurants.open') : t('restaurants.closed')}
              </Text>
            </View>
          </View>

          {/* Restaurant Info - Right Side */}
          <View className="flex-1 p-3 justify-between">
            {/* Top Section */}
            <View>
              {/* Restaurant Name and Rating */}
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1 pr-2">
                  <Text className="text-base font-bold text-gray-900 mb-1" numberOfLines={1}>
                    {restaurant.name}
                  </Text>
                </View>

                {/* Rating */}
                <View
                  className="flex-row items-center bg-amber-50 px-2 py-1 rounded-lg"
                  style={{
                    shadowColor: '#F59E0B',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                  }}
                >

                  <Text className="text-gray-900 font-bold text-xs ml-1 mr-2">
                    (
                    {restaurant.reviews.length > 0
                      ? restaurant.reviews.length
                      : 0}
                    )
                  </Text>


                  <Text className="text-gray-900 font-bold text-xs ml-1 mr-1">
                    {/* Average rating */}
                    {restaurant.reviews.length > 0
                      ? (
                        restaurant.reviews.reduce((sum:any, r:any) => sum + r.rating, 0) /
                        restaurant.reviews.length
                      ).toFixed(1)
                      : ('0.0')}
                  </Text>
                  <Ionicons name="star" size={14} color="#F59E0B" />
                </View>
              </View>

              {/* Location */}
              <View className="flex-row items-center mb-3">
                <Ionicons name="location-outline" size={14} color="#6B7280" />
                <Text className="text-gray-600 text-xs ml-1 flex-1" numberOfLines={1}>
                  {restaurant.address ? restaurant.address : ''}
                </Text>
              </View>

              {/* Additional Info Row */}
              <View className="flex-row items-center flex-wrap gap-2">
                {/* Delivery Time */}
                <View className="flex-row items-center bg-blue-50 px-2 py-1 rounded-md">
                  <Ionicons name="time-outline" size={13} color="#3B82F6" />
                  <Text className="text-blue-700 text-xs font-medium ml-1">
                    {restaurant.delivery_time || '30'} {t('restaurants.min')}

                  </Text>
                </View>

                {/* Verified Badge */}
                {restaurant.is_verified && (
                  <View className="flex-row items-center bg-green-50 px-2 py-1 rounded-md">
                    <Ionicons name="checkmark-circle" size={13} color="#10B981" />
                    <Text className="text-green-700 text-xs font-medium ml-1">{t('restaurants.verified')}</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Bottom Section - View Menu Button */}
            <View className="mt-3">
              <TouchableOpacity
                onPress={() => handleRestaurantPress(restaurant)}
                className='bg-primary flex flex-row items-center justify-center py-3 rounded-md'>
                <Text className="text-white text-xs mr-1 arabic-font">
                  {t('restaurants.viewMenu')}
                </Text>
                <Ionicons name="arrow-forward" size={14} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
