import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import AccountItem from "@/items/AccountItem";
import { Toast } from "toastify-react-native";
import CustomHeader from "@/components/ui/Header";
import BottomNavigation from "@/components/common/BottomNavigation";
import { AuthContext } from "@/context/auth_context";
import { useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";

const statsData = [
  { label: "Total Orders", value: "47", icon: "bag-outline" },
  { label: "Total Rides", value: "23", icon: "car-outline" },
  { label: "Savings", value: "$89", icon: "wallet-outline" },
];

const Account = () => {
  const { t, i18n } = useTranslation();
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  console.log("Auth User:", auth);

  const renderStat = (stat: (typeof statsData)[0], index: number) => (
    <View key={index} className="bg-white rounded-xl p-4 flex-1 mx-1 shadow-sm">
      <View className="bg-blue-100 p-3 rounded-full w-12 h-12 items-center justify-center mb-3">
        <Ionicons name={stat.icon as any} size={20} color="#3b82f6" />
      </View>
      <Text className="text-2xl font-bold text-gray-800 mb-1">
        {stat.value}
      </Text>
      <Text className="text-gray-600 text-sm">{stat.label}</Text>
    </View>
  );

  const handle_switchLanguage = () => {
    // Logic to switch language
    try {
      const newLanguage = i18n.language === "en" ? "ar" : "en";
      i18n.changeLanguage(newLanguage);
      Toast.show({
        type: "success",
        text1: t("account.language_switched"),
        position: "top",
        visibilityTime: 2000,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t("account.language_switch_failed"),
        position: "top",
        visibilityTime: 2000,
      });
    }
  };

  return (
    <SafeAreaView className="flex-1" edges={["bottom"]}>
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

      <ScrollView className="flex-1 bg-gray-50">
        {/* Header */}

        <View className="bg-gradient-to-r from-blue-500 to-purple-600 pt-12 pb-8 px-4">
         

          {/* Profile Section */}
          <View className="flex-row items-center">
            <View className="relative">
              <FontAwesome name="user-o" size={64} color="black" />
              <View className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white items-center justify-center">
                <View className="w-2 h-2 bg-white rounded-full" />
              </View>
            </View>

            <View className="ml-4 flex-1">
              <Text className="text-black text-xl font-bold">
                {auth?.user?.name}
              </Text>
              <Text className="text-black text-base mb-1">
                {auth?.user?.identifier}
              </Text>
            </View>

           
          </View>
        </View>

        {/* Stats Section */}
        <View className="px-4 -mt-6 mb-6">
          <View className="flex-row">{statsData.map(renderStat)}</View>
        </View>

        {/* Menu Items */}
        <View className="mb-8">
          <Text className="text-gray-800 text-lg arabic-font mx-4 mb-4">
            {t("account.settings")}
          </Text>

          <AccountItem
            title={t("account.privacyPolicy")}
            icon="person-outline"
            type="navigation"
            onPress={() => router.push("/account/privacy-policy")}
          />
          <AccountItem
            title={t("account.helpSupport")}
            icon="person-outline"
            type="navigation"
            onPress={() => router.push("/account/support")}
          />
        </View>

        {/* Menu Items */}
        <View className="mb-8">
          <Text className="text-gray-800 text-lg arabic-font mx-4 mb-4">
            {t("account.settings")}
          </Text>

          <AccountItem
            title={t("account.editProfile")}
            icon="person-outline"
            type="navigation"
          />
          <AccountItem
            title={t("account.orderHistory")}
            icon="person-outline"
            type="navigation"
            onPress={() => router.push("/account/orders")}
          />
          <AccountItem
            title={t("account.switchLanguage")}
            icon="language"
            type="navigation"
            onPress={handle_switchLanguage}
          />
        </View>

        {/* Sign Out Button */}
        <View className="mx-4 mb-8">
          <TouchableOpacity className="bg-red-500 p-4 rounded-xl flex-row items-center justify-center">
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text className="text-white font-bold text-base ml-2">
              {t("account.logout")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View className="items-center mb-6">
          <Text className="text-gray-500 text-sm">App Version 1.0.0</Text>
        </View>
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
};

export default Account;
