import React, { useState, useContext } from 'react'
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, StatusBar, TouchableOpacity, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CustomInput from '@/components/custom/Input'
import { AuthContext } from '@/context/auth_context'
import CustomButton from '@/components/custom/Button'
import Logo from '@/components/common/logo'


import { Toast } from 'toastify-react-native'
import { useRouter } from 'expo-router'


interface RegisterFormValues {
    name: string
    identifier: string
    password: string,
    role_id: string

}

export default function Register() {
    const { t, i18n } = useTranslation()
    const [isLoading, setIsLoading] = useState(false)
    const { handle_register } = useContext(AuthContext)
    const router = useRouter()


    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, t('auth.name_min_required'))
            .required(t('auth.name_required')),
        // identifier: Yup.string()
        //     .matches(/^[0-9]{10,15}$/, t('auth.phone_invalid'))
        //     .required(t('auth.phone_required')),
        identifier: Yup.string()
            .email(t('auth.email_invalid'))
            .required(t('auth.email_required')),
        password: Yup.string()
            .min(6, t('auth.password_min'))
            .required(t('auth.password_required')),

    })

    const formik = useFormik<RegisterFormValues>({
        initialValues: {
            name: '',
            identifier: '',
            password: '',
            role_id: '1'

        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true)

            try {

                const result = await handle_register(values.name, values.identifier, values.password , values.role_id);
                if (result.success) {

                    Toast.show({
                        type: 'success',
                        text1: t('auth.registration_success'),
                        text2: t('auth.thankYou'),
                        position: 'top',
                        visibilityTime: 3000,
                    });
                    setTimeout(() => {
                        setIsLoading(false)
                        router.push('/')
                    }, 3000);
                    
                } else {
                    Toast.show({
                        type: 'error',
                        text1: t('auth.registration_failed'),
                        text2: t('auth.pleaseTryAgain'),
                        position: 'top',
                        visibilityTime: 3000,
                    });

                }


            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: t('auth.registration_failed'),
                    text2: t('auth.pleaseTryAgain'),
                    position: 'top',
                    visibilityTime: 3000,
                });
            } finally {
                setIsLoading(false)
            }
        }
    })





    return (
        <View className="flex-1 bg-gray-50">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >



                    {/* Creative Header */}
                    <View
                        className="pt-14 pb-8 px-5"
                        style={{ backgroundColor: '#242424' }}
                    >
                        {/* Back Button */}
                        <View className="mb-3">
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
                        </View>

                        {/* Logo/Brand Section */}
                        <View className="items-center mb-3">
                            <View className="mb-4">
                                {/* <Logo /> */}
                            </View>
                            <Text
                                className="text-3xl text-white mb-2"
                                style={{ fontFamily: 'Cairo_700Bold' }}
                            >
                                {t('auth.createAccount')}
                            </Text>

                        </View>

                    </View>

                    {/* Registration Form */}
                    <View className="flex-1 bg-gray-50 -mt-4 pt-8 rounded-t-3xl px-6">
                        <View className="mb-6">
                            <Text className="text-2xl text-center arabic-font text-gray-800 mb-2">
                                {t('auth.createAccount')}
                            </Text>
                        </View>

                        {/* Name Input */}
                        <CustomInput
                            label={t('auth.name')}
                            placeholder={t('auth.enterName')}
                            type="text"
                            value={formik.values.name}
                            onChangeText={formik.handleChange('name')}

                            error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
                        />

                        {/* Phone Number Input */}
                        <CustomInput
                            label={t('auth.identifier')}
                            placeholder={t('auth.enterIdentifier')}
                            type="phone"
                            value={formik.values.identifier}
                            onChangeText={formik.handleChange('identifier')}

                            error={formik.touched.identifier && formik.errors.identifier ? formik.errors.identifier : undefined}
                        />

                        {/* Password Input */}
                        <CustomInput
                            label={t('auth.password')}
                            placeholder={t('auth.enterPassword')}
                            type="password"
                            value={formik.values.password}
                            onChangeText={formik.handleChange('password')}

                            error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
                        />



                        <CustomButton
                            title={isLoading ? t('auth.signingUp') : t('auth.signUp')}
                            onPress={() => formik.handleSubmit()}
                            disabled={isLoading || !formik.isValid || !formik.dirty || !formik.values.identifier || !formik.values.password}

                        />







                        {/* Terms and Sign In Link */}
                        <View className="mb-6">
                            <View className="flex-row justify-center items-center">
                                <Text className="text-gray-600">{t('auth.alreadyHaveAccount')} </Text>
                                <TouchableOpacity onPress={() => router.push('/auth/login')}>
                                    <Text className="text-primary font-bold">{t('auth.signIn')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>



                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}
