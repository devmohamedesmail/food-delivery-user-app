import React from "react";
import { View, Text, Image } from "react-native";
import Button from "../ui/Button";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

export default function ProfileInfo({ auth }: any) {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <View className="bg-white pt-5 pb-8 px-4">
      {/* Profile Section */}
      <View className="flex items-center">
        <View className="flex  flex-row justify-center items-center h-44 w-44  rounded-full">
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginRight: 15,
              alignSelf: "center",
              borderColor: "#fd4a12",
              borderWidth: 2,
            }}
            source={require("../../assets/images/icons/profile.png")}
          />
        </View>

        <View className="ml-4 flex-1">
          <Text className="text-black text-xl font-bold">
            {auth?.user?.name}
          </Text>
          <Text className="text-black text-base mb-1">
            {auth?.user?.identifier}
          </Text>
        </View>

        {!auth ? (
         <View className="flex items-center">
            <Text className="text-xl mb-5">{t("auth.login_prompt")}</Text>
             <Button
            title={t("auth.login")}
            onPress={() => router.push("/auth/login")}
          />
         </View>
        ) : null}
      </View>
    </View>
  );
}
