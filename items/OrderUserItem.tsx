import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, Alert, Pressable, StatusBar } from 'react-native'
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { config } from '@/constants/config';
import CustomModal from '@/components/common/CustomModal';
import Button from '@/components/custom/Button';
import axios from 'axios';
import { Toast } from 'toastify-react-native';





const statusConfig = {
    pending: 
    { color: 'bg-amber-100', textColor: 'text-amber-700', borderColor: 'border-amber-200' },
    accepted: 
    { color: 'bg-blue-100', textColor: 'text-blue-700', borderColor: 'border-blue-200' },
    preparing: 
    { color: 'bg-purple-100', textColor: 'text-purple-700', borderColor: 'border-purple-200' },
    on_the_way: 
    { color: 'bg-indigo-100', textColor: 'text-indigo-700', borderColor: 'border-indigo-200' },
    delivered: 
    { color: 'bg-green-100', textColor: 'text-green-700',  borderColor: 'border-green-200' },
    cancelled: 
    { color: 'bg-red-600', textColor: 'text-white', borderColor: 'border-red-600' },
};



export default function OrderUserItem({ item  }: { item: any }) {

    const { t, i18n } = useTranslation();
    const statusStyle = statusConfig[item.status as keyof typeof statusConfig] || statusConfig.pending;
    const [cancelModalVisible, setCancelModalVisible] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);


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

    const handle_cancelOrder = async () => {
        try {
            setIsCancelling(true);

            const response = await axios.patch(`${config.URL}/orders/${item.id}/cancel`);
            Toast.show({
                type: 'success',
                text1: t('orders.orderCancelledSuccessfully')
            })
            setIsCancelling(false);
        } catch (error) {
            setIsCancelling(false);
            Toast.show({
                type: 'error',
                text1: t('orders.orderCancellationFailed')
            })
console.error('Error cancelling order:', error);
        } finally {
            setCancelModalVisible(false);
            setIsCancelling(false);
        }
    }

    return (

        <View>
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
                        <View className={`${statusStyle.color}  px-3 py-2 rounded-full flex-row items-center`}>
                            <Text className={`${statusStyle.textColor} font-semibold text-xs ml-1`}>
                                {t(`orders.${item.status === 'on_the_way' ? 'onTheWay' : item.status}`)}
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row items-center mb-2">
                        <Ionicons name="storefront-outline" size={16} color="#6b7280" />
                        <Text className="text-gray-700 font-medium ml-2">{item?.store?.name}</Text>
                    </View>

                    <View className="flex-row items-center">
                        <Ionicons name="calendar-outline" size={14} color="#9ca3af" />
                        <Text className="text-gray-500 text-xs ml-2">{formatDate(item.placed_at)}</Text>
                    </View>
                </View>

                {/* Order Items */}
                <View className="p-4 border-b border-gray-100">
                    <Text className="text-gray-700 font-semibold mb-3">{t('orders.items')} ({item.order.length})</Text>
                    {item.order.map((item: any, index: any) => (
                        <View key={index} className="flex-row justify-between items-center mb-2">
                            <View className="flex-row items-center flex-1">
                                <View className="bg-gray-100 w-8 h-8 rounded-lg justify-center items-center mr-3">
                                    <Text className="text-gray-600 font-bold text-xs">{item.quantity}x</Text>
                                </View>
                                <Text className="text-gray-700 flex-1" numberOfLines={1}>{item.name}</Text>
                            </View>
                            <Text className="text-gray-900 font-semibold ml-2"> {config.CurrencySymbol} {item.price}</Text>
                        </View>
                    ))}
                    {item.order.length > 3 && (
                        <Text className="text-blue-600 text-xs mt-2">+{item.order.length - 3} more items</Text>
                    )}
                </View>

                {/* Footer */}
                <View className="p-4">
                    <View className={`flex-row justify-between items-center mb-4  ${i18n.language === 'ar' ? 'flex-row-reverse' : ''} `}>
                        <Text className="text-gray-600 font-medium ">{t('orders.totalAmount')}</Text>
                        <Text className="text-gray-900  text-xl "> {config.CurrencySymbol} {item.total_price} </Text>
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
                            <TouchableOpacity
                                onPress={() => setCancelModalVisible(true)}
                                className="flex-1 py-3 rounded-xl" style={{ backgroundColor: 'red' }}>
                                <Text className="text-white font-bold text-center">{t('orders.cancelOrder')}</Text>
                            </TouchableOpacity>
                        )}

                    </View>
                </View>
            </View>

            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={cancelModalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setCancelModalVisible(!cancelModalVisible);
                }}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>

                  
                    <View style={{
                        backgroundColor: 'white',
                        width: '100%',
                        padding: 20,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        minHeight: 200
                    }}>
                        <Text style={{ fontSize: 18, marginBottom: 20 }}>Hello World!</Text>

                        <Pressable
                            onPress={() => setCancelModalVisible(false)}
                            style={{ backgroundColor: 'red', padding: 15, borderRadius: 12 }}
                        >
                            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                                Hide Modal
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal> */}

            <CustomModal
                visible={cancelModalVisible}
                onClose={() => setCancelModalVisible(false)}

            >
                <Text className='text-center'>{t('orders.cancelOrder')}</Text>
                <Text className='text-center mt-4 text-gray-600'>{t('orders.areYouSureCancel')}</Text>
                <View className='flex flex-row justify-center mt-10 gap-5'>


        
                    <Button 
                        title={t('common.cancel')}
                        className='flex-1 mx-2'
                        style={{ backgroundColor: 'gray' , marginRight: 8}}
                        onPress={() => setCancelModalVisible(false)}
                    />

                    <Button
                        title={isCancelling ? t('common.confirming') : t('common.confirm')}
                        onPress={handle_cancelOrder}
                        disabled={isCancelling}
                        className='flex-1 mx-2'
                    />

                
                </View>

            </CustomModal>
        </View>
    )
}
