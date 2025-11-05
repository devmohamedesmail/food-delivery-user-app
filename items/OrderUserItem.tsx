import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { config } from '@/constants/config';




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

const statusConfig = {
    pending: { color: 'bg-amber-100', textColor: 'text-amber-700', icon: 'time-outline' as const, borderColor: 'border-amber-200' },
    accepted: { color: 'bg-blue-100', textColor: 'text-blue-700', icon: 'checkmark-circle-outline' as const, borderColor: 'border-blue-200' },
    preparing: { color: 'bg-purple-100', textColor: 'text-purple-700', icon: 'restaurant-outline' as const, borderColor: 'border-purple-200' },
    on_the_way: { color: 'bg-indigo-100', textColor: 'text-indigo-700', icon: 'bicycle-outline' as const, borderColor: 'border-indigo-200' },
    delivered: { color: 'bg-green-100', textColor: 'text-green-700', icon: 'checkmark-done-outline' as const, borderColor: 'border-green-200' },
    cancelled: { color: 'bg-red-100', textColor: 'text-red-700', icon: 'close-circle-outline' as const, borderColor: 'border-red-200' },
};



export default function OrderUserItem({ item }: { item: any }) {
    
       const { t,i18n } = useTranslation();
    const parseOrderItems = (orderString: string): OrderItem[] => {
        try {
            return JSON.parse(orderString);
        } catch {
            return [];
        }
    };

    const orderItems = parseOrderItems(item.order);
    const statusStyle = statusConfig[item.status as keyof typeof statusConfig] || statusConfig.pending;
 

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };


    return (
        <View className="bg-white mx-4 mb-4 rounded-2xl border border-gray-100" style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 1
        }}>
            {/* Header */}
            <View className="p-4 border-b border-gray-100">
                <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-1">
                        <Text className="text-gray-500 text-xs mb-1">{t('orders.orderId')}</Text>
                        <Text className="text-gray-900 font-bold text-lg">#{item.id}</Text>
                    </View>
                    <View className={`${statusStyle.color} ${statusStyle.borderColor} border px-3 py-2 rounded-full flex-row items-center`}>
                        <Ionicons name={statusStyle.icon} size={16} color={statusStyle.textColor.replace('text-', '#')} />
                        <Text className={`${statusStyle.textColor} font-semibold text-xs ml-1`}>
                            {t(`orders.${item.status === 'on_the_way' ? 'onTheWay' : item.status}`)}
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center mb-2">
                    <Ionicons name="storefront-outline" size={16} color="#6b7280" />
                    <Text className="text-gray-700 font-medium ml-2">{item.restaurant.name}</Text>
                </View>

                <View className="flex-row items-center">
                    <Ionicons name="calendar-outline" size={14} color="#9ca3af" />
                    <Text className="text-gray-500 text-xs ml-2">{formatDate(item.placed_at)}</Text>
                </View>
            </View>

            {/* Order Items */}
            <View className="p-4 border-b border-gray-100">
                <Text className="text-gray-700 font-semibold mb-3">{t('orders.items')} ({orderItems.length})</Text>
                {orderItems.slice(0, 3).map((orderItem, index) => (
                    <View key={index} className="flex-row justify-between items-center mb-2">
                        <View className="flex-row items-center flex-1">
                            <View className="bg-gray-100 w-8 h-8 rounded-lg justify-center items-center mr-3">
                                <Text className="text-gray-600 font-bold text-xs">{orderItem.quantity}x</Text>
                            </View>
                            <Text className="text-gray-700 flex-1" numberOfLines={1}>{orderItem.name}</Text>
                        </View>
                        <Text className="text-gray-900 font-semibold ml-2"> {config.CurrencySymbol} {orderItem.price}</Text>
                    </View>
                ))}
                {orderItems.length > 3 && (
                    <Text className="text-blue-600 text-xs mt-2">+{orderItems.length - 3} more items</Text>
                )}
            </View>

            {/* Footer */}
            <View className="p-4">
                <View className={`flex-row justify-between items-center mb-4  ${i18n.language === 'ar' ? 'flex-row-reverse':''} `}>
                    <Text className="text-gray-600 font-medium arabic-font">{t('orders.totalAmount')}</Text>
                    <Text className="text-gray-900  text-xl arabic-font"> {config.CurrencySymbol} {item.total_price} </Text>
                </View>

                <View className="flex-row items-center mb-3">
                    <Ionicons name="location-outline" size={16} color="#6b7280" />
                    <Text className="text-gray-600 text-sm ml-2 flex-1" numberOfLines={1}>
                        {item.delivery_address}
                    </Text>
                </View>

                {/* Action Buttons */}
                <View className="flex-row space-x-2">
                    {(item.status === 'preparing' || item.status === 'on_the_way') && (
                        <TouchableOpacity className="flex-1 bg-primary py-3 rounded-xl mr-2">
                            <Text className="text-white font-bold text-center">{t('orders.trackOrder')}</Text>
                        </TouchableOpacity>
                    )}
                    {item.status === 'delivered' && (
                        <TouchableOpacity className="flex-1 bg-green-500 py-3 rounded-xl">
                            <Text className="text-white font-bold text-center">{t('orders.orderAgain')}</Text>
                        </TouchableOpacity>
                    )}
                    {item.status === 'pending' && (
                        <TouchableOpacity className="flex-1 bg-red-50 border border-red-200 py-3 rounded-xl">
                            <Text className="text-red-600 font-bold text-center">{t('orders.cancelOrder')}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    )
}
