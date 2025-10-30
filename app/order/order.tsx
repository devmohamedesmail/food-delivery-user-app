import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectCartItems, selectCartTotalPrice, selectCartTotalItems } from '../../store/hooks';
import { useTranslation } from 'react-i18next';
import { config } from '@/constants/config';
import { useFormik } from 'formik';
import CustomInput from '@/components/custom/custominput';
import CustomButton from '@/components/custom/custombutton';
import CartItem from '@/items/CartItem';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';
import { AuthContext } from '@/context/auth_context';

export default function Order() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const totalPrice = useAppSelector(selectCartTotalPrice);
    const totalItems = useAppSelector(selectCartTotalItems);
    const { t , i18n } = useTranslation();

const {auth} = useContext(AuthContext);
console.log("Auth Context in Order Screen:", auth);

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: ''
        },

        onSubmit: async (values) => {
            try {
                const response = await axios.post(`https://uber-express-project.onrender.com/api/orders`,{
                    user_id:'1',
                     restaurant_id:'1',
                     items: cartItems.map(item => ({
                        menu_item_id: item.id,
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price,
                        total: (item.price * item.quantity).toFixed(2)
                    })),
                     total:'333',
                     delivery_address:'test address',

                })
                console.log("Order Response:", response.data);
            } catch (error) {
                console.log("Order Error:", error);
            }
        }
    })












    const deliveryFee = 2.99;
    const totalWithDelivery = totalPrice + deliveryFee;

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-white px-4 py-3 shadow-sm">
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()} className="mr-3">
                        <Ionicons name="arrow-back" size={24} color="#374151" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-gray-900 flex-1">
                        {t('order.title')}
                    </Text>
                </View>
            </View>
            {/* <CustomHeader title={t('order.title')} /> */}

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Order Items Section */}
                <View className="bg-white mx-4 mt-4 rounded-xl shadow-sm">
                    <View className="p-4 border-b border-gray-100">
                        <Text className="text-lg font-bold text-gray-900 mb-1">
                            {t('order.orderItems')}
                        </Text>
                        <Text className="text-sm text-gray-500">
                            {totalItems} {t('order.itemsCount')}
                        </Text>
                    </View>

                    {cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </View>

                {/* Customer Information */}
                <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
                    <Text className={`text-lg arabic-font text-gray-900 mb-4 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
                        {t('order.customerInfo')}
                    </Text>

                    <CustomInput
                        label={t('order.fullName')}
                        placeholder={t('order.enterFullName')}
                        value={formik.values.name}
                        onChangeText={formik.handleChange('name')}
                        error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
                    />

                    <CustomInput
                        label={t('order.phoneNumber')}
                        placeholder={t('order.enterPhoneNumber')}
                        value={formik.values.phone}
                        onChangeText={formik.handleChange('phone')}
                        error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : undefined}
                    />


                </View>

                {/* Delivery Information */}
                <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
                    <Text className="text-lg font-bold text-gray-900 mb-4">
                        {t('order.deliveryInfo')}
                    </Text>

                    <View className="flex-row items-center mb-3">
                        <Ionicons name="location-outline" size={20} color="#6B7280" />
                        <View className="ml-3 flex-1">
                            <Text className="text-sm font-medium text-gray-700">
                                {t('order.deliveryAddress')}
                            </Text>
                            <Text className="text-gray-600">Your current location</Text>
                        </View>
                    </View>

                    <View className="flex-row items-center">
                        <Ionicons name="time-outline" size={20} color="#6B7280" />
                        <View className="ml-3 flex-1">
                            <Text className="text-sm font-medium text-gray-700">
                                {t('order.estimatedTime')}
                            </Text>
                            <Text className="text-gray-600">25-35 {t('order.minutes')}</Text>
                        </View>
                    </View>
                </View>

                {/* Order Summary */}
                <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
                    <Text className="text-lg font-bold text-gray-900 mb-4">
                        {t('order.orderSummary')}
                    </Text>

                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-gray-600">{t('order.subtotal')} ({totalItems} items)</Text>
                        <Text className="font-semibold text-gray-900">
                            {config.CurrencySymbol} {totalPrice.toFixed(2)}
                        </Text>
                    </View>

                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-gray-600">{t('order.deliveryFee')}</Text>
                        <Text className="font-semibold text-gray-900">
                            {config.CurrencySymbol} {deliveryFee.toFixed(2)}
                        </Text>
                    </View>

                    <View className="border-t border-gray-200 pt-3">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-lg font-bold text-gray-900">{t('order.total')}</Text>
                            <Text className="text-lg font-bold text-gray-900">
                                {config.CurrencySymbol} {totalWithDelivery.toFixed(2)}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Place Order Button */}


                <View className='mb-8 px-4'>
                    <CustomButton
                        title={t('order.placeOrder')}
                        onPress={formik.handleSubmit as any}
                        icon={<MaterialIcons name="done" size={24} color="white" />}

                    />
                </View>


                {/* Bottom spacing */}
                <View className="h-8" />
            </ScrollView>
        </SafeAreaView>
    );
}
