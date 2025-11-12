import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';
import { Toast } from 'toastify-react-native';
import { config } from '@/constants/config';
import useFetch from '@/hooks/useFetch';

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

const Products = () => {
    const { businessId } = useLocalSearchParams();
    const { data: products, loading: productsLoading, error: productsError } = useFetch(`/products/business/${businessId}`);
    const { data: categories, loading: categoriesLoading, error: categoriesError } = useFetch(`/categories/business/${businessId}`);
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    // Filter products
    const filteredProducts = useMemo(() => {
        if (!products) return [];
        
        let filtered = products;

        if (searchQuery.trim()) {
            filtered = filtered.filter((product: Product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory !== null) {
            filtered = filtered.filter((product: Product) => product.category_id === selectedCategory);
        }

        return filtered;
    }, [products, searchQuery, selectedCategory]);

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
        Toast.success(t('cart.addedToCart') || 'Added to cart!');
    };

    const handleRemoveFromCart = (productId: number) => {
        dispatch(removeFromCart(productId.toString()));
    };

    const renderProductCard = ({ item }: { item: Product }) => {
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
                    elevation: 3,
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
                        {item.stock < 10 && (
                            <View className='absolute bottom-2 left-2 bg-orange-500 rounded-full px-2 py-1'>
                                <Text className='text-white text-xs font-bold'>
                                    {item.stock} left
                                </Text>
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
                                disabled={item.stock === 0}
                                className={`rounded-full py-2 px-4 flex-row items-center justify-center ${
                                    item.stock === 0 ? 'bg-gray-300' : 'bg-orange-500'
                                }`}
                            >
                                <Ionicons 
                                    name="add-circle-outline" 
                                    size={16} 
                                    color="white" 
                                />
                                <Text className='text-white text-sm font-bold ml-1'>
                                    {item.stock === 0 ? 'Out of Stock' : 'Add'}
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
        );
    };

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
                        {i18n.language === 'ar' ? 'المنتجات' : 'Products'}
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.push('/cart/cart')}
                        className='w-10 h-10 rounded-full bg-white/20 items-center justify-center'
                    >
                        <Ionicons name="cart-outline" size={22} color="white" />
                        {cartItems.length > 0 && (
                            <View className='absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center'>
                                <Text className='text-white text-xs font-bold'>{cartItems.length}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View className='bg-white rounded-full flex-row items-center px-4 py-3'>
                    <Ionicons name="search" size={20} color="#9ca3af" />
                    <TextInput
                        placeholder={i18n.language === 'ar' ? 'ابحث عن منتج...' : 'Search products...'}
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

            {/* Category Filter */}
            {categories && categories.length > 0 && (
                <View className='px-5 py-3'>
                    <View className='flex-row items-center'>
                        <TouchableOpacity
                            onPress={() => setSelectedCategory(null)}
                            className={`mr-2 px-4 py-2 rounded-full ${
                                selectedCategory === null ? 'bg-orange-500' : 'bg-gray-200'
                            }`}
                        >
                            <Text className={`font-semibold ${
                                selectedCategory === null ? 'text-white' : 'text-gray-700'
                            }`}>
                                All
                            </Text>
                        </TouchableOpacity>
                        {categories.map((cat: any) => (
                            <TouchableOpacity
                                key={cat.id}
                                onPress={() => setSelectedCategory(cat.id)}
                                className={`mr-2 px-4 py-2 rounded-full ${
                                    selectedCategory === cat.id ? 'bg-orange-500' : 'bg-gray-200'
                                }`}
                            >
                                <Text className={`font-semibold ${
                                    selectedCategory === cat.id ? 'text-white' : 'text-gray-700'
                                }`}>
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}

            {/* Products List */}
            {productsLoading ? (
                <View className='flex-1 items-center justify-center'>
                    <ActivityIndicator size="large" color="#fd4a12" />
                    <Text className='text-gray-500 mt-4'>Loading products...</Text>
                </View>
            ) : productsError ? (
                <View className='flex-1 items-center justify-center px-5'>
                    <Ionicons name="alert-circle-outline" size={64} color="#ef4444" />
                    <Text className='text-gray-800 text-lg font-bold mt-4'>Error Loading Products</Text>
                    <Text className='text-gray-500 text-center mt-2'>Please try again later</Text>
                </View>
            ) : filteredProducts.length === 0 ? (
                <View className='flex-1 items-center justify-center px-5'>
                    <Ionicons name="cube-outline" size={64} color="#d1d5db" />
                    <Text className='text-gray-800 text-lg font-bold mt-4'>No Products Found</Text>
                    <Text className='text-gray-500 text-center mt-2'>
                        {searchQuery ? 'Try different keywords' : 'No products available'}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={filteredProducts}
                    renderItem={renderProductCard}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}

export default Products;
