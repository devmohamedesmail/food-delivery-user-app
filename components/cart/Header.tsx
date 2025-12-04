import React from "react";
import { View, Text, TouchableOpacity , Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { clearCart } from "../../store/slices/cartSlice";
import { useAppDispatch } from "@/store/store";

export default function Header() {
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();



  const handleClearCart = () => {
    Alert.alert(t("cart.clearCart"), t("cart.areYouSureClearCart"), [
      { text: t("cart.cancel"), style: "cancel" },
      {
        text: t("cart.clear_all"),
        style: "destructive",
        onPress: () => dispatch(clearCart()),
      },
    ]);
  };


  

  return (
    <View className="pt-14 pb-8 px-5 bg-white">
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-11 h-11 rounded-2xl items-center bg-gray-200 justify-center"
        >
          <Ionicons name="arrow-back" size={22} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleClearCart}
          className="flex-row items-center px-4 py-2 rounded-2xl bg-red-600"
        >
          <Ionicons name="trash-outline" size={18} color="white" />
          <Text className="text-sm font-semibold ml-2 arabic-font text-white">
            {t("cart.clearCart")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Title & Items Count */}
      <View className="mb-4">
        <Text className="text-3xl text-center text-black font-extrabold mb-2">
          {t("navigation.cart")}
        </Text>
      </View>
    </View>
  );
}
