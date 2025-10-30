import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from "expo-router";
import axios from 'axios';
import MenuItem from '../../items/MenuItem';
import BottomNavigation from '@/components/BottomNavigation';
import { config } from '@/constants/config';

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
  const { id , name } = useLocalSearchParams();
  const [menuRestaurant, setMenuRestaurant] = useState<any[]>([]);

  // Ensure id is a string
  const restaurantId = Array.isArray(id) ? id[0] : id || '';

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const fetchMneuRestaurant = async () => {
    try {
      const response = await axios.get(`${config.URL}/menu/restaurant/${restaurantId}`);
      setMenuRestaurant(response.data.data || []);
    } catch (error) {
      console.log('Error fetching menu data:', error);
      setMenuRestaurant([]);
    }
  };

  useEffect(() => {
    fetchMneuRestaurant();
  }, [restaurantId]);








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
        data={menuRestaurant}
        renderItem={({ item }) => <MenuItem item={item} restaurantId={restaurantId} restaurantName={name} />}
        keyExtractor={(item) => item.id}
        className="flex-1"
        contentContainerStyle={{ paddingVertical: 16, paddingBottom: getTotalItems() > 0 ? 120 : 20 }}
        showsVerticalScrollIndicator={false}
      />

    
      <BottomNavigation />
    </View>
  );
}
