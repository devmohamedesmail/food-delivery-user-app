import React from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import useFetch from '@/hooks/useFetch';
import { store } from '@/store';
import StoreTypeItem from '@/items/StoreTypeItem';
import Loading from '../common/Loading';

interface StoreType {
  id: number;
  name_ar: string;
  name_en: string;
  description: string;
  image: string;
  place_id: number;
}

export const StoreTypes = () => {
  const { data:storetypes, loading:loadingStoreTypes, error:errorStoreTypes } = useFetch('/store-types/place/1');
  const { t, i18n } = useTranslation();
  const router = useRouter();


  if (loadingStoreTypes) {
    return (
      
      <View className='py-10'>
        <Loading message={t('common.pleasewait')} />
      </View>
    );
  }

  if (errorStoreTypes || !storetypes || storetypes.length === 0) {
    return null;
  }


  return (
    <View className='mb-6'>

      <Text className={`text-md text-black my-4 px-5 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
        {t('home.categories')}
      </Text>

      {/* Business Types Horizontal Scroll */}
      <View
        className={`flex flex-row justify-start flex-wrap mb-4 px-5 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}
      >
        {storetypes && storetypes.map((storeType: StoreType) => (
          <StoreTypeItem key={storeType.id} storeType={storeType} />
        ))}
      </View>
    </View>
  );
}
