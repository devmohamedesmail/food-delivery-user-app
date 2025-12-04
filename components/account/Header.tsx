import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {
    const router = useRouter();
    const { t } = useTranslation();
  return (
   <View className="bg-white px-5 pt-14 pb-4 border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="bg-primary p-3 rounded-full mr-3">
              <FontAwesome name="user-circle-o" size={20} color="white" />
            </View>
            <View>
              <Text className="text-2xl font-bold text-black arabic-font">
                {t("account.myAccount")}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-gray-100 p-2 rounded-full"
          >
            <Ionicons name="close" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
  )
}
