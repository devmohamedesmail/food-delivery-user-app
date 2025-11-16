import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';
import { Toast } from 'toastify-react-native';
import { config } from '@/constants/config';
import useFetch from '@/hooks/useFetch';
import Loading from '@/components/common/Loading';
import ErrorMessage from '@/components/common/ErrorMessage';
import ProductItem from '@/components/stores/ProductItem';
import NoProducts from '@/components/stores/NoProducts';

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
    // const { storeId } = useLocalSearchParams();
    const { storeItem } = useLocalSearchParams();
    const parsedStoreItem = JSON.parse(storeItem as string);
    const { data: products,
        loading: productsLoading,
        error: productsError } = useFetch(`/stores/${parsedStoreItem.id}/products`);
    const {
        data: categories,
        loading: categoriesLoading,
        error: categoriesError } = useFetch(`/stores/${parsedStoreItem.id}/categories`);
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






    return (
        <SafeAreaView
            edges={['bottom']}
            className="flex-1 bg-gray-50">
            <StatusBar hidden={true} />
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
                       {i18n.language === 'ar' ? 'المنتجات' : 'Products'} - {parsedStoreItem.name}
                        
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
                <View className='bg-white rounded-full flex-row items-center px-4 py-1'>
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
                            className={`mr-2 px-4 py-2 rounded-full ${selectedCategory === null ? 'bg-primary' : 'bg-gray-200'
                                }`}
                        >
                            <Text className={`font-semibold ${selectedCategory === null ? 'text-white' : 'text-gray-700'
                                }`}>
                                {t('stores.all')}
                            </Text>
                        </TouchableOpacity>
                        {categories.map((cat: any) => (
                            <TouchableOpacity
                                key={cat.id}
                                onPress={() => setSelectedCategory(cat.id)}
                                className={`mr-2 px-4 py-2 rounded-full ${selectedCategory === cat.id ? 'bg-primary' : 'bg-gray-200'
                                    }`}
                            >
                                <Text className={`font-semibold ${selectedCategory === cat.id ? 'text-white' : 'text-gray-700'
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
                    <Loading type='processing'
                        message={t('stores.loading')} />
                </View>

            ) : productsError ? (
                <ErrorMessage />
            ) : filteredProducts.length === 0 ? (
                <NoProducts searchQuery={searchQuery} />
            ) : (
                <FlatList
                    data={filteredProducts}
                    renderItem={({ item }) => <ProductItem item={item} />}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}

export default Products;
