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
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
        <View 
            className="bg-white rounded-2xl overflow-hidden"
            style={{
                width: '49%',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 1,
            }}
        >
            {/* Image Container */}
            <View className="relative">
                <Image 
                    source={{ uri: item.image }} 
                    style={{ 
                        width: '100%', 
                        height: 140, 
                        resizeMode: 'cover' 
                    }} 
                />
                
                {/* Wishlist Button Overlay */}
                <TouchableOpacity 
                    onPress={handleToggleWishlist}
                    className="absolute top-2 right-2 bg-white/90 p-2 rounded-full"
                    style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                    }}
                >
                    <MaterialCommunityIcons 
                        name={isInWishlist ? "heart" : "heart-outline"} 
                        size={20} 
                        color={isInWishlist ? "#EF4444" : "#6B7280"} 
                    />
                </TouchableOpacity>
            </View>

            {/* Content Container */}
            <View className="p-3">
                {/* Item Title */}
                <Text className="text-base font-bold text-gray-900 mb-1 arabic-font" numberOfLines={1}>
                    {item.title}
                </Text>

                {/* Item Description */}
                <Text className="text-gray-600 text-xs mb-2 arabic-font" numberOfLines={2}>
                    {item.description}
                </Text>

                {/* Price */}
                <View className="flex-row items-center mb-3">
                    <Text className="text-lg font-bold text-gray-900 arabic-font">
                        {item.price}
                    </Text>
                    <Text className="text-sm text-gray-600 arabic-font ml-1">
                        {config.CurrencySymbol}
                    </Text>
                </View>

                {/* Add to Cart / Quantity Controls */}
                {quantity > 0 ? (
                    <View 
                        className="flex-row items-center justify-between bg-primary rounded-xl px-2 py-2"
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 3,
                        }}
                    >
                        <TouchableOpacity
                            onPress={handleRemoveFromCart}
                            className="p-1"
                        >
                            <Ionicons name="remove" size={18} color="#fff" />
                        </TouchableOpacity>
                        
                        <Text className="px-3 font-bold text-white">{quantity}</Text>
                        
                        <TouchableOpacity
                            onPress={handleAddToCart}
                            className="p-1"
                        >
                            <Ionicons name="add" size={18} color="#fff" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity 
                        onPress={handleAddToCart}
                        className="bg-primary py-2 px-3 rounded-xl flex-row items-center justify-center"
                    >
                        
                        <MaterialIcons name="shopping-bag" size={24} color="white" />
                        <Text className="text-white arabic-font ml-1 text-sm">{t('restaurants.add')}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}
