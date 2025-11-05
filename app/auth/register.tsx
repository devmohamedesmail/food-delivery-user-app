import React, { useState, useContext } from 'react'
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, StatusBar, TouchableOpacity, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CustomInput from '@/components/custom/custominput'
import { AuthContext } from '@/context/auth_context'
import CustomButton from '@/components/custom/custombutton'
import Logo from '@/components/logo'


import { Toast } from 'toastify-react-native'
import { useRouter } from 'expo-router'

type UserRole = 'restaurant_owner' | 'driver'

interface RegisterFormValues {
    name: string
    identifier: string
    password: string

}

export default function Register() {
    const { t, i18n } = useTranslation()
    const [isLoading, setIsLoading] = useState(false)
    const { handle_register } = useContext(AuthContext)
    const router = useRouter()


    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, t('name_required'))
            .required(t('name_required')),
        identifier: Yup.string()
            .matches(/^[0-9]{10,15}$/, t('phone_invalid'))
            .required(t('phone_required')),
        password: Yup.string()
            .min(6, t('password_min'))
            .required(t('password_required')),

    })

    const formik = useFormik<RegisterFormValues>({
        initialValues: {
            name: '',
            identifier: '',
            password: '',

        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true)

            try {

                const result = await handle_register(values.name, values.identifier, values.password)
                if (result.success) {

                    Toast.show({
                        type: 'success',
                        text1: t('registration_success'),
                        position: 'top',
                        visibilityTime: 3000,
                    });
                } else {
                    Toast.show({
                        type: 'error',
                        text1: t('registration_failed'),
                        position: 'top',
                        visibilityTime: 3000,
                    });

                }


            } catch (error) {
                Alert.alert('Error', 'Network error. Please try again.')
            } finally {
                setIsLoading(false)
            }
        }
    })





    return (
        <View className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    className="flex-1"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >



                    <View className="pt-10 pb-8 px-6">


                        <TouchableOpacity
                            className='bg-gray-200 w-12 h-12 flex items-center justify-center rounded-full'
                            onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>



                        <View className='flex items-center'>
                            <Logo />
                            <Text
                                className="text-3xl font-bold text-gray-800 mb-2"
                                style={{ fontFamily: 'Cairo_700Bold' }}
                            >
                                {t('auth.welcomeBack')}
                            </Text>
                            <Text
                                className={`text-gray-600 text-center ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}
                                style={{ fontFamily: 'Cairo_400Regular' }}
                            >
                                {t('auth.loginToYourAccount')}
                            </Text>
                        </View>
                    </View>

                    {/* Registration Form */}
                    <View className="flex-1 bg-white rounded-t-[32px] px-6 pt-6">
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
