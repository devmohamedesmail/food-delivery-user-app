import React from 'react'
import { View } from 'react-native'
import Loading from '../Loading';
import { useTranslation } from 'react-i18next';

export default function CustomLoading({message}: {message?:string}) {
   const { t } = useTranslation();

    return (
        <View className="flex-1 bg-gray-50">
            <View className="flex-1 items-center justify-center">
                <Loading message={message || t('common.pleaseWait')} />
            </View>
        </View>
    )
}
