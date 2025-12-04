import React from "react";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "@/context/auth_context";
import { useAppSelector, selectCartTotalItems } from "@/store/hooks";
import NotificationBtn from "./NotificationBtn";

export default function Header() {
  const { t } = useTranslation();
  const router = useRouter();
  const { auth } = useAuth();
  const totalItems = useAppSelector(selectCartTotalItems);

  return (
    <LinearGradient
      colors={["#fd4a12", "#FF6A3D", "#FFC24A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="px-6 py-6 pt-14 pb-8 rounded-b-[32px]"
      style={{
        shadowColor: "#fd4a12",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
      }}
    >
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-row items-center flex-1">
          <View className="w-14 h-14 rounded-full bg-white/20 items-center justify-center mr-3 border-2 border-white/30">
            <Text className="text-2xl">👋</Text>
          </View>
          <View className="flex-1">
            <Text className="text-white/80 text-sm arabic-font mb-1">
              {t("home.welcome")}
            </Text>
            <Text className="text-white text-lg font-bold arabic-font-bold">
              {auth?.user?.name || auth?.name || t("home.guest")}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center">
          <NotificationBtn />

          <TouchableOpacity
            onPress={() => router.push("/cart")}
            className="w-11 h-11 rounded-full bg-white/20 items-center justify-center border border-white/30"
          >
            <Ionicons name="bag" size={22} color="white" />
            {totalItems > 0 && (
              <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center border-2 border-white">
                <Text className="text-[10px] text-white font-bold">
                  {totalItems}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
