import React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { config } from '@/constants/config'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';
import { useTranslation } from 'react-i18next'
import { Toast } from 'toastify-react-native';



interface Product {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    on_sale: boolean;
    sale_price: number | null;
    stock: number;
    business_id: number;
    category_id: number;
}


export default function ProductItem({ item }: { item: any }) {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);


    const getCartQuantity = (productId: number) => {
        const item = cartItems.find((item) => item.id === productId.toString());
        return item ? item.quantity : 0;
    };

    const handleAddToCart = (product: Product) => {
        const price = product.on_sale && product.sale_price ? product.sale_price : product.price;
        dispatch(addToCart({
            id: product.id.toString(),
            name: product.name,
            description: product.description,
            price: price,
            image: product.image,
        }));
        
        Toast.show({
            type: 'success',
            text1: t('cart.addedToCart'),
        })
    };

    const handleRemoveFromCart = (productId: number) => {
        dispatch(removeFromCart(productId.toString()));
    };

    const quantity = getCartQuantity(item.id);
    const finalPrice = item.on_sale && item.sale_price ? item.sale_price : item.price;
    const discount = item.on_sale && item.sale_price
        ? Math.round(((item.price - item.sale_price) / item.price) * 100)
        : 0;

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            className='bg-white rounded-2xl mb-4 mx-5 overflow-hidden'
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 1,
            }}
        >
            <View className='flex-row'>
                {/* Product Image */}
                <View className='relative w-28 h-28'>
                    <Image
                        source={{ uri: item.image }}
                        className='w-full h-full'
                        resizeMode='cover'
                    />
                    {item.on_sale && discount > 0 && (
                        <View className='absolute top-2 left-2 bg-red-500 rounded-full px-2 py-1'>
                            <Text className='text-white text-xs font-bold'>-{discount}%</Text>
                        </View>
                    )}
                </View>

                {/* Product Info */}
                <View className='flex-1 p-3'>
                    <Text className='text-base font-bold text-gray-800 mb-1' numberOfLines={1}>
                        {item.name}
                    </Text>
                    <Text className='text-xs text-gray-500 mb-2' numberOfLines={2}>
                        {item.description}
                    </Text>

                    {/* Price Section */}
                    <View className='flex-row items-center mb-2'>
                        <Text className='text-lg font-bold' style={{ color: '#fd4a12' }}>
                            {config.CurrencySymbol}{finalPrice.toFixed(2)}
                        </Text>
                        {item.on_sale && item.sale_price && (
                            <Text className='text-sm text-gray-400 line-through ml-2'>
                                {config.CurrencySymbol}{item.price.toFixed(2)}
                            </Text>
                        )}
                    </View>

                    {/* Add to Cart Button */}
                    {quantity === 0 ? (
                        <TouchableOpacity
                            onPress={() => handleAddToCart(item)}
                            className='rounded-full py-2 px-4 flex-row items-center justify-center bg-primary'
                        >
                            <Ionicons
                                name="add-circle-outline"
                                size={16}
                                color="white"
                            />
                            <Text className='text-white text-sm font-bold ml-1'>
                                {t('cart.addToCart')}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <View className='flex-row items-center justify-between bg-gray-100 rounded-full py-1 px-2'>
                            <TouchableOpacity
                                onPress={() => handleRemoveFromCart(item.id)}
                                className='w-8 h-8 rounded-full items-center justify-center'
                                style={{ backgroundColor: '#fd4a12' }}
                            >
                                <Ionicons name="remove" size={18} color="white" />
                            </TouchableOpacity>
                            <Text className='text-base font-bold text-gray-800 mx-3'>
                                {quantity}
                            </Text>
                            <TouchableOpacity
                                onPress={() => handleAddToCart(item)}
                                className='w-8 h-8 rounded-full items-center justify-center'
                                style={{ backgroundColor: '#fd4a12' }}
                            >
                                <Ionicons name="add" size={18} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )
}
