import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import useFetch from '@/hooks/useFetch'
import { config } from '@/constants/config'
import CreativeBottomNavigation from '@/components/CreativeBottomNavigation'
import { useAppDispatch, useAppSelector, selectCartItemQuantity, selectIsInWishlist } from '@/store/hooks'
import { addToCart, removeFromCart } from '@/store/slices/cartSlice'
import { toggleWishlist } from '@/store/slices/wishlistSlice'
import { Toast } from 'toastify-react-native'
import Colors from '@/constants/Colors'

// Separate component for meal card to use hooks properly
function MealCard({ meal, discount, hasDiscount, dispatch, t }: any) {
  const quantity = useAppSelector(state => selectCartItemQuantity(state, meal.id))

  const handleAddToCart = () => {
    try {
      dispatch(addToCart({
        id: meal.id,
        name: meal.title,
        description: meal.description,
        price: parseFloat(meal.sale),
        image: meal.image,
      }))
      Toast.success(t('offers.addedToCart') || 'Added to cart successfully!')
    } catch (error) {
      Toast.error(t('offers.addToCartFailed') || 'Failed to add to cart')
    }
  }

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(meal.id))
    if (quantity === 1) {
      Toast.info(t('offers.removedFromCart') || 'Removed from cart')
    }
  }

  return (
    <View 
      className="bg-white rounded-3xl overflow-hidden mx-2 mb-4"
      style={{
        width: '47%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
      }}
    >
      {/* Image Section */}
      <View className="relative">
        <Image
          source={{ uri: meal.image }}
          style={{ width: '100%', height: 140 }}
          resizeMode='cover'
        />
        
        {/* Discount Badge */}
        {hasDiscount && (
          <View className='absolute top-3 right-3 rounded-full px-3 py-1' style={{ backgroundColor: '#fd4a12' }}>
            <Text className='text-xs font-bold text-white'>
              {discount}% {t('offers.off') || 'OFF'}
            </Text>
          </View>
        )}

        {/* Category Badge */}
        {meal.category && (
          <View className='absolute bottom-3 left-3 bg-black/70 rounded-full px-3 py-1'>
            <Text className='text-xs text-white arabic-font'>
              {meal.category.name}
            </Text>
          </View>
        )}
      </View>

      {/* Content Section */}
      <View className='p-4'>
        <Text 
          className='text-base font-bold text-gray-800 mb-1 arabic-font'
          numberOfLines={1}
        >
          {meal.title}
        </Text>
        
        {meal.restaurant && (
          <View className='flex-row items-center mb-2'>
            <Ionicons name="restaurant-outline" size={12} color="#9CA3AF" />
            <Text 
              className='text-xs text-gray-500 ml-1 arabic-font'
              numberOfLines={1}
            >
              {meal.restaurant.name}
            </Text>
          </View>
        )}

        {/* Price Section */}
        <View className='mt-2'>
          <View className='flex-row items-center mb-3'>
            <Text className='text-lg font-bold mr-2' style={{ color: '#fd4a12' }}>
              {config.CurrencySymbol}{parseFloat(meal.sale).toFixed(2)}
            </Text>
            {hasDiscount && (
              <Text className='text-sm text-gray-400 line-through'>
                {config.CurrencySymbol}{parseFloat(meal.price).toFixed(2)}
              </Text>
            )}
          </View>
          
          {/* Add to Cart / Quantity Controls */}
          {quantity > 0 ? (
            <View 
              className="flex-row items-center justify-between rounded-full px-3 py-2"
              style={{
                backgroundColor: '#fd4a12',
              }}
            >
              <TouchableOpacity
                onPress={handleRemoveFromCart}
                className="p-1"
              >
                <Ionicons name="remove" size={16} color="#fff" />
              </TouchableOpacity>
              
              <Text className="px-2 font-bold text-white text-sm">{quantity}</Text>
              
              <TouchableOpacity
                onPress={handleAddToCart}
                className="p-1"
              >
                <Ionicons name="add" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              className='rounded-full py-2 px-4 flex-row items-center justify-center'
              style={{ backgroundColor: '#fd4a12' }}
              onPress={handleAddToCart}
            >
              <Ionicons name="add" size={16} color="white" />
              <Text className="text-white arabic-font ml-1 text-sm font-bold">
                {t('offers.add') || 'Add'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}

export default function Offers() {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [allData, setAllData] = useState<any[]>([])
  const { data, loading, error } = useFetch(`/menu/sale/meals?page=${currentPage}`)

  // Add new data when it loads
  React.useEffect(() => {
    if (data && data.length > 0) {
      if (currentPage === 1) {
        setAllData(data)
      } else {
        // Filter out duplicates by checking IDs
        setAllData(prev => {
          const existingIds = new Set(prev.map(item => item.id))
          const newItems = data.filter((item: any) => !existingIds.has(item.id))
          return [...prev, ...newItems]
        })
      }
      setLoadingMore(false)
    }
  }, [data, currentPage])

  const renderMealCard = ({ item: meal }: { item: any }) => {
    const discount = meal.sale && meal.price 
      ? Math.round(((parseFloat(meal.price) - parseFloat(meal.sale)) / parseFloat(meal.price)) * 100)
      : 0
    const hasDiscount = parseFloat(meal.sale) < parseFloat(meal.price)

    return (
      <MealCard 
        meal={meal} 
        discount={discount} 
        hasDiscount={hasDiscount}
        dispatch={dispatch}
        t={t}
      />
    )
  }

  const handleLoadMore = () => {
    if (!loadingMore && !loading) {
      setLoadingMore(true)
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Professional Header */}
      <View className="bg-white px-5 py-4 border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="bg-primary/10 p-3 rounded-full mr-3">
              <Ionicons name="pricetag" size={24} color="#fd4a12" />
            </View>
            <View>
              <Text className="text-2xl font-bold text-black arabic-font">
                {t('offers.title') || 'Special Offers'}
              </Text>
              {allData.length > 0 && (
                <Text className="text-sm text-gray-500 arabic-font">
                  {allData.length} {t('offers.availableDeals') || 'amazing deals'}
                </Text>
              )}
            </View>
          </View>
          <TouchableOpacity 
            onPress={() => router.back()}
            className="bg-gray-100 p-2 rounded-full"
          >
            <Ionicons name="close" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      {loading ? (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size="large" color="#fd4a12" />
          <Text className='text-gray-400 mt-4 arabic-font'>
            {t('offers.loading') || 'Loading amazing deals...'}
          </Text>
        </View>
      ) : error ? (
        <View className='flex-1 items-center justify-center px-8'>
          <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
          <Text className='text-xl font-bold text-gray-900 mt-4 text-center arabic-font'>
            {t('offers.error') || 'Oops! Something went wrong'}
          </Text>
          <Text className='text-gray-500 mt-2 text-center arabic-font'>
            {t('offers.errorMessage') || 'Failed to load offers. Please try again.'}
          </Text>
          <TouchableOpacity
            className='mt-6 px-6 py-3 rounded-2xl'
            style={{ backgroundColor: '#fd4a12' }}
            onPress={() => {
              setCurrentPage(1)
              setAllData([])
            }}
          >
            <Text className='text-white font-bold arabic-font'>
              {t('offers.retry') || 'Retry'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : allData && allData.length > 0 ? (
        <FlatList
          data={allData}
          renderItem={renderMealCard}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          numColumns={2}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 100, paddingHorizontal: 8 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            <>
              {/* Load More Button */}
              {allData.length >= 10 && data && data.length >= 10 && (
                <TouchableOpacity
                  onPress={handleLoadMore}
                  disabled={loadingMore}
                  className='mx-4 mb-6 rounded-2xl py-4 border-2 border-dashed'
                  style={{ borderColor: '#fd4a12' }}
                >
                  {loadingMore ? (
                    <View className='flex-row items-center justify-center'>
                      <ActivityIndicator size="small" color="#fd4a12" />
                      <Text className='ml-2 font-bold arabic-font' style={{ color: '#fd4a12' }}>
                        {t('offers.loadingMore') || 'Loading more...'}
                      </Text>
                    </View>
                  ) : (
                    <View className='flex-row items-center justify-center'>
                      <Ionicons name="add-circle-outline" size={24} color="#fd4a12" />
                      <Text className='ml-2 font-bold arabic-font' style={{ color: '#fd4a12' }}>
                        {t('offers.loadMore') || 'Load More Offers'}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              )}
            </>
          )}
        />
      ) : (
        <View className='flex-1 items-center justify-center px-8'>
          <Ionicons name="pricetags-outline" size={64} color="#D1D5DB" />
          <Text className='text-xl font-bold text-gray-900 mt-4 text-center arabic-font'>
            {t('offers.noOffers') || 'No Offers Available'}
          </Text>
          <Text className='text-gray-500 mt-2 text-center arabic-font'>
            {t('offers.noOffersMessage') || 'Check back later for amazing deals!'}
          </Text>
        </View>
      )}

      <CreativeBottomNavigation />
    </SafeAreaView>
  )
}
