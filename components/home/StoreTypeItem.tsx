import { useRouter } from 'expo-router';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, Text, View, Image, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export default function StoreTypeItem({ storeType }: any) {
    const router = useRouter()
    const { i18n } = useTranslation()
    const [scaleAnim] = useState(new Animated.Value(1))

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start()
    }

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start()
    }

    return (
        <Animated.View
            style={{
                width: '30%',
                transform: [{ scale: scaleAnim }],
            }}
            className='mb-4'
        >
            <TouchableOpacity
                key={storeType.id}
                onPress={() => {
                    router.push({
                        pathname: '/stores',
                        params: { storeType: JSON.stringify(storeType) }
                    });
                }}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.9}
                className='items-center'
            >
                {/* Image Container with Shadow */}
                <View
                    className='w-full h-36 rounded-3xl overflow-hidden mb-3 bg-white'
                    style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.15,
                        shadowRadius: 8,
                        elevation: 5,
                    }}
                >
                    <Image
                        source={{ uri: storeType.image }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode='cover'
                    />
                    {/* Subtle Gradient Overlay */}
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.3)']}
                        className='absolute bottom-0 left-0 right-0 h-16'
                    />
                </View>

                {/* Title */}
                <Text
                    className='font-bold text-gray-800 text-sm text-center px-1'
                    numberOfLines={2}
                    style={{
                        lineHeight: 18,
                    }}
                >
                    {i18n.language === 'ar' ? storeType.name_ar : storeType.name_en}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    )
}
