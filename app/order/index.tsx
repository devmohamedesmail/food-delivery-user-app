import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppSelector } from '../../store/hooks';
import { selectCartItems, selectCartTotalPrice, selectCartTotalItems } from '../../store/hooks';
import { useTranslation } from 'react-i18next';
import { config } from '@/constants/config';
import { useFormik } from 'formik';
import Input from '@/components/ui/Input';
import CustomButton from '@/components/ui/Button';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';
import { AuthContext } from '@/context/auth_context';
import { Toast } from 'toastify-react-native';
import * as Yup from 'yup';
import Button from '@/components/ui/Button';
import AntDesign from '@expo/vector-icons/AntDesign';
import useFetch from '@/hooks/useFetch';
import NoAreaFound from '@/components/order/NoAreaFound';

export default function Order() {
    const router = useRouter();
    const cartItems = useAppSelector(selectCartItems);
    const totalPrice = useAppSelector(selectCartTotalPrice);
    const totalItems = useAppSelector(selectCartTotalItems);
    const { t, i18n } = useTranslation();
    const { auth } = useContext(AuthContext);
    const cart = useAppSelector((state) => state.cart);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const { data: areas } = useFetch('/areas/place/1');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedArea, setSelectedArea] = useState<any>(null);

    const filteredAreas = areas?.filter((area: any) =>
        area.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const formik = useFormik({
        initialValues: {
            phone: '',
            address: '',
        },

        validationSchema: Yup.object({
            phone: Yup.string()
                .required(t('order.phoneRequired'))
                .min(6, t('order.phoneMin')),
            address: Yup.string()
                .required(t('order.addressRequired'))
                .min(6, t('order.addressMin')),
        }),

        onSubmit: async (values) => {
            try {
                setLoading(true);
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
                    store_id: cart.store.id,
                    order: cartItems.map(item => ({
                        id: parseInt(item.id),
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    total_price: Number(cart.store.delivery_fee) + Number(totalPrice.toFixed(2)),
                    delivery_address: values.address,
                    phone: values.phone,
                })

                setLoading(false);
                Toast.show({
                    type: 'success',
                    text1: t('order.orderSuccesscreate'),
                    position: 'top',
                })
            } catch (error) {
                setLoading(false);
                Toast.show({
                    type: 'error',
                    text1: t('order.orderErrorcreate'),
                    position: 'top',
                })
            } finally {
                setLoading(false);
            }
        }
    })

 
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
                    {/* <Text className="text-white/60 text-sm arabic-font text-center">
                        {t('order.reviewAndConfirm')}
                    </Text> */}
                </View>


            </View>



            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Customer Information */}
                <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">



                    <Text className={`text-xl arabic-font text-black font-extrabold text-center mb-4 `}>
                        {t('order.deliveryInfo')}
                    </Text>



                    <Input
                        label={t('order.phoneNumber')}
                        placeholder={t('order.enterPhoneNumber')}
                        value={formik.values.phone}
                        onChangeText={formik.handleChange('phone')}
                        error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : undefined}
                    />

                    {/* <Input
                        label={t('order.deliveryAddress')}
                        placeholder={t('order.enterDeliveryAddress')}
                        value={formik.values.address}
                        onChangeText={formik.handleChange('address')}
                        error={formik.touched.address && formik.errors.address ? formik.errors.address : undefined}
                    /> */}



                    <Button title={t('order.selectyourArea')} onPress={() => { setModalVisible(true) }} />

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}>
                        <View className='bg-white shadow-sm h-96 rounded-t-2xl  w-full border-t-2 border-t-primary' style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            padding: 20,
                        }}>


                            <View className='flex flex-row justify-end'>
                                <TouchableOpacity onPress={() => { setModalVisible(false) }}
                                    className='bg-red-600 w-8 h-8 rounded-full flex items-center justify-center'>
                                    <AntDesign name="close" size={14} color="white" />
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                placeholder={t('order.searchArea')}
                                className='border border-primary rounded-full px-3 py-4 bg-white mt-4'
                            />


                            <ScrollView className="mt-4 mb-4">
                                {filteredAreas && filteredAreas.length > 0 ? (
                                    filteredAreas.map((area: any) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                formik.setFieldValue('address', area.name);
                                                setSelectedArea(area);
                                                setModalVisible(false);
                                            }}

                                            key={area.id} className="py-3 border-b border-b-gray-300">
                                            <Text>{area.name}</Text>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <NoAreaFound />
                                )}
                            </ScrollView>

                        </View>

                    </Modal>


                </View>



                {/* Order Summary */}
                <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
                    <Text className={`text-xl  text-black mb-4 text-center font-extrabold `}>
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
                            {config.CurrencySymbol} {selectedArea?.price}
                        </Text>
                    </View>

                    <View className="border-t border-gray-200 pt-3">
                        <View className={`flex-row justify-between items-center mb-2 ${i18n.language === 'ar' ? ' flex-row-reverse' : ''}`}>
                            <Text className="text-lg font-bold text-gray-900">{t('order.total')}</Text>
                            <Text className="text-lg font-bold text-gray-900">
                                {config.CurrencySymbol} {Number(cart.store.delivery_fee) + Number(totalPrice.toFixed(2))}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Place Order Button */}


                <View className='mb-8 px-4'>
                    <CustomButton
                        title={loading ? t('order.placingOrder') : t('order.placeOrder')}
                        disabled={formik.isSubmitting}
                        loading={formik.isSubmitting}
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
