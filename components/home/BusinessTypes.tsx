import React from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import useFetch from '@/hooks/useFetch';

interface BusinessType {
  id: number;
  name_ar: string;
  name_en: string;
  description: string;
  image: string;
  place_id: number;
}

export const BusinessTypes = () => {
  const { data, loading, error } = useFetch('/business-types/place/1');
  const { t, i18n } = useTranslation();
  const router = useRouter();

  if (loading) {
    return (
      <View className='px-5 py-6'>
        <ActivityIndicator size="large" color="#fd4a12" />
      </View>
    );
  }

  if (error || !data || data.length === 0) {
    return null;
  }

  const handleBusinessTypePress = (businessType: BusinessType) => {
    // Navigate to business type screen
    router.push(`/stores`);

  };

  const getCleanImageUrl = (imageUrl: string) => {
    // Clean up image URL (remove duplicates if any)
    return imageUrl.split('\n')[0].trim();
  };

  return (
    <View className='mb-6'>

      <Text className={`text-md text-black my-4 px-5 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
        {t('home.categories')}
      </Text>

      {/* Business Types Horizontal Scroll */}
      <View
        className='flex flex-row justify-center'
      >
        {data && data.map((businessType: BusinessType) => (
          <TouchableOpacity
            key={businessType.id}
            activeOpacity={0.7}
            onPress={() => {
              router.push({
                pathname: '/stores',
                params: { businessTypeId: businessType.id.toString() }
              });
            }}
            className='items-center mx-4'
            style={{ width: 80 }}
          >
            {/* Circular Image */}
            <View
              className='w-24 h-24 rounded-md overflow-hidden mb-2 bg-gray-200'
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Image
                source={{ uri: getCleanImageUrl(businessType.image) }}
                className='w-full h-full'
                resizeMode='cover'
              />
            </View>

            {/* Name */}
            <Text
              className='font-semibold text-black text-md text-center mt-2'
              numberOfLines={2}
            >
              {i18n.language === 'ar' ? businessType.name_ar : businessType.name_en}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
