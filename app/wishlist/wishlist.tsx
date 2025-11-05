import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomHeader from '../../components/custom/customheader';
import BottomNavigation from '../../components/BottomNavigation';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectWishlistItems, selectWishlistTotalItems } from '../../store/hooks';
import { removeFromWishlist, clearWishlist } from '../../store/slices/wishlistSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { config } from '@/constants/config';
import EmptyWishlist from '@/components/EmptyWishlist';
import { useTranslation } from 'react-i18next';

export default function WishlistScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(selectWishlistItems);
  const totalItems = useAppSelector(selectWishlistTotalItems);
  const { t } = useTranslation();

  const handleAddToCart = (item: any) => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
    }));

    Alert.alert(
      'Added to Cart',
      `${item.name} has been added to your cart!`,
      [{ text: 'OK' }]
    );
  };

  const handleRemoveFromWishlist = (itemId: string, itemName: string) => {
    Alert.alert(
      t('wishlist.removeItem'),
      t('wishlist.areYouSureRemove', { itemName }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('common.remove'), style: 'destructive', onPress: () => dispatch(removeFromWishlist(itemId)) }
      ]
    );
  };

  const handleClearWishlist = () => {
    Alert.alert(
      t('common.clearAll'),
      t('wishlist.areYouSureClearWishlist'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('common.clearAll'), style: 'destructive', onPress: () => dispatch(clearWishlist()) }
      ]
    );
  };

  if (wishlistItems.length === 0) {
    return (
      <EmptyWishlist />
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header with item count and clear option */}
      <View className="bg-white px-4 pt-20 pb-10 border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <Text className="text-xl text-gray-900 arabic-font">

              {t('navigation.wishlist')}

              ({totalItems})</Text>
          </View>
          <TouchableOpacity onPress={handleClearWishlist}>
            <Text className="text-red-500 font-semibold arabic-font">
              {t('common.clearAll')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Wishlist Items */}
        <View className="px-4 py-4">
          {wishlistItems.map((item) => (
            <View key={item.id} className="bg-white rounded-xl mb-4 p-4 shadow-sm">
              <View className="flex-row">
                {/* Item Image */}
                <View className="w-20 h-20 rounded-xl bg-gray-200 overflow-hidden mr-4">
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                  />
                </View>

                {/* Item Details */}
                <View className="flex-1">
                  <View className="flex-row justify-between items-start mb-2">
                    <Text className="text-lg font-bold text-gray-900 flex-1 mr-2" numberOfLines={1}>
                      {item.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleRemoveFromWishlist(item.id, item.name)}
                      className="p-1"
                    >
                      <Ionicons name="heart" size={24} color="#EF4444" />
                    </TouchableOpacity>
                  </View>

                  <Text className="text-gray-600 text-sm mb-3" numberOfLines={2}>
                    {item.description}
                  </Text>

                  <View className="flex-row items-center justify-between">
                    {/* Price */}
                    <Text className="text-lg  text-gray-900 arabic-font">
                      {config.CurrencySymbol} {item.price}
                    </Text>

                    {/* Add to Cart Button */}
                    <TouchableOpacity
                      onPress={() => handleAddToCart(item)}
                      className="bg-gray-900 px-4 py-2 rounded-xl flex-row items-center"
                    >
                      <Ionicons name="bag-add" size={18} color="white" />
                      <Text className="text-white font-semibold ml-2 arabic-font">

                        {t('common.addToCart')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Summary Card */}
        <View className="bg-white mx-4 rounded-xl p-4 mb-4 shadow-sm">
          

          {/* Add All to Cart Button */}
          <TouchableOpacity
            className="bg-primary py-3 rounded-xl"
            onPress={() => {
              wishlistItems.forEach(item => handleAddToCart(item));
              Alert.alert('Success', 'All wishlist items have been added to your cart!');
            }}
          >
            <Text className="text-white text-center text-lg arabic-font">
             
              {t('common.addToCartAll')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom spacing for navigation */}
        <View className="h-20" />
      </ScrollView>

      <BottomNavigation />
    </View>
  );
}