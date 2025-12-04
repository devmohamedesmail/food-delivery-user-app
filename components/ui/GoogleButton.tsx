
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Image, Text,TouchableOpacity } from 'react-native'

export default function GoogleButton() {
    const {t}=useTranslation()
  return (
   <TouchableOpacity>
    <View className="flex-row items-center justify-center bg-white px-4 py-5 rounded-lg shadow-md">
      <Image
        source={require('../../assets/images/icons/google.png')}
        className="w-6 h-6 mr-2"
      />
      <Text className="text-black font-medium">{t('auth.continueWithGoogle')}</Text>
    </View>
   </TouchableOpacity>
  )
}
