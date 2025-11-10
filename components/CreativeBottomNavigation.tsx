import React, { useContext } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { AuthContext } from '@/context/auth_context';
import Colors from '@/constants/Colors';




export default function CreativeBottomNavigation() {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const { auth } = useContext(AuthContext)

    const items = [

        {
            name: 'car',
            label: t('navigation.rides'),
            icon: <AntDesign name="car" size={20} color={Colors.light.tabIconSelected} />,
            onPress: () => { router.push('/rides/rides') }
        },
        {
            name: 'cart',
            label: 'Cart',
            icon: <MaterialCommunityIcons name="cart-variant" size={20} color={Colors.light.tabIconSelected} />,
            onPress: () => { router.push('/cart/cart') }
        },
        {
            name: 'wishlist',
            label: t('navigation.wishlist'),
            icon: <FontAwesome6 name="heart" size={20} color={Colors.light.tabIconSelected} />,
            onPress: () => { router.push('/wishlist/wishlist') }
        },
        {
            name: 'account',
            label: t('navigation.account'),
            icon: <FontAwesome name="user-o" size={20} color={Colors.light.tabIconSelected} />,
            onPress: () => { router.push(`${auth ? '/account/account' : '/auth/login'}`) }
        },
    ];
    return (
        <View className='bg-black fixed bottom-0 mx-1 flex flex-row  h-16 py-2 justify-center items-center rounded-full px-2'>

            <TouchableOpacity
                onPress={() => router.push('/')}
                className='bg-primary flex-1 h-12 rounded-full justify-center items-center mr-1'>

                <View className='flex flex-row items-center justify-between '>
                    <Ionicons name='home' size={20} color='white' />
                    <Text className='text-white text-sm  mt-1 mx-2'>{t('navigation.home')}</Text>
                </View>
            </TouchableOpacity>


            {items.map((item) => (
                <TouchableOpacity
                    onPress={item.onPress}
                    key={item.name}
                    className='bg-white w-12 h-12 rounded-full justify-center items-center m-1'>
                    {item.icon}
                </TouchableOpacity>
            ))}





        </View>
    )
}
