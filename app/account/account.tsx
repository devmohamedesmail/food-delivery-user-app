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
import Layout from "@/components/ui/Layout";
import Header from "@/components/account/Header";
import ProfileInfo from "@/components/account/ProfileInfo";

const statsData = [
  { label: "Total Orders", value: "47", icon: "bag-outline" },
  { label: "Total Rides", value: "23", icon: "car-outline" },
  { label: "Savings", value: "$89", icon: "wallet-outline" },
];

const Account = () => {
  const { t, i18n } = useTranslation();
  const { auth } = useContext(AuthContext);
  const router = useRouter();

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
    <Layout>
      <Header />

      <ScrollView className="flex-1 bg-gray-50">
        {/* Header */}

        <ProfileInfo auth={auth} />

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

        {auth ? (
          <View className="mx-4 mb-8">
            <TouchableOpacity className="bg-red-500 p-4 rounded-xl flex-row items-center justify-center">
              <Ionicons name="log-out-outline" size={20} color="white" />
              <Text className="text-white font-bold text-base ml-2">
                {t("account.logout")}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* App Version */}
        <View className="items-center mb-6">
          <Text className="text-gray-500 text-sm">App Version 1.0.0</Text>
        </View>
      </ScrollView>
      <BottomNavigation />
    </Layout>
  );
};

export default Account;
