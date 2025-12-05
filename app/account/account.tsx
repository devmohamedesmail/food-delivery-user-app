import React, { useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import AccountItem from "@/items/AccountItem";
import { Toast } from "toastify-react-native";
import BottomNavigation from "@/components/common/BottomNavigation";
import { AuthContext } from "@/context/auth_context";
import { useRouter } from "expo-router";
import Layout from "@/components/ui/Layout";
import Header from "@/components/account/Header";
import ProfileInfo from "@/components/account/ProfileInfo";
import SettingItem from "@/components/account/SettingItem";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "@/constants/Colors";

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
          <Text className="text-black text-lg arabic-font text-right mx-4 mb-4">
            {t("account.settings")}
          </Text>

          <SettingItem
            title={t("account.privacyPolicy")}
            icon={
              <MaterialIcons
                name="privacy-tip"
                size={24}
                color={Colors.light.tabIconSelected}
              />
            }
            type="navigation"
            onPress={() => router.push("/account/privacy-policy")}
          />

          <SettingItem
            title={t("account.helpSupport")}
            icon={
              <MaterialIcons name="support-agent" size={24} color={Colors.light.tabIconSelected} />
            }
            type="navigation"
            onPress={() => router.push("/account/support")}
          />


        </View>

        {/* Menu Items */}
        <View className="mb-8">
          <Text className="text-black text-right text-lg arabic-font mx-4 mb-4">
            {t("account.settings")}
          </Text>

        

           <SettingItem
            title={t("account.switchLanguage")}
            icon={
              <MaterialIcons name="language" size={24} color={Colors.light.tabIconSelected} />
            }
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
