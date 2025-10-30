import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import NavigationItem from '@/items/NavigationItem';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function BottomNavigation() {
  const { t } = useTranslation();

  const router = useRouter();

  return (
    <View className='container m-auto px-10 py-4 flex-row justify-between bg-white border-t border-gray-200'>
      <NavigationItem
        icon={<AntDesign name="home" size={24} color="black" />}
        label={t('navigation.home')}
        onPress={() => router.push('/')} />



      <NavigationItem
        icon={<Ionicons name="restaurant" size={24} color="black" />}
        label={t('navigation.restaurants')}
        onPress={() => router.push('/restaurants/restaurants')} />



      <NavigationItem
        icon={<Fontisto name="shopping-bag-1" size={24} color="black" />}
        label={t('navigation.cart')}
        onPress={() => router.push('/cart/cart')} />


      <NavigationItem
        icon={<Feather name="heart" size={24} color="black" />}
        label={t('navigation.wishlist')}
        onPress={() => router.push('/wishlist/wishlist')} />


      <NavigationItem
        icon={<FontAwesome name="user-o" size={24} color="black" />}
        label={t('navigation.account')}
        onPress={() => router.push('/account/account')} />

    </View>
  )
}
