import React from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import CustomHeader from '../custom/customheader';
import Loading from '../Loading';

export default function CustomLoading() {
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <View className="flex-1 bg-gray-50">
            <CustomHeader
                title={t('restaurants.restaurants')}
                onBackPress={() => router.back()}
            />
            <View className="flex-1 items-center justify-center">
                <Loading message={t('restaurants.loading')} />
            </View>
        </View>
    )
}
