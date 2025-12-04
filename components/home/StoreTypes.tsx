import React from 'react'
import { View, Text} from 'react-native'
import { useTranslation } from 'react-i18next';
import useFetch from '@/hooks/useFetch';
import StoreTypeItem from '@/components/home/StoreTypeItem';
import Skeleton from '../ui/Skeleton';

interface StoreType {
  id: number;
  name_ar: string;
  name_en: string;
  description: string;
  image: string;
  place_id: number;
}

export const StoreTypes = () => {
  const { 
    data:storetypes, 
    loading:loadingStoreTypes, 
    error:errorStoreTypes } = useFetch('/store-types/place/1');

  const { t, i18n } = useTranslation();


  if (loadingStoreTypes) {
    return (
  
      <View className='py-10'>
       {/* <Skeleton width={150} height={20} rounded={12} className='mb-4 mx-5' /> */}
       <View className='flex flex-row justify-between gap-1 flex-wrap mb-4 px-5'>
         {[1,2,3,4,5,6].map((item) => (
           <Skeleton 
             key={item}
             width="32%" 
             height={130} 
             rounded={100} 
             className=' mb-4' 
           />
         ))}
       </View>
      </View>
    );
  }

  if (errorStoreTypes || !storetypes || storetypes.length === 0) {
    return null;
  }


  return (
    <View className='mb-6'>

      <Text className={`text-xl font-semibol py-5 text-black my-2 px-5 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
        {t('home.store_types_title')}
      </Text>
      <View
        className={`flex flex-row justify-start flex-wrap mb-4 mt-5 px-3 gap-2 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}
      >
        {storetypes && storetypes.map((storeType: StoreType) => (
          <StoreTypeItem key={storeType.id} storeType={storeType} />
        ))}
      </View>
    </View>
  );
}
