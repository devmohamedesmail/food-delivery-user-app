import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import NavigationItem from '@/items/NavigationItem';
import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AuthContext } from '@/context/auth_context';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function BottomNavigation() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const { auth } = useContext(AuthContext)

  // Split navigation items - 2 on left, center fab, 2 on right
  const leftNavItems = [
    {
      icon: <AntDesign name="home" size={24} />,
      label: t('navigation.home'),
      isActive: pathname === '/',
      onPress: () => router.push('/'),
    },
    {
      icon: <Ionicons name="car" size={24} />,
      label: t('navigation.transport'),
      isActive: pathname.includes('/rides'),
      onPress: () => router.push('/rides'),
    },
  ];

  const rightNavItems = [
    {
      icon: <Feather name="heart" size={24} />,
      label: t('navigation.wishlist'),
      isActive: pathname.includes('/wishlist'),
      onPress: () => router.push('/wishlist/wishlist'),
    },
    {
      icon: <FontAwesome name="user-o" size={22} />,
      label: t('navigation.account'),
      isActive: pathname.includes('/account') || pathname.includes('/auth'),
      onPress: () => router.push(`${auth ? '/account/account' : '/auth/login'}`),
    },
  ];

  const centerAction = {
    isActive: pathname.includes('/cart'),
    onPress: () => router.push('/cart/cart'),
  };

  return (
    <View className="relative h-20 bg-transparent">
      {/* Curved SVG Background */}
      <Svg
        width={width}
        height={80}
        viewBox={`0 0 ${width} 80`}
        className="absolute bottom-0  "
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 16,
        }}
      >
        <Path
          d={`
            M 0,20
            L 0,80
            L ${width},80
            L ${width},20
            Q ${width},0 ${width - 20},0
            L ${width / 2 + 50},0
            Q ${width / 2 + 45},0 ${width / 2 + 40},5
            C ${width / 2 + 35},10 ${width / 2 + 25},25 ${width / 2},25
            C ${width / 2 - 25},25 ${width / 2 - 35},10 ${width / 2 - 40},5
            Q ${width / 2 - 45},0 ${width / 2 - 50},0
            L 20,0
            Q 0,0 0,20
            Z
          `}
          fill="white"
        />
      </Svg>

      {/* Navigation Content */}
      <View className="absolute bottom-0 left-0 right-0 flex-row items-end justify-between px-6 pb-1 ">
        {/* Left Navigation Items */}
        <View className="flex-row flex-1 justify-around">
          {leftNavItems.map((item, index) => (
            <NavigationItem
              key={`left-${index}`}
              icon={item.icon}
              label={item.label}
              isActive={item.isActive}
              onPress={item.onPress}
            />
          ))}
        </View>

        {/* Center Floating Action Button */}
        <View className="items-center justify-center mb-7" >
          <TouchableOpacity
            onPress={centerAction.onPress}
            activeOpacity={0.8}
            className="items-center justify-center mb-2"
            style={{
              width: 54,
              height: 54,
              borderRadius: 32,
              backgroundColor: '#fd4a12',
              shadowColor: '#fd4a12',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <View className="items-center justify-center ">
              <Fontisto name="shopping-bag-1" size={26} color="white" />
            </View>
          </TouchableOpacity>
          <Text className="text-xs font-medium text-primary mt-1">
            {t('navigation.cart')}
          </Text>
        </View>

        {/* Right Navigation Items */}
        <View className="flex-row flex-1 justify-around">
          {rightNavItems.map((item, index) => (
            <NavigationItem
              key={`right-${index}`}
              icon={item.icon}
              label={item.label}
              isActive={item.isActive}
              onPress={item.onPress}
            />
          ))}
        </View>
      </View>

      {/* Optional: Active indicator on center button */}
      {centerAction.isActive && (
        <View 
          className="absolute rounded-full bg-white"
          style={{
            width: 6,
            height: 6,
            bottom: 68,
            left: width / 2 - 3,
          }}
        />
      )}
    </View>
  )
}
