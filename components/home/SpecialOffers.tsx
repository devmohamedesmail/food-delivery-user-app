import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import banner1 from '../../assets/images/banners/1.png';
import banner2 from '../../assets/images/banners/2.png';
import banner3 from '../../assets/images/banners/3.png';
import banner4 from '../../assets/images/banners/4.png';
import banner5 from '../../assets/images/banners/5.png';
import banner6 from '../../assets/images/banners/6.png';

export default function SpecialOffers() {
    const offers = [
        {
            id: 1,
            image : banner1,
        },
        {
            id: 2,
            image : banner2,
        },
        {
            id: 3,
            image : banner3,
        },
        {
            id: 4,
            image : banner4,
        },
        {
            id: 5,
            image : banner5,
        },
        {
            id: 6,
            image : banner6,
        },
    ];

    return (
        <View className='px-3 mb-6'>
        
            <View style={{ height: 180 }}>
                <Swiper
                    autoplay
                    autoplayTimeout={4}
                    showsPagination={true}
                    dotStyle={{
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                    }}
                    activeDotStyle={{
                        backgroundColor: '#fd4a12',
                        width: 20,
                        height: 8,
                        borderRadius: 4,
                    }}
                    paginationStyle={{
                        bottom: -20,
                    }}
                >
                    {offers.map((offer) => (
                        <View key={offer.id} className='px-1'>
                            <Image
                                source={offer.image}
                                className='w-full h-52 rounded-3xl'
                                resizeMode='cover'
                            />
                        </View>
                    ))}
                </Swiper>
            </View>
        </View>
    )
}
