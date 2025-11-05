import { AuthContext } from '@/context/auth_context'
import React, { useContext, useState, useMemo } from 'react'
import { View, Text, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import useFetch from '@/hooks/useFetch';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomHeader from '@/components/custom/customheader';
import NoOrdersFound from '@/components/NoOrdersFound';
import CustomLoading from '@/components/custom/customloading';
import ErrorMessage from '@/components/ErrorMessage';
import OrderUserItem from '@/items/OrderUserItem';
import BottomNavigation from '@/components/BottomNavigation';

type OrderStatus = 'all' | 'pending' | 'accepted' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';

interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    price: string;
}

interface Restaurant {
    id: number;
    name: string;
    address: string;
    phone: string;
}

interface Order {
    id: number;
    user_id: number;
    restaurant_id: number;
    order: string;
    status: string;
    total_price: string;
    delivery_address: string;
    placed_at: string;
    delivered_at: string | null;
    phone: string | null;
    createdAt: string;
    updatedAt: string;
    restaurant: Restaurant;
}

interface OrdersResponse {
    success: boolean;
    message: string;
    data: {
        orders: Order[];
        pagination: {
            current_page: number;
            total_pages: number;
            total_orders: number;
            per_page: number;
        };
    };
}

const statusConfig = {
    pending: { color: 'bg-amber-100', textColor: 'text-amber-700', icon: 'time-outline' as const, borderColor: 'border-amber-200' },
    accepted: { color: 'bg-blue-100', textColor: 'text-blue-700', icon: 'checkmark-circle-outline' as const, borderColor: 'border-blue-200' },
    preparing: { color: 'bg-purple-100', textColor: 'text-purple-700', icon: 'restaurant-outline' as const, borderColor: 'border-purple-200' },
    on_the_way: { color: 'bg-indigo-100', textColor: 'text-indigo-700', icon: 'bicycle-outline' as const, borderColor: 'border-indigo-200' },
    delivered: { color: 'bg-green-100', textColor: 'text-green-700', icon: 'checkmark-done-outline' as const, borderColor: 'border-green-200' },
    cancelled: { color: 'bg-red-100', textColor: 'text-red-700', icon: 'close-circle-outline' as const, borderColor: 'border-red-200' },
};

export default function Orders() {
    const { auth } = useContext(AuthContext);
    const { data, loading, error } = useFetch(`/orders/user/${auth?.user?.id}`);
    const { t } = useTranslation();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<OrderStatus>('all');

    const tabs: { key: OrderStatus; label: string; count?: number }[] = [
        { key: 'all', label: t('orders.all') },
        { key: 'pending', label: t('orders.pending') },
        { key: 'accepted', label: t('orders.accepted') },
        { key: 'preparing', label: t('orders.preparing') },
        { key: 'on_the_way', label: t('orders.onTheWay') },
        { key: 'delivered', label: t('orders.delivered') },
        { key: 'cancelled', label: t('orders.cancelled') },
    ];

    // Access orders directly from the API response (not nested under data.data)
    const orders = data?.orders || [];
    const pagination = data?.pagination;

    const filteredOrders = useMemo(() => {
        if (!orders || orders.length === 0) return [];
        if (activeTab === 'all') return orders;
        return orders.filter((order: Order) => order.status === activeTab);
    }, [orders, activeTab]);

    const getStatusCounts = (status: OrderStatus) => {
        if (!orders || orders.length === 0) return 0;
        if (status === 'all') return orders.length;
        return orders.filter((order: Order) => order.status === status).length;
    };

    // const formatDate = (dateString: string) => {
    //     const date = new Date(dateString);
    //     return date.toLocaleDateString('en-US', {
    //         month: 'short',
    //         day: 'numeric',
    //         year: 'numeric',
    //         hour: '2-digit',
    //         minute: '2-digit'
    //     });
    // };

    // const parseOrderItems = (orderString: string): OrderItem[] => {
    //     try {
    //         return JSON.parse(orderString);
    //     } catch {
    //         return [];
    //     }
    // };

    // const renderOrderCard = ({ item }: { item: Order }) => {
    //     const orderItems = parseOrderItems(item.order);
    //     const statusStyle = statusConfig[item.status as keyof typeof statusConfig] || statusConfig.pending;

    //     return (
    //         <View className="bg-white mx-4 mb-4 rounded-2xl border border-gray-100" style={{
    //             shadowColor: '#000',
    //             shadowOffset: { width: 0, height: 2 },
    //             shadowOpacity: 0.05,
    //             shadowRadius: 8,
    //             elevation: 3
    //         }}>
    //             {/* Header */}
    //             <View className="p-4 border-b border-gray-100">
    //                 <View className="flex-row justify-between items-start mb-3">
    //                     <View className="flex-1">
    //                         <Text className="text-gray-500 text-xs mb-1">{t('orders.orderId')}</Text>
    //                         <Text className="text-gray-900 font-bold text-lg">#{item.id}</Text>
    //                     </View>
    //                     <View className={`${statusStyle.color} ${statusStyle.borderColor} border px-3 py-2 rounded-full flex-row items-center`}>
    //                         <Ionicons name={statusStyle.icon} size={16} color={statusStyle.textColor.replace('text-', '#')} />
    //                         <Text className={`${statusStyle.textColor} font-semibold text-xs ml-1`}>
    //                             {t(`orders.${item.status === 'on_the_way' ? 'onTheWay' : item.status}`)}
    //                         </Text>
    //                     </View>
    //                 </View>

    //                 <View className="flex-row items-center mb-2">
    //                     <Ionicons name="storefront-outline" size={16} color="#6b7280" />
    //                     <Text className="text-gray-700 font-medium ml-2">{item.restaurant.name}</Text>
    //                 </View>

    //                 <View className="flex-row items-center">
    //                     <Ionicons name="calendar-outline" size={14} color="#9ca3af" />
    //                     <Text className="text-gray-500 text-xs ml-2">{formatDate(item.placed_at)}</Text>
    //                 </View>
    //             </View>

    //             {/* Order Items */}
    //             <View className="p-4 border-b border-gray-100">
    //                 <Text className="text-gray-700 font-semibold mb-3">{t('orders.items')} ({orderItems.length})</Text>
    //                 {orderItems.slice(0, 3).map((orderItem, index) => (
    //                     <View key={index} className="flex-row justify-between items-center mb-2">
    //                         <View className="flex-row items-center flex-1">
    //                             <View className="bg-gray-100 w-8 h-8 rounded-lg justify-center items-center mr-3">
    //                                 <Text className="text-gray-600 font-bold text-xs">{orderItem.quantity}x</Text>
    //                             </View>
    //                             <Text className="text-gray-700 flex-1" numberOfLines={1}>{orderItem.name}</Text>
    //                         </View>
    //                         <Text className="text-gray-900 font-semibold ml-2">${orderItem.price}</Text>
    //                     </View>
    //                 ))}
    //                 {orderItems.length > 3 && (
    //                     <Text className="text-blue-600 text-xs mt-2">+{orderItems.length - 3} more items</Text>
    //                 )}
    //             </View>

    //             {/* Footer */}
    //             <View className="p-4">
    //                 <View className="flex-row justify-between items-center mb-4">
    //                     <Text className="text-gray-600 font-medium">{t('orders.totalAmount')}</Text>
    //                     <Text className="text-gray-900 font-bold text-xl">${item.total_price}</Text>
    //                 </View>

    //                 <View className="flex-row items-center mb-3">
    //                     <Ionicons name="location-outline" size={16} color="#6b7280" />
    //                     <Text className="text-gray-600 text-sm ml-2 flex-1" numberOfLines={1}>
    //                         {item.delivery_address}
    //                     </Text>
    //                 </View>

    //                 {/* Action Buttons */}
    //                 <View className="flex-row space-x-2">
    //                     {(item.status === 'preparing' || item.status === 'on_the_way') && (
    //                         <TouchableOpacity className="flex-1 bg-blue-600 py-3 rounded-xl mr-2">
    //                             <Text className="text-white font-bold text-center">{t('orders.trackOrder')}</Text>
    //                         </TouchableOpacity>
    //                     )}
    //                     {item.status === 'delivered' && (
    //                         <TouchableOpacity className="flex-1 bg-gray-800 py-3 rounded-xl">
    //                             <Text className="text-white font-bold text-center">{t('orders.orderAgain')}</Text>
    //                         </TouchableOpacity>
    //                     )}
    //                     {item.status === 'pending' && (
    //                         <TouchableOpacity className="flex-1 bg-red-50 border border-red-200 py-3 rounded-xl">
    //                             <Text className="text-red-600 font-bold text-center">{t('orders.cancelOrder')}</Text>
    //                         </TouchableOpacity>
    //                     )}
    //                 </View>
    //             </View>
    //         </View>
    //     );
    // };



    if (error) {
        return (
            <ErrorMessage />
        );
    }

    return (
        <View className="flex-1 bg-gray-50">
            <CustomHeader title={t('orders.myOrders')} />




            {loading ? (<CustomLoading message={t('orders.ordersfetching')} />) : (<>


                {/* Header */}
                <View className="bg-white pt-12 pb-4 px-4 border-b border-gray-100">


                    {/* Tabs */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="flex-row -mx-4 px-4"
                    >
                        {tabs.map((tab) => {
                            const count = getStatusCounts(tab.key);
                            const isActive = activeTab === tab.key;

                            return (
                                <TouchableOpacity
                                    key={tab.key}
                                    onPress={() => setActiveTab(tab.key)}
                                    className={`mr-2 px-4 py-2 rounded-full border ${isActive
                                        ? 'bg-primary border-primary'
                                        : 'bg-white border-gray-200'
                                        }`}
                                >
                                    <View className="flex-row items-center">
                                        <Text className={`font-semibold arabic-font ${isActive ? 'text-white' : 'text-gray-700'
                                            }`}>
                                            {tab.label}
                                        </Text>
                                        {count > 0 && (
                                            <View className={`ml-2 px-2 py-0.5 rounded-full ${isActive ? 'bg-secondary' : 'bg-gray-100'
                                                }`}>
                                                <Text className={`text-xs font-bold ${isActive ? 'text-white' : 'text-gray-600'
                                                    }`}>
                                                    {count}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                    <NoOrdersFound />
                ) : (
                    <FlatList
                        data={filteredOrders}
                        // renderItem={renderOrderCard}
                        // renderItem={OrderUserItem}
                        renderItem={({ item }) => <OrderUserItem item={item} />}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                    />
                )}



            </>)}


<BottomNavigation />

        </View>
    );
}
