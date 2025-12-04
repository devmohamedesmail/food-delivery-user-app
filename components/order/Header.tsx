import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppSelector } from '../../store/hooks';
import { selectCartTotalItems } from '../../store/hooks';
import { useTranslation } from 'react-i18next';

export default function Header() {
    const router = useRouter();
    const totalItems = useAppSelector(selectCartTotalItems);
    const { t } = useTranslation();
  return (
     <View className="pt-14 pb-8 px-5" style={{ backgroundColor: "#242424" }}>
            {/* Top Row - Back Button */}
            <View className="flex-row items-center justify-between mb-6">
              <TouchableOpacity
                onPress={() => router.back()}
                className="w-11 h-11 rounded-2xl items-center justify-center"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
              >
                <Ionicons name="arrow-back" size={22} color="white" />
              </TouchableOpacity>
    
              <View
                className="flex-row items-center px-4 py-2 rounded-2xl"
                style={{
                  backgroundColor: "rgba(253, 74, 18, 0.15)",
                  borderWidth: 1,
                  borderColor: "rgba(253, 74, 18, 0.3)",
                }}
              >
                <Ionicons name="receipt" size={18} color="#fd4a12" />
                <Text
                  className="text-sm font-semibold ml-2 arabic-font"
                  style={{ color: "#fd4a12" }}
                >
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </Text>
              </View>
            </View>
    
            {/* Title */}
            <View className="mb-4">
              <Text className="text-3xl text-center arabic-font text-white mb-2">
                {t("order.title")}
              </Text>
              {/* <Text className="text-white/60 text-sm arabic-font text-center">
                            {t('order.reviewAndConfirm')}
                        </Text> */}
            </View>
          </View>
  )
}
