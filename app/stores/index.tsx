import BottomNavigation from '@/components/common/BottomNavigation'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import React, { useState, useMemo } from 'react'
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator, FlatList, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'expo-router'
import useFetch from '@/hooks/useFetch'
import StoreItem from '@/components/stores/StoreItem'
import Loading from '@/components/common/Loading'
import ErrorMessage from '@/components/common/ErrorMessage'



const Stores = () => {
  const { storeTypeId } = useLocalSearchParams();
  const { data, loading, error } = useFetch(`/store-types/${storeTypeId}/stores`);
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter businesses based on search query
  const filteredBusinesses = useMemo(() => {
    if (!data) return [];
    if (!searchQuery.trim()) return data;

    return data.filter((business: any) =>
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);



  return (
    <SafeAreaView
      edges={['bottom']}
      className="flex-1 bg-gray-50">
      <StatusBar

        translucent={true}
        hidden={true}

      />


      <View className='flex-1'>
        {/* Header */}
        <LinearGradient
          colors={['#fd4a12', '#FF6A3D']}
          className='px-5 pt-14 pb-6'
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
          <View className='bg-white rounded-full flex-row items-center px-4 py-1'>
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              placeholder={i18n.language === 'ar' ? 'ابحث عن متجر...' : 'Search for a store...'}
              value={searchQuery}
              onChangeText={setSearchQuery}
              className='flex-1 ml-2 text-base text-gray-800'
              cursorColor="#fd4a12"
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
            <Loading type='processing' 
            message={t('stores.loading')} />

          </View>
        ) : error ? (
          <ErrorMessage />
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
            renderItem={({ item }) => StoreItem({ item })}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <BottomNavigation />
    </SafeAreaView>
  )
}

export default Stores
