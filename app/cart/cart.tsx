import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectCartItems, selectCartTotalPrice, selectCartTotalItems } from '../../store/hooks';
import { addToCart, removeFromCart, deleteFromCart, clearCart } from '../../store/slices/cartSlice';
import BottomNavigation from '../../components/BottomNavigation';
import EmptyCart from '@/components/EmptyCart';
import { useTranslation } from 'react-i18next';
import { config } from '@/constants/config';
import CartItem from '@/items/CartItem';
import CustomButton from '@/components/custom/custombutton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Cart() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const totalItems = useAppSelector(selectCartTotalItems);
  const { t } = useTranslation();
 




  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear All', style: 'destructive', onPress: () => dispatch(clearCart()) }
      ]
    );
  };

  if (cartItems.length === 0) {
    return (
      <EmptyCart />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-4 border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-900">{t('navigation.cart')} ({totalItems})</Text>
          </View>
          <TouchableOpacity onPress={handleClearCart}>
            <Text className="text-red-500 font-semibold">{t('cart.clearCart')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Cart Items */}
        <View className="px-4 py-4">
          {cartItems.map((item) => (
            // <View key={item.id} className="bg-white rounded-xl mb-4 p-4 shadow-sm">
            //   <View className="flex-row">
            //     {/* Item Image */}
            //     <View className="w-20 h-20 rounded-xl bg-gray-200 overflow-hidden mr-4">
            //       <Image
            //         source={{ uri: item.image }}
            //         style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
            //       />
            //     </View>

            //     {/* Item Details */}
            //     <View className="flex-1">
            //       <View className="flex-row justify-between items-start mb-2">
            //         <Text className="text-lg font-bold text-gray-900 flex-1 mr-2" numberOfLines={1}>
            //           {item.name}
            //         </Text>
            //         <TouchableOpacity 
            //           onPress={() => handleRemoveItem(item.id, item.name)}
            //           className="p-1"
            //         >
            //           <Ionicons name="trash-outline" size={20} color="#EF4444" />
            //         </TouchableOpacity>
            //       </View>

            //       <Text className="text-gray-600 text-sm mb-3" numberOfLines={2}>
            //         {item.description}
            //       </Text>
            //       <Text className="text-gray-600 text-sm mb-3" numberOfLines={2}>
            //         {item.restaurantName}
            //       </Text>

            //       <View className="flex-row items-center justify-between">
            //         {/* Price */}
            //         <Text className="text-lg font-bold text-gray-900">
            //           {config.CurrencySymbol} {(item.price * item.quantity).toFixed(2)}
            //         </Text>

            //         {/* Quantity Controls */}
            //         <View className="flex-row items-center bg-gray-100 rounded-xl">
            //           <TouchableOpacity
            //             onPress={() => handleDecreaseQuantity(item.id)}
            //             className="p-2"
            //           >
            //             <Ionicons name="remove" size={18} color="#374151" />
            //           </TouchableOpacity>
                      
            //           <View className="px-4 py-2">
            //             <Text className="font-bold text-gray-900">{item.quantity}</Text>
            //           </View>
                      
            //           <TouchableOpacity
            //             onPress={() => handleIncreaseQuantity(item.id)}
            //             className="p-2"
            //           >
            //             <Ionicons name="add" size={18} color="#374151" />
            //           </TouchableOpacity>
            //         </View>
            //       </View>
            //     </View>
            //   </View>
            // </View>
            <CartItem key={item.id} item={item} />
          ))}
        </View>

        {/* Order Summary */}
        <View className="bg-white mx-4 rounded-xl p-4 mb-4 shadow-sm">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            {t('cart.orderSummary')}
          </Text>
          
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600">{t('cart.subtotal')} ({totalItems} items)</Text>
            <Text className="font-semibold text-gray-900">{config.CurrencySymbol} {totalPrice.toFixed(2)}</Text>
          </View>
          
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600">{t('cart.deliveryFee')}</Text>
            <Text className="font-semibold text-gray-900">{config.CurrencySymbol} 2.99</Text>
          </View>
          
          <View className="border-t border-gray-200 pt-2 mt-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold text-gray-900">{t('cart.total')}</Text>
              <Text className="text-lg font-bold text-gray-900">
                {config.CurrencySymbol} {(totalPrice + 2.99).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Checkout Button */}
        <View className="px-4 pb-4">
          {/* <TouchableOpacity onPress={()=> router.push('/order/order')} className="bg-gray-900 py-4 rounded-xl">
            <Text className="text-white text-center font-bold text-lg">
              {t('cart.proceedToCheckout')}
            </Text>
          </TouchableOpacity> */}
             <CustomButton 
               title={t('cart.proceedToCheckout')} 
               onPress={() => router.push('/order/order')} 
               icon={<MaterialIcons name="shopping-cart-checkout" size={24} color="white" />} />
        </View>

     

        {/* Bottom spacing for navigation */}
        <View className="h-20" />
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
}
