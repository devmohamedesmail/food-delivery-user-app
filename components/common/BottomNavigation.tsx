import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AuthContext } from "@/context/auth_context";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useAppSelector, selectCartTotalItems } from "@/store/hooks";

const NavItem = ({ icon, label, onPress }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-center justify-center"
    >
      {icon}
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default function BottomNavigation() {
  const { t } = useTranslation();
  const router = useRouter();
  const totalItems = useAppSelector(selectCartTotalItems);
  const { auth } = useContext(AuthContext);


 

  return (
    <View className="bg-gray-100 fixed bottom-5 mx-5 px-10 rounded-full py-3 border-gray-300 border ">
      <View className="flex flex-row justify-between items-center">
        <NavItem
          icon={<AntDesign name="home" size={20} color="black" />}
          label={t("navigation.home")}
          onPress={() => router.push("/")}
        />

        <TouchableOpacity onPress={()=>router.push('/cart')}>
          <View className="flex items-center relative ">
            <Ionicons name="bag" size={25} color="#fd4a12" />
            <Text>{t("navigation.cart")}</Text>
            <Text className="absolute -top-2 right-1 bg-red-500 text-white text-xs font-bold px-1 rounded-full">{totalItems}</Text>
          </View>
        </TouchableOpacity>
        
        <NavItem
          icon={<FontAwesome name="user-o" size={20} color="black" />}
          label={t("navigation.account")}
          onPress={() => router.push(auth ? "/account/account" : "/auth/login")}
        />
      </View>
    </View>
  );
}
