import { useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { config } from '@/constants/config'
import { useTranslation } from 'react-i18next'


interface StoreItem {
  id: number;
  name: string;
  address: string;
  phone: string;
  logo: string;
  banner: string;
  start_time: string;
  end_time: string;
  delivery_time: string;
  delivery_fee: string;
  rating: string;
  review_count: number;
  is_active: boolean;
  is_verified: boolean;
  business_type_id: number;
}

export default function StoreItem({ item }: { item: StoreItem }) {

 
  const router = useRouter();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        router.push({
          pathname: '/stores/products',
          // params: { storeId: item.id.toString() }
          params: { storeItem : JSON.stringify(item)}
        })

      }}
      className='mb-4 mx-5'
    >
      <View
        className='bg-white rounded-2xl overflow-hidden'
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        {/* Banner Image */}
        <View className='relative h-40 bg-gray-200'>
          <Image
            source={{ uri: item.banner }}
            className='w-full h-full'
            resizeMode='cover'
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            className='absolute inset-0'
          />

          {/* Status Badges */}
          <View className='absolute top-3 left-3 flex-row'>
            {item.is_verified && (
              <View className='bg-blue-500 rounded-full px-3 py-1 mr-2 flex-row items-center'>
                <Ionicons name="checkmark-circle" size={14} color="white" />
                <Text className='text-white text-xs font-bold ml-1'>Verified</Text>
              </View>
            )}
            {item.is_active ? (
              <View className='bg-green-500 rounded-full px-3 py-1'>
                <Text className='text-white text-xs font-bold'>Open</Text>
              </View>
            ) : (
              <View className='bg-red-500 rounded-full px-3 py-1'>
                <Text className='text-white text-xs font-bold'>Closed</Text>
              </View>
            )}
          </View>

          {/* Logo */}
          <View className='absolute -bottom-8 left-4'>
            <View
              className='w-16 h-16 rounded-2xl bg-white border-4 border-white overflow-hidden'
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4,
              }}
            >
              <Image
                source={{ uri: item.logo }}
                className='w-full h-full'
                resizeMode='cover'
              />
            </View>
          </View>
        </View>

        {/* Content */}
        <View className='pt-10 px-4 pb-4'>
          {/* Name and Rating */}
          <View className='flex-row items-start justify-between mb-2'>
            <View className='flex-1 pr-2'>
              <Text className='text-lg font-bold text-gray-800' numberOfLines={1}>
                {item.name}
              </Text>
              <View className='flex-row items-center mt-1'>
                <Ionicons name="location-outline" size={14} color="#6b7280" />
                <Text className='text-xs text-gray-500 ml-1' numberOfLines={1}>
                  {item.address}
                </Text>
              </View>
            </View>
            <View className='bg-orange-50 rounded-full px-3 py-1 flex-row items-center'>
              <Ionicons name="star" size={14} color="#fd4a12" />
              <Text className='text-sm font-bold ml-1' style={{ color: '#fd4a12' }}>
                {parseFloat(item.rating).toFixed(1)}
              </Text>
            </View>
          </View>

          {/* Info Row */}
          <View className='flex-row items-center justify-between pt-3 border-t border-gray-100'>
            <View className='flex-row items-center'>
              <Ionicons name="time-outline" size={16} color="#6b7280" />
              <Text className='text-xs text-gray-600 ml-1'>{item.delivery_time}</Text>
            </View>
            <View className='flex-row items-center'>
              <Ionicons name="bicycle-outline" size={16} color="#6b7280" />
              <Text className='text-xs text-gray-600 ml-1'>{config.CurrencySymbol}{item.delivery_fee}</Text>
            </View>
            <View className='flex-row items-center'>
              <Ionicons name="chatbubble-outline" size={16} color="#6b7280" />
              <Text className='text-xs text-gray-600 ml-1'>{item.review_count}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
