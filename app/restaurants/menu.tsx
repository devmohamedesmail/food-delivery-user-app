import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image, Share, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from "expo-router";
import MenuItem from '../../items/MenuItem';
import useFetch from '@/hooks/useFetch';
import CustomLoading from '@/components/custom/customloading';
import ErrorMessage from '@/components/ErrorMessage';
import NoMealFound from '@/components/NoMealFound';
import { useTranslation } from 'react-i18next';
import { selectCartItems, selectCartTotalItems, selectCartTotalPrice, useAppSelector } from '@/store/hooks';
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
  const { id, name, address, image, reviews } = useLocalSearchParams();
  const restaurantId = Array.isArray(id) ? id[0] : id || '';
  const { t } = useTranslation();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const totalItems = useAppSelector(selectCartTotalItems);

  // State for filtering
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenu, setFilteredMenu] = useState<any[]>([]);

  // Fetch menu data using the custom hook
  const { data: menuRestaurant, loading, error } = useFetch(`/menu/restaurant/${restaurantId}`);
  const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetch(`/categories/restaurant/${restaurantId}`);

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Ensure name is a string
  const restaurantName = Array.isArray(name) ? name[0] : name || '';
  const restaurantAddress = Array.isArray(address) ? address[0] : address || '';


  // Parse reviews
  const parsedReviews = reviews ? JSON.parse(Array.isArray(reviews) ? reviews[0] : reviews) : [];
  const averageRating = parsedReviews.length > 0
    ? (parsedReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / parsedReviews.length).toFixed(1)
    : '0.0';

  // Share function
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${restaurantName} on our app!`,
        title: restaurantName,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  // Filter menu items based on category and search
  useEffect(() => {
    if (!menuRestaurant) return;

    let filtered = menuRestaurant;

    // Filter by category
    if (selectedCategory !== null) {
      filtered = filtered.filter((item: any) => item.category_id === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter((item: any) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMenu(filtered);
  }, [menuRestaurant, selectedCategory, searchQuery]);

  // Handle category selection
  const handleCategoryPress = (categoryId: number) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null); // Deselect if already selected
    } else {
      setSelectedCategory(categoryId);
    }
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };


  // Error state
  if (error) {
    return (
      <ErrorMessage />
    );
  }








  return (
    <View className="flex-1 bg-gray-50">

      {/* Creative Header with Restaurant Image */}
      <View className='relative'>
        {/* Background Image */}
        <Image
          source={require('../../assets/images/banners/9.jpg')}
          className="w-full h-64"
          style={{ resizeMode: 'cover' }}
        />

        {/* Dark Overlay */}
        <View className="absolute inset-0 bg-black/30" />

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

        {/* Share Button */}
        <View className="absolute top-14 right-5">
          <TouchableOpacity
            onPress={handleShare}
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
            <Ionicons name="share-social" size={22} color="#fd4a12" />
          </TouchableOpacity>
        </View>

        {/* Restaurant Info Card - Overlapping */}
        <View className="absolute -bottom-16 left-5 right-5">
          <View
            className="bg-white rounded-3xl p-5"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.15,
              shadowRadius: 16,
              elevation: 10,
            }}
          >
            <Text className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Cairo_700Bold' }}>
              {restaurantName}
            </Text>
            <Text className="text-gray-500 text-sm mb-4" style={{ fontFamily: 'Cairo_400Regular' }}>
              {restaurantAddress}
            </Text>

            {/* Reviews & Info */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="star" size={20} color="#fd4a12" />
                <Text className="text-gray-800 font-bold text-base ml-1" style={{ fontFamily: 'Cairo_700Bold' }}>
                  {averageRating}
                </Text>
                <Text className="text-gray-500 text-sm ml-1" style={{ fontFamily: 'Cairo_400Regular' }}>
                  ({parsedReviews.length} reviews)
                </Text>
              </View>

              <View className="flex-row items-center">
                <Ionicons name="time-outline" size={18} color="#6B7280" />
                <Text className="text-gray-600 text-sm ml-1" style={{ fontFamily: 'Cairo_400Regular' }}>
                  25-35 min
                </Text>
              </View>

              <View className="flex-row items-center">
                <Ionicons name="bicycle-outline" size={18} color="#6B7280" />
                <Text className="text-gray-600 text-sm ml-1" style={{ fontFamily: 'Cairo_400Regular' }}>
                  $2.99
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Spacer for overlapping card */}
      <View className="h-20" />

      {/* Search Bar */}
      <View className="px-5 mb-4">
        <View
          className="flex-row items-center bg-white rounded-2xl px-4 py-3.5"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Ionicons name="search" size={22} color="#fd4a12" />
          <TextInput
            placeholder={t('menu.searchForMeals')}
            value={searchQuery}
            onChangeText={handleSearch}
            className="flex-1 ml-3 text-gray-900 text-base arabic-font text-right"
            placeholderTextColor="#9CA3AF"
          // style={{ fontFamily: 'Cairo_400Regular' }}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={22} color="#fd4a12" />
            </TouchableOpacity>
          )}
        </View>
      </View>


      {/* Header */}

      {/* Categories */}
      <View className="mb-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
          {/* All Categories Button */}
          <TouchableOpacity
            onPress={() => setSelectedCategory(null)}
            className={`px-5 py-2.5 mr-3 rounded-2xl ${selectedCategory === null ? 'bg-primary' : 'bg-white border border-gray-200'
              }`}
            style={{
              shadowColor: selectedCategory === null ? '#fd4a12' : '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: selectedCategory === null ? 0.25 : 0.05,
              shadowRadius: 4,
              elevation: selectedCategory === null ? 4 : 1,
            }}
          >
            <Text
              className={`arabic-font font-semibold ${selectedCategory === null ? 'text-white' : 'text-gray-700'
                }`}
              style={{ fontFamily: 'Cairo_600SemiBold' }}
            >
              All
            </Text>
          </TouchableOpacity>

          {/* Category Buttons */}
          {categories && categories.map((category: any) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => handleCategoryPress(category.id)}
              className={`px-5 py-2.5 mr-3 rounded-2xl ${selectedCategory === category.id ? 'bg-primary' : 'bg-white border border-gray-200'
                }`}
              style={{
                shadowColor: selectedCategory === category.id ? '#fd4a12' : '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: selectedCategory === category.id ? 0.25 : 0.05,
                shadowRadius: 4,
                elevation: selectedCategory === category.id ? 4 : 1,
              }}
            >
              <Text
                className={`arabic-font font-semibold ${selectedCategory === category.id ? 'text-white' : 'text-gray-700'
                  }`}
                style={{ fontFamily: 'Cairo_600SemiBold' }}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading ? (
        <CustomLoading />
      ) : (
        <FlatList
          data={filteredMenu || []}
          renderItem={({ item }) => <MenuItem item={item} restaurantId={restaurantId} restaurantName={restaurantName} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            marginBottom: 16
          }}
          contentContainerStyle={{
            paddingTop: 16,
            paddingBottom: getTotalItems() > 0 ? 120 : 20
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <NoMealFound />}
        />
      )}







      {cartItems.length > 0 ? (
        <View className='bg-primary h-14 fixed bottom-10 rounded-full overflow-hidden mx-4'>
          <View className='flex justify-between items-center flex-row h-14 px-6'>
            <Text className='text-white font-semibold'>{totalPrice.toFixed(2)} {config.CurrencySymbol} </Text>
           <TouchableOpacity onPress={()=> router.push('/cart/cart')}>
              <Text className='text-white font-semibold'> {t('menu.view_cart')} - ( {totalItems} ) </Text>
           </TouchableOpacity>
          </View>
        </View>
      ) : (<></>)}
    </View>
  );
}
