import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { router } from 'expo-router'
import Colors from '@/constants/Colors'



export default function Header() {
    const { t, i18n } = useTranslation();
const isRTL = i18n.language === "ar";
  return (
     <View
        className="bg-white pt-14 pb-6 px-5"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3,
        }}
      >
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-4"
            style={{ marginRight: isRTL ? 0 : 16, marginLeft: isRTL ? 16 : 0 }}
          >
            <Ionicons
              name={isRTL ? "chevron-back" : "chevron-back"}
              size={28}
              color={Colors.light.tabIconSelected}
            />
          </TouchableOpacity>
          <View className="flex-1  justify-end items-end">
            <Text className="text-2xl font-bold text-gray-800">
              {t("support.title")}
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              {t("support.subtitle")}
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        {/* <View className="bg-gray-100 rounded-2xl px-4 py-3 flex-row items-center">
          <Ionicons name="search" size={20} color="#9ca3af" />
          <TextInput
            className="flex-1 ml-3 text-base text-gray-800"
            placeholder={t("support.searchPlaceholder")}
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              marginLeft: isRTL ? 0 : 12,
              marginRight: isRTL ? 12 : 0,
              textAlign: isRTL ? "right" : "left",
            }}
          />
        </View> */}
      </View>
  )
}
