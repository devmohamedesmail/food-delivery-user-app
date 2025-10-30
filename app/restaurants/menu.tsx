import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from "expo-router";
import MenuItem from '../../items/MenuItem';
import BottomNavigation from '@/components/BottomNavigation';
import useFetch from '@/hooks/useFetch';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  discount?: number;
}

interface CartItem extends MenuItem {
  quantity: number;
}

export default function Menu() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const { id, name } = useLocalSearchParams();

  // Ensure id is a string
  const restaurantId = Array.isArray(id) ? id[0] : id || '';
  
  // Fetch menu data using the custom hook
  const { data: menuRestaurant, loading, error } = useFetch(`/menu/restaurant/${restaurantId}`);

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Ensure name is a string
  const restaurantName = Array.isArray(name) ? name[0] : name || '';

  // Loading state
  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <View className="bg-white p-6 rounded-xl shadow-lg">
          <Text className="text-gray-600 text-center">Loading menu...</Text>
        </View>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View className="flex-1 bg-gray-50">
        <View className="bg-white pt-12 pb-4 shadow-sm">
          <View className="flex-row items-center justify-between px-4 mb-4">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="bg-gray-100 p-2 rounded-full"
            >
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-20 h-20 rounded-full bg-red-100 items-center justify-center mb-4">
            <Ionicons name="alert-circle-outline" size={40} color="#EF4444" />
          </View>
          <Text className="text-gray-900 text-xl font-bold mb-2 text-center">
            Failed to load menu
          </Text>
          <Text className="text-gray-500 text-center leading-6">
            Unable to load the menu. Please check your connection and try again.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white pt-12 pb-4 shadow-sm">
        <View className="flex-row items-center justify-between px-4 mb-4">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="bg-gray-100 p-2 rounded-full"
          >
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          
          <View className="flex-1 mx-4">
            <Text className="text-xl font-bold text-gray-900 text-center">Pizza Palace</Text>
            <Text className="text-gray-600 text-sm text-center">Italian Cuisine</Text>
          </View>
          
          <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
            <Ionicons name="search" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Restaurant Info */}
        <View className="flex-row items-center justify-around bg-gray-50 mx-4 p-3 rounded-xl">
          <View className="flex-row items-center">
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text className="text-gray-700 font-semibold ml-1">4.8</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text className="text-gray-700 ml-1">25-35 min</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="bicycle-outline" size={16} color="#6B7280" />
            <Text className="text-gray-700 ml-1">$2.99 delivery</Text>
          </View>
        </View>
      </View>


   

      {/* Menu Items */}
      <FlatList
        data={menuRestaurant || []}
        renderItem={({ item }) => <MenuItem item={item} restaurantId={restaurantId} restaurantName={restaurantName} />}
        keyExtractor={(item) => item.id}
        className="flex-1"
        contentContainerStyle={{ paddingVertical: 16, paddingBottom: getTotalItems() > 0 ? 120 : 20 }}
        showsVerticalScrollIndicator={false}
      />

    
      <BottomNavigation />
    </View>
  );
}
