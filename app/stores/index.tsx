import BottomNavigation from '@/components/common/BottomNavigation'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import React, { useState, useMemo } from 'react'
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'expo-router'
import useFetch from '@/hooks/useFetch'

interface Business {
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

const Stores = () => {
  const { businessTypeId } = useLocalSearchParams();
  const { data, loading, error } = useFetch(`/business-types/${businessTypeId}/businesses`);
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter businesses based on search query
  const filteredBusinesses = useMemo(() => {
    if (!data) return [];
    if (!searchQuery.trim()) return data;

    return data.filter((business: Business) =>
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const renderBusinessCard = ({ item }: { item: Business }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        // Navigate to business details
        // router.push(`/business/${item.id}`);

        router.push({
          pathname: '/stores/products',
          params: { businessId: item.id.toString() }
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
              <Text className='text-xs text-gray-600 ml-1'>${item.delivery_fee}</Text>
            </View>
            <View className='flex-row items-center'>
              <Ionicons name="chatbubble-outline" size={16} color="#6b7280" />
              <Text className='text-xs text-gray-600 ml-1'>{item.review_count}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient
        colors={['#fd4a12', '#FF6A3D']}
        className='px-5 pt-4 pb-6'
      >
        <View className='flex-row items-center justify-between mb-4'>
          <TouchableOpacity
            onPress={() => router.back()}
            className='w-10 h-10 rounded-full bg-white/20 items-center justify-center'
          >
            <Ionicons name="arrow-back" size={22} color="white" />
          </TouchableOpacity>
          <Text className='text-white text-xl font-bold flex-1 text-center'>
            {i18n.language === 'ar' ? 'المتاجر' : 'Stores'}
          </Text>
          <View className='w-10' />
        </View>

        {/* Search Bar */}
        <View className='bg-white rounded-full flex-row items-center px-4 py-3'>
          <Ionicons name="search" size={20} color="#9ca3af" />
          <TextInput
            placeholder={i18n.language === 'ar' ? 'ابحث عن متجر...' : 'Search for a store...'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            className='flex-1 ml-2 text-base text-gray-800'
            placeholderTextColor="#9ca3af"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      {/* Content */}
      {loading ? (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size="large" color="#fd4a12" />
          <Text className='text-gray-500 mt-4'>Loading stores...</Text>
        </View>
      ) : error ? (
        <View className='flex-1 items-center justify-center px-5'>
          <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
          <Text className='text-gray-800 text-lg font-bold mt-4'>Error Loading Stores</Text>
          <Text className='text-gray-500 text-center mt-2'>Please try again later</Text>
        </View>
      ) : filteredBusinesses.length === 0 ? (
        <View className='flex-1 items-center justify-center px-5'>
          <Ionicons name="storefront-outline" size={64} color="#d1d5db" />
          <Text className='text-gray-800 text-lg font-bold mt-4'>
            {searchQuery ? 'No Results Found' : 'No Stores Available'}
          </Text>
          <Text className='text-gray-500 text-center mt-2'>
            {searchQuery ? 'Try searching with different keywords' : 'Check back later for new stores'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredBusinesses}
          renderItem={renderBusinessCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <BottomNavigation />
    </SafeAreaView>
  )
}

export default Stores
