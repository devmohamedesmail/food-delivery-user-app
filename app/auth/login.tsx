import React, { useContext, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Button, SafeAreaView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import CustomInput from '@/components/custom/Input'
import CustomButton from '@/components/custom/Button'
import { AuthContext } from '@/context/auth_context'
import Logo from '@/components/common/logo'
import { Toast } from 'toastify-react-native'





export default function Login() {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const { handle_login } = useContext(AuthContext)
  

  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: '',
      
    },
    validationSchema: Yup.object({
      identifier: Yup.string()
        .email(t('auth.email_invalid'))
        .required(t('auth.email_required')),
      password: Yup.string()
        .required(t('password_required'))
        .min(6, t('password_min')),
    }),

    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        const result = await handle_login(values.identifier, values.password)
        Toast.show({
          text1: t('auth.login_success'),
          text2: t('auth.login_success_description'),
          position: 'top',
          type: 'success',
        })

        // const role = result.data.user.role;
        // console.log("Login result:", result.data.user.role);
        setIsLoading(false)
        router.replace('/')
      } catch (error) {
        setIsLoading(false)
        Toast.show({
          text1: t('auth.login_failed'),
          text2: t('auth.login_failed_description'),
          position: 'top',
          type: 'error',
        })
      } finally {
        setIsLoading(false)
      }
    },
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
            <View className="items-center  mb-3">
              <View className="mb-4 rounded-full overflow-hidden">
                <Logo />
              </View>
              <Text
                className="text-3xl text-white mb-2"
                style={{ fontFamily: 'Cairo_700Bold' }}
              >
                {t('auth.welcomeBack')}
              </Text>
              <Text
                className={`text-white/70 text-center text-base ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}
                style={{ fontFamily: 'Cairo_400Regular' }}
              >
                {t('auth.loginToYourAccount')}
              </Text>
            </View>


          </View>

          {/* Login Form */}
          <View className="flex-1 px-6 bg-gray-50 -mt-4 pt-8 rounded-t-3xl">
            <View className="space-y-4">
              {/* Email/Phone Input */}
              <CustomInput
                label={t('auth.phone')}
                placeholder={t('auth.phone')}
                value={formik.values.identifier}
                onChangeText={formik.handleChange('identifier')}
                type="text"
                keyboardType="default"
                error={formik.touched.identifier && formik.errors.identifier ? formik.errors.identifier : undefined}
              />

              {/* Password Input */}
              <CustomInput
                label={t('auth.password')}
                placeholder={t('auth.enterPassword')}
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                type="password"
                error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
              />

              {/* Remember Me & Forgot Password */}
              <View className={`flex-row justify-between items-center mt-4 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <TouchableOpacity
                  onPress={() => setRememberMe(!rememberMe)}
                  className="flex-row items-center"
                >
                  <View className={`w-5 h-5 border-2 border-gray-300 rounded mr-2 items-center justify-center ${rememberMe ? 'bg-secondary border-secondary' : ''}`}>
                    {rememberMe && <Ionicons name="checkmark" size={12} color="white" />}
                  </View>
                  <Text
                    className="text-gray-700"
                    style={{ fontFamily: 'Cairo_400Regular' }}
                  >
                    {t('auth.rememberMe')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }}>
                  <Text
                    className="text-primary font-medium"
                  >
                    {t('auth.forgotPassword')}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <View className="mt-8">
                <CustomButton
                  title={isLoading ? t('auth.signingIn') : t('auth.signIn')}
                  onPress={formik.handleSubmit}
                  disabled={isLoading || !formik.isValid || !formik.dirty || !formik.values.identifier || !formik.values.password}
                />
              </View>

              {/* <SocialLogin /> */}

              {/* Sign Up Link */}
              <View className="flex-row justify-center items-center mt-8 mb-8">
                <Text
                  className="text-gray-600"

                >
                  {t('auth.dontHaveAccount')}
                </Text>
                <TouchableOpacity onPress={() => router.push('/auth/register')}>
                  <Text
                    className="text-primary font-semibold ml-1"

                  >
                    {t('auth.signUp')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}
