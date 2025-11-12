import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
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
import { Toast } from 'toastify-react-native';
import CustomHeader from '@/components/custom/customheader';
import BottomNavigation from '@/components/common/BottomNavigation';
import * as Location from 'expo-location';

export default function Order() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const totalPrice = useAppSelector(selectCartTotalPrice);
    const totalItems = useAppSelector(selectCartTotalItems);
    const { t, i18n } = useTranslation();

    const { auth } = useContext(AuthContext);
    const [loadingLocation, setLoadingLocation] = useState(false);
    // console.log("cartItems", cartItems);

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            address: '',
        },

        onSubmit: async (values) => {
            try {
                // Validate required fields
                if (!values.name || !values.phone || !values.address) {
                    Toast.show({
                        type: 'error',
                        text1: 'Please fill in all required fields',
                        position: 'bottom',
                    });
                    return;
                }

                if (cartItems.length === 0) {
                    Toast.show({
                        type: 'error',
                        text1: 'Your cart is empty',
                        position: 'bottom',
                    });
                    return;
                }

                const response = await axios.post(`${config.URL}/orders/create`, {
                    user_id: auth?.user?.id || 1,
                    restaurant_id: 2, // You may want to get this from cart items or pass it as prop
                    order: cartItems.map(item => ({
                        id: parseInt(item.id),
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    total_price: totalWithDelivery,
                    delivery_address: values.address
                })

                Toast.show({
                    type: 'success',
                    text1: t('order.orderSuccesscreate'),
                    position: 'bottom',
                })
            } catch (error) {
                console.log("Order Error:", error);
                Toast.show({
                    type: 'error',
                    text1: t('order.orderErrorcreate'),
                    position: 'bottom',
                })
            }
        }
    })

    // Get Current Location
    const getCurrentLocation = async () => {
        try {
            setLoadingLocation(true);
            
            // Request permission
            const { status } = await Location.requestForegroundPermissionsAsync();
            
            if (status !== 'granted') {
                Alert.alert(
                    t('order.locationPermission'),
                    t('order.locationPermissionMessage'),
                    [{ text: 'OK' }]
                );
                setLoadingLocation(false);
                return;
            }

            // Get current position
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            // Reverse geocode to get address
            const [address] = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            // Format address
            const formattedAddress = [
                address.name,
                address.street,
                address.city,
                address.region,
                address.country
            ].filter(Boolean).join(', ');

            // Set address in formik
            formik.setFieldValue('address', formattedAddress || `${location.coords.latitude}, ${location.coords.longitude}`);

            Toast.success(t('order.locationSuccess'));
            setLoadingLocation(false);
        } catch (error) {
            console.log('Location Error:', error);
            Alert.alert(
                t('order.locationError'),
                t('order.locationErrorMessage'),
                [{ text: 'OK' }]
            );
            setLoadingLocation(false);
        }
    };












    const deliveryFee = 2.99;
    const totalWithDelivery = totalPrice + deliveryFee;

    return (
        <View className="flex-1 bg-gray-50">
            {/* Creative Header */}
            <View 
                className="pt-14 pb-8 px-5"
                style={{ backgroundColor: '#242424' }}
            >
                {/* Top Row - Back Button */}
                <View className="flex-row items-center justify-between mb-6">
                    <TouchableOpacity 
                        onPress={() => router.back()}
                        className='w-11 h-11 rounded-2xl items-center justify-center'
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                        }}
                    >
                        <Ionicons name="arrow-back" size={22} color="white" />
                    </TouchableOpacity>

                    <View 
                        className='flex-row items-center px-4 py-2 rounded-2xl'
                        style={{
                            backgroundColor: 'rgba(253, 74, 18, 0.15)',
                            borderWidth: 1,
                            borderColor: 'rgba(253, 74, 18, 0.3)',
                        }}
                    >
                        <Ionicons name="receipt" size={18} color="#fd4a12" />
                        <Text className="text-sm font-semibold ml-2 arabic-font" style={{ color: '#fd4a12' }}>
                            {totalItems} {totalItems === 1 ? 'item' : 'items'}
                        </Text>
                    </View>
                </View>

                {/* Title */}
                <View className="mb-4">
                    <Text className="text-3xl text-center arabic-font text-white mb-2" >
                        {t('order.title')}
                    </Text>
                    <Text className="text-white/60 text-sm arabic-font text-center">
                        {t('order.reviewAndConfirm')}
                    </Text>
                </View>

              
            </View>

        

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

                    <CustomInput
                        label={t('order.deliveryAddress')}
                        placeholder={t('order.enterDeliveryAddress')}
                        value={formik.values.address}
                        onChangeText={formik.handleChange('address')}
                        error={formik.touched.address && formik.errors.address ? formik.errors.address : undefined}
                    />


                    <TouchableOpacity
                        onPress={getCurrentLocation}
                        disabled={loadingLocation}
                        className="mt-3 rounded-2xl p-4 flex-row items-center justify-center"
                        style={{
                            backgroundColor: loadingLocation ? '#f3f4f6' : 'rgba(253, 74, 18, 0.1)',
                            borderWidth: 1,
                            borderColor: loadingLocation ? '#e5e7eb' : 'rgba(253, 74, 18, 0.3)',
                        }}
                    >
                        {loadingLocation ? (
                            <>
                                <Ionicons name="hourglass" size={20} color="#9CA3AF" />
                                <Text className="ml-2 font-semibold arabic-font" >
                                    {t('order.gettingLocation')}
                                </Text>
                            </>
                        ) : (
                            <>
                                <Ionicons name="location" size={20} color="#fd4a12" />
                                <Text className="ml-2 font-semibold arabic-font" >
                                    {t('order.useMyLocation')}
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>



                </View>                
                <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
                    <Text className={`text-lg  text-gray-900 mb-4 ${i18n.language === 'ar' ? 'arabic-font text-right' : ''}`}>
                        {t('order.deliveryInfo')}
                    </Text>

                    <View className="flex-row items-center mb-3">
                        <Ionicons name="location-outline" size={20} color="#6B7280" />
                        <View className="ml-3 flex-1">
                            <Text className="text-sm font-medium text-gray-700">
                                {t('order.deliveryAddress')}
                            </Text>
                            <Text className="text-gray-600">
                                {formik.values.address}
                            </Text>
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
                    <Text className={`text-lg  text-gray-900 mb-4 ${i18n.language === 'ar' ? 'arabic-font text-right' : ''}`}>
                        {t('order.orderSummary')}
                    </Text>

                    <View className={`flex-row justify-between items-center mb-2 ${i18n.language === 'ar' ? ' flex-row-reverse' : ''}`}>
                        <Text className="text-gray-600">{t('order.subtotal')} ({totalItems} items)</Text>
                        <Text className="font-semibold text-gray-900">
                            {config.CurrencySymbol} {totalPrice.toFixed(2)}
                        </Text>
                    </View>

                    <View className={`flex-row justify-between items-center mb-2 ${i18n.language === 'ar' ? ' flex-row-reverse' : ''}`}>
                        <Text className="text-gray-600">{t('order.deliveryFee')}</Text>
                        <Text className="font-semibold text-gray-900">
                            {config.CurrencySymbol} {deliveryFee.toFixed(2)}
                        </Text>
                    </View>

                    <View className="border-t border-gray-200 pt-3">
                        <View className={`flex-row justify-between items-center mb-2 ${i18n.language === 'ar' ? ' flex-row-reverse' : ''}`}>
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
           
        </View>
    );
}
