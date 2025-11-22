import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { config } from '@/constants/config';
import useFetch from '@/hooks/useFetch';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, clearCart } from '@/store/slices/cartSlice';
import { Toast } from 'toastify-react-native';
import { Alert } from 'react-native';

export default function SaleProducts() {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const cartStore = useAppSelector((state) => state.cart.store);
    const { data, loading, error } = useFetch('/products/sale/products')

  







    const handleAddToCart = (product: any , store: any) => {
        const price = product.on_sale && product.sale_price ? product.sale_price : product.price;

        //  if cart is empty, add directly     
        if (cartItems.length === 0) {
            dispatch(addToCart({
                product: {
                    id: product.id.toString(),
                    name: product.name,
                    description: product.description,
                    price,
                    image: product.image,
                    store_id: store.id,
                },
                store: store
            }));
            Toast.show({ type: "success", text1: t("cart.addedToCart") });
            return;
        }

        // مقارنة المتاجر باستخدام cartStore
        if (cartStore && cartStore.id !== store.id) {
            Alert.alert(
                t("cart.differentStoreTitle"),
                t("cart.differentStoreMessage"),
                [
                    { text: t("cart.cancel"), style: "cancel" },
                    {
                        text: t("cart.clearAndContinue"),
                        style: "destructive",
                        onPress: () => {
                            dispatch(clearCart());
                            dispatch(addToCart({
                                product: {
                                    id: product.id.toString(),
                                    name: product.name,
                                    description: product.description,
                                    price,
                                    image: product.image,
                                    store_id: store.id,
                                },
                                store
                            }));
                            Toast.show({ type: "success", text1: t('cart.addedToCart') });
                        }
                    }
                ]
            );
            return;
        }

        // نفس المتجر → أضف طبيعي
        dispatch(addToCart({
            product: {
                id: product.id.toString(),
                name: product.name,
                description: product.description,
                price,
                image: product.image,
                store_id: store.id,
            },
            store
        }));

        Toast.show({ type: "success", text1: t("cart.addedToCart") });
    };

    return (
        <>
            {data && !loading && data.length > 0 ? (
                <View className='px-5 mb-6 py-3'>
                    <View className={`flex-row justify-between items-center mb-4 ${i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <Text className='text-xl font-bold text-black arabic-font'>
                            {t('home.hotDeals')}
                        </Text>
                        <TouchableOpacity onPress={() => router.push('/offers')}>
                            <Text className='text-primary font-semibold'>
                                {t('home.viewAll')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='py-3'>


                        {loading ? (
                            <View className='flex-row items-center justify-center py-8 px-4'>
                                <ActivityIndicator size="large" color="#fd4a12" />
                                <Text className='text-gray-400 ml-3 text-center'>{t('home.loading')}</Text>
                            </View>
                        ) : (
                            <>
                                {data && data.length > 0 ? (
                                    <>
                                        {data.map((product: any, index: number) => {
                                            const discount = product.sale_price && product.price
                                                ? Math.round(((parseFloat(product.price) - parseFloat(product.sale_price)) / parseFloat(product.price)) * 100)
                                                : 0;
                                            const hasDiscount = parseFloat(product.sale_price) < parseFloat(product.price);

                                            return (
                                                <TouchableOpacity
                                                    key={product.id}
                                                    activeOpacity={0.8}
                                                    className='mr-4'
                                                    style={{ width: 220 }}
                                                    onPress={() =>
                                                        router.push({
                                                            pathname: '/stores/products',

                                                            params: { storeItem: JSON.stringify(product.store) }
                                                        })


                                                    }
                                                >
                                                    <View
                                                        className='bg-white rounded-3xl overflow-hidden'
                                                        style={{
                                                            shadowColor: '#000',
                                                            shadowOffset: { width: 0, height: 4 },
                                                            shadowOpacity: 0.1,
                                                            shadowRadius: 12,
                                                            elevation: 1,
                                                        }}
                                                    >
                                                        {/* Image Section */}
                                                        <View className='relative'>
                                                            <Image
                                                                source={{ uri: product.image }}
                                                                style={{ width: '100%', height: 140 }}
                                                                resizeMode='cover'
                                                            />
                                                            {hasDiscount && (
                                                                <View className='absolute top-3 right-3 rounded-full px-3 py-1' style={{ backgroundColor: '#fd4a12' }}>
                                                                    <Text className='text-xs font-bold text-white'>
                                                                        {discount}% OFF
                                                                    </Text>
                                                                </View>
                                                            )}
                                                            {product.category && (
                                                                <View className='absolute bottom-3 left-3 bg-primary rounded-full px-3 py-1'>
                                                                    <Text className='text-xs text-white arabic-font'>
                                                                        {product.category.name}
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
                                                                {product.name}
                                                            </Text>

                                                            <View className='flex flex-row'>
                                                                <Text className='line-through '>{product.price} {config.CurrencySymbol}</Text>
                                                                <Text className='mx-2 text-xl text-primary font-bold'>{product.sale_price} {config.CurrencySymbol}</Text>
                                                            </View>



                                                            {product.store && (
                                                                <View className='flex-row items-center mb-2'>
                                                                    {/* <Ionicons name="restaurant-outline" size={12} color="#9CA3AF" /> */}
                                                                    <FontAwesome5 name="store" size={12} color="black" />
                                                                    <Text
                                                                        className='text-xs text-black ml-3 arabic-font'
                                                                        numberOfLines={1}
                                                                    >
                                                                        {product.store.name}
                                                                    </Text>
                                                                </View>
                                                            )}

                                                            {/* Price Section */}
                                                            <View className='flex-row items-center justify-between mt-2'>

                                                                <TouchableOpacity
                                                                    className='rounded-full p-2'
                                                                    style={{ backgroundColor: '#fd4a12' }}
                                                                    onPress={() => handleAddToCart(product , product.store)}
                                                                >
                                                                    <Ionicons name="add" size={16} color="white" />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <View className='flex-1 items-center justify-center py-8 px-4'>
                                        <Ionicons name="fast-food-outline" size={48} color="#D1D5DB" />
                                        <Text className='text-gray-400 mt-3 text-center arabic-font'>
                                            {t('home.noOffers') || 'No special offers available'}
                                        </Text>
                                    </View>
                                )}
                            </>
                        )}
                    </ScrollView>
                </View>
            ) : (<></>)}
        </>
    )
}
