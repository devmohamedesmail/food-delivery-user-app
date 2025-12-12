import { useRouter } from 'expo-router';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, Text, View, Image } from 'react-native'

export default function StoreTypeItem({ storeType }: any) {

    const router = useRouter()
    const { i18n } = useTranslation()
    return (
        <TouchableOpacity
            key={storeType.id}
            onPress={() => {
                router.push({
                    pathname: '/stores',
                    params: { storeType: JSON.stringify(storeType) }
                });
            }}
            className='items-center mb-2  rounded-xl overflow-hidden'
            style={{ width: '30%' }}
        >
            {/* Circular Image */}
            <View
                className='w-full h-36 rounded-2xl overflow-hidden mb-2 flex items-center justify-center '
            >
                <Image
                    source={{ uri: storeType.image }}
                    className='rounded-2xl'
                    style={{ width: '100%', height: '100%' }}
                    resizeMode='cover'
                />
            </View>
            <Text
                className='font-extrabold text-black text-md text-center mt-2'
                numberOfLines={2}
            >
                {i18n.language === 'ar' ? storeType.name_ar : storeType.name_en}
            </Text>
        </TouchableOpacity>
    )
}
