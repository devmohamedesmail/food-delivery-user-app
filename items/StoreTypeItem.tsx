import { useRouter } from 'expo-router';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, Text, View, Image } from 'react-native'

export default function StoreTypeItem({ storeType }: any) {

    const router = useRouter()
    const { t, i18n } = useTranslation()
    return (
        <TouchableOpacity
            key={storeType.id}
            activeOpacity={0.7}
            onPress={() => {
                router.push({
                    pathname: '/stores',
                    params: { storeTypeId: storeType.id.toString() }
                });
            }}
            className='items-center mx-4'
            style={{ width: 80 }}
        >
            {/* Circular Image */}
            <View
                className='w-32 h-32 rounded-md overflow-hidden mb-2 bg-red-600 p-5'
            >
                <Image
                    source={{ uri: storeType.image }}
                    className='w-full h-full '
                    resizeMode='cover'
                />
            </View>

            {/* Name */}
            <Text
                className='font-semibold text-black text-md text-center mt-2'
                numberOfLines={2}
            >
                {i18n.language === 'ar' ? storeType.name_ar : storeType.name_en}
            </Text>
        </TouchableOpacity>
    )
}
