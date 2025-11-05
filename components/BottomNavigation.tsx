import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import NavigationItem from '@/items/NavigationItem';
import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AuthContext } from '@/context/auth_context';

export default function BottomNavigation() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const {auth} = useContext(AuthContext)


  return (
    <View className='bg-white border-t border-gray-100 px-2 py-3 shadow-lg' style={{ 
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 10
    }}>
      <View className='flex-row justify-around items-center'>
        <NavigationItem
          icon={<AntDesign name="home" size={24} />}
          label={t('navigation.home')}
          isActive={pathname === '/'}
          onPress={() => router.push('/')} 
        />

        <NavigationItem
          icon={<Ionicons name="restaurant" size={24} />}
          label={t('navigation.restaurants')}
          isActive={pathname.includes('/restaurants')}
          onPress={() => router.push('/restaurants/restaurants')} 
        />

        <NavigationItem
          icon={<Fontisto name="shopping-bag-1" size={22} />}
          label={t('navigation.cart')}
          isActive={pathname.includes('/cart')}
          onPress={() => router.push('/cart/cart')} 
        />

        <NavigationItem
          icon={<Feather name="heart" size={24} />}
          label={t('navigation.wishlist')}
          isActive={pathname.includes('/wishlist')}
          onPress={() => router.push('/wishlist/wishlist')} 
        />

        <NavigationItem
          icon={<FontAwesome name="user-o" size={22} />}
          label={t('navigation.account')}
          isActive={pathname.includes('/account') || pathname.includes('/auth')}
          onPress={() => router.push(`${auth ? '/account/account' : '/auth/login'}`)} 
        />
      </View>
    </View>
  )
}
