import React from 'react';
import { View, Text, ScrollView, TouchableOpacity,Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppSelector, useAppDispatch, selectCart } from '../../store/hooks';
import { selectCartItems, selectCartTotalPrice, selectCartTotalItems } from '../../store/hooks';
import { clearCart } from '../../store/slices/cartSlice';
import EmptyCart from '@/components/cart/EmptyCart';
import { useTranslation } from 'react-i18next';
import { config } from '@/constants/config';
import CartItem from '@/items/CartItem';
import CustomButton from '@/components/custom/Button';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '@/context/auth_context';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Cart() {
  const router = useRouter();
  const dispatch = useAppDispatch();
 

  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const totalItems = useAppSelector(selectCartTotalItems);
  const { t ,i18n} = useTranslation();
  const {auth} = useAuth();
  const cart = useAppSelector(selectCart);



console.log(typeof cart.store.delivery_fee);
console.log(typeof totalPrice);



  const handleClearCart = () => {
    Alert.alert(
       t('cart.clearCart'),
      t('cart.areYouSureClearCart'),
      [
        { text: t('cart.cancel'), style: 'cancel' },
        { text: t('cart.clear_all'), style: 'destructive', onPress: () => dispatch(clearCart()) }
      ]
    );
  };

  if (cartItems.length === 0) {
    return (
      <EmptyCart />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["bottom"]}>
      {/* Creative Header */}
      <View 
        className="pt-14 pb-8 px-5"
        style={{ backgroundColor: '#242424' }}
      >
        {/* Top Row - Back Button & Clear Cart */}
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity 
            onPress={() => router.back()}
            className='w-11 h-11 rounded-2xl items-center justify-center'
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <Ionicons name="arrow-back" size={22} color="white" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleClearCart}
            className='flex-row items-center px-4 py-2 rounded-2xl'
            style={{
              backgroundColor: 'rgba(253, 74, 18, 0.15)',
              borderWidth: 1,
              borderColor: 'rgba(253, 74, 18, 0.3)',
            }}
          >
            <Ionicons name="trash-outline" size={18} color="white" />
            <Text className="text-sm font-semibold ml-2 arabic-font text-white">
              {t('cart.clearCart')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Title & Items Count */}
        <View className="mb-4">
          <Text className="text-3xl text-center text-white mb-2">
            {t('navigation.cart')}
          </Text>
         
        </View>

        {/* Total Price Card */}
        <View 
          className="rounded-2xl p-4 flex-row items-center justify-between border border-white/10 "
         
        >
          <View>
            <Text className="text-white text-md mb-1 " >
              
              {t('cart.totalAmount')}
            </Text>
            <Text className="text-white text-2xl font-bold" style={{ fontFamily: 'Cairo_700Bold' }}>
              {config.CurrencySymbol} {(totalPrice + Number(cart.store.delivery_fee)).toFixed(2)}
            </Text>
          </View>
          <View 
            className="w-12 h-12 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(253, 74, 18, 0.2)' }}
          >
            <Ionicons name="wallet" size={24} color="white" />
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Cart Items */}
        {/* <View className="px-4 py-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </View> */}

         <View className="px-4 py-4">
          {cart.items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </View>

        {/* Order Summary */}
        <View className="bg-white mx-4 rounded-xl p-4 mb-4 shadow-sm">
          <Text className={`text-lg text-gray-900 mb-4 ${i18n.language === 'ar' ? 'text-right' : ''}`}>
            {t('cart.orderSummary')}
          </Text>

          <View className={`flex-row justify-between items-center mb-2 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
            {/* <Text className="text-gray-600 arabic-font text-sm">{t('cart.subtotal')} ({totalItems} {t('cart.items')})</Text>
            <Text className="font-semibold text-gray-900">{config.CurrencySymbol} {totalPrice.toFixed(2)}</Text> */}
          </View>
          
          <View className={`flex-row justify-between items-center mb-2 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <Text className="text-gray-600  text-sm">{t('cart.deliveryFee')}</Text>
            <Text className="font-semibold text-gray-900">{config.CurrencySymbol} {cart.store.delivery_fee}</Text>
          </View>
          
          <View className="border-t border-gray-200 pt-2 mt-2">
            <View className={`flex-row justify-between items-center  ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <Text className="text-lg text-gray-900 ">{t('cart.total')}</Text>
              <Text className="text-lg font-bold text-gray-900">
                {config.CurrencySymbol} {(totalPrice + Number(cart.store.delivery_fee)).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>




        {/* Login Notice or Thank You Message */}
        {!auth ? (
          <View className="mx-4 mb-4 bg-amber-50 rounded-2xl p-4 border-2 border-amber-200">
            <View className="flex-row items-start">
              <View className="bg-amber-200 p-2 rounded-full mr-3">
                <Ionicons name="alert-circle" size={24} color="#D97706" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-amber-900 mb-2 arabic-font">
                  {t('cart.loginRequired')}
                </Text>
                <Text className="text-sm text-amber-800 mb-3 arabic-font">
                  {t('cart.loginMessage')}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push('/auth/login')}
                  className="bg-amber-600 py-2 px-4 rounded-lg flex-row items-center justify-center"
                  style={{
                    shadowColor: '#D97706',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 3,
                  }}
                >
                  <Ionicons name="log-in-outline" size={18} color="white" />
                  <Text className="text-white font-semibold ml-2 arabic-font">
                    {t('cart.loginNow')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View className="mx-4 mb-4 bg-green-50 rounded-2xl p-4 border border-green-200">
            <View className="flex-row items-center">
              <View className="bg-green-200 p-2 rounded-full mr-3">
                <Ionicons name="checkmark-circle" size={24} color="#059669" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-green-900 mb-1 arabic-font">
                  {t('cart.readyToCheckout')}
                </Text>
                <Text className="text-sm text-green-700 arabic-font">
                  {t('cart.thankYou')}
                </Text>
              </View>
            </View>
          </View>
        )}



        {/* Checkout Button */}
        <View className="px-4 pb-4">
             <CustomButton 
               title={auth ? t('cart.proceedToCheckout') : t('cart.loginToCheckout')} 
               onPress={() => auth ? router.push('/order/order') : router.push('/auth/login')} 
               icon={<MaterialIcons name="shopping-cart-checkout" size={24} color="white" />} />
        </View>

     

        {/* Bottom spacing for navigation */}
        <View className="h-20" />
      </ScrollView>

      {/* <BottomNavigation /> */}
    </SafeAreaView>
  );
}
