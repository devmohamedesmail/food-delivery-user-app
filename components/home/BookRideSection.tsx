import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function BookRideSection() {
    const router = useRouter();
    const { t } = useTranslation();
    return (
        <View className='my-6 px-1'>
            <View className='flex flex-row py-5 item-center justify-around  bg-gray-100 mx-3 overflow-hidden rounded-3xl '>

                <View>
                    <Image source={require('../../assets/images/banners/ride.png')} style={{ width: 100, height: 100 }} />
                </View>

                <View className='flex justify-end rounded-lg'>
                    <TouchableOpacity onPress={() => router.push('/rides')} className='ml-4 px-4 py-1 bg-primary h-12 rounded-lg justify-center items-center'>
                        <View className='flex flex-row items-center'>
                            <Text className='text-sm text-white font-semibold mx-2'>{t('home.book_ride_now')}</Text>
                            <AntDesign name="arrow-right" size={18} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
