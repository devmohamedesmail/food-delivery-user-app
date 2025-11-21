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
                    params: { storeType: JSON.stringify(storeType) }
                });
            }}
            className='items-center m-1 pb-4 rounded-md'
            style={{ width: '31%'  }}
        >
            {/* Circular Image */}
            <View
                className='w-32 h-32 overflow-hidden bg-gray-100 mb-2 flex items-center justify-center border border-primary border-dashed rounded-full p-2'
            >
                <Image
                    source={{ uri: storeType.image }}
                    className='rounded-lg m-2'
                    style={{ width: 75, height: 75 }}
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
