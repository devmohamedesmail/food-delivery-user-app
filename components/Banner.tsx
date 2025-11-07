import React from 'react'
import { View, Text, Image } from 'react-native'

export default function Banner() {

    const banners = [
        {
            id: 1,
            title: 'Banner 1',
            description: 'Description for Banner 1',
            image: require('../assets/images/banners/1.jpg')
        },
        {
            id: 2,
            title: 'Banner 2',
            description: 'Description for Banner 2',
            image: require('../assets/images/banners/2.jpg')
        },
        {
            id: 3,
            title: 'Banner 3',
            description: 'Description for Banner 3',
            image: require('../assets/images/banners/3.jpg')
        },
    ]
    return (
        <View className=' p-4 rounded-lg'>


            {banners.map((banner) => (
                <View key={banner.id} className='mt-2 relative rounded-3xl overflow-hidden'>
                    <Image
                        source={banner.image}
                        className='rounded-3xl'
                        style={{ width: '100%', height: 200 }}
                        resizeMode='cover'
                    />
                    <View className='absolute flex  w-full bottom-0 p-4 rounded-b-lg bg-opacity-60'>
                        <Text className='font-semibold text-white'>{banner.title}</Text>
                        <Text className='text-sm text-white'>{banner.description}</Text>
                    </View>

                </View>
            ))}

        </View>
    )
}
