import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { config } from '@/constants/config';
import { useAppDispatch, useAppSelector, selectCartItemQuantity, selectIsInWishlist } from '../store/hooks';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import { Toast } from 'toastify-react-native';

interface MenuItemProps {
    item: {
        id: string;
        title: string;
        description: string;
        price: number;
        image: string;
        

    };
    restaurantId: string;
    restaurantName?: string;
}

export default function MenuItem({ item, restaurantId , restaurantName }: MenuItemProps) {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const quantity = useAppSelector(state => selectCartItemQuantity(state, item.id));
    const isInWishlist = useAppSelector(state => selectIsInWishlist(state, item.id));

    const handleAddToCart = () => {
        try {
            dispatch(addToCart({
                restaurantId: restaurantId,
                restaurantName: restaurantName,
                id: item.id,
                name: item.title,
                description: item.description,
                price: item.price,
                image: item.image,
            }));
            Toast.show({
                type: 'success',
                text1: t('restaurants.added_to_cart'),
                position: 'top',
                visibilityTime: 2000,
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: t('restaurants.add_to_cart_failed'),
                position: 'top',
                visibilityTime: 2000,
            });
        }
    };

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(item.id));
        if (quantity === 1) {
            Toast.show({
                type: 'info',
                text1: t('restaurants.removed_from_cart'),
                position: 'top',
                visibilityTime: 2000,
            });
        }
    };

    const handleToggleWishlist = () => {
        dispatch(toggleWishlist({
            id: item.id,
            name: item.title,
            description: item.description,
            price: item.price,
            image: item.image,
        }));
    };

    return (
        <View className="bg-white rounded-2xl mb-4 shadow-sm overflow-hidden mx-4">
            <View className="flex-row p-4">
                {/* Image */}
                <View className="w-24 h-24 rounded-xl bg-gray-200 overflow-hidden mr-4">
                    <Image 
                        source={{ uri: item.image }} 
                        style={{ width: '100%', height: '100%', resizeMode: 'cover' }} 
                    />
                </View>

                {/* Content */}
                <View className="flex-1">
                    {/* Item Details */}
                    <View className="flex-1">
                        <Text className="text-lg font-bold text-gray-900 mb-1 arabic-font" numberOfLines={1}>
                            {item.title}
                        </Text>
                        <Text className="text-gray-600 text-sm mb-2 arabic-font" numberOfLines={2}>
                            {item.description}
                        </Text>
                        <View className="flex-row items-center mb-3">
                            <Text className="text-lg font-bold text-red-600 arabic-font">
                                {item.price}
                            </Text>
                            <Text className="text-sm text-orange-600 arabic-font ml-1">
                                {config.CurrencySymbol}
                            </Text>
                        </View>
                    </View>

                    {/* Quantity Controls and Actions */}
                    <View className="flex-row items-center justify-between">
                        {/* Quantity Controls */}
                        {quantity > 0 ? (
                            <View className="flex-row items-center bg-gray-100 rounded-xl">
                                <TouchableOpacity
                                    onPress={handleRemoveFromCart}
                                    className="p-2"
                                >
                                    <Ionicons name="remove" size={16} color="#374151" />
                                </TouchableOpacity>
                                <Text className="px-3 py-1 font-bold text-gray-900">{quantity}</Text>
                                <TouchableOpacity
                                    onPress={handleAddToCart}
                                    className="p-2"
                                >
                                    <Ionicons name="add" size={16} color="#374151" />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity 
                                onPress={handleAddToCart}
                                className="bg-gray-900 px-3 py-2 rounded-xl flex-row items-center"
                            >
                                <MaterialCommunityIcons name="cart-arrow-down" size={18} color="white" />
                                <Text className="text-white font-semibold ml-1 text-sm">{t('restaurants.add_to_cart')}</Text>
                            </TouchableOpacity>
                        )}

                        {/* Wishlist Button */}
                        <TouchableOpacity 
                            onPress={handleToggleWishlist}
                            className="p-2"
                        >
                            <MaterialCommunityIcons 
                                name={isInWishlist ? "heart" : "heart-outline"} 
                                size={24} 
                                color={isInWishlist ? "#EF4444" : "#9CA3AF"} 
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
