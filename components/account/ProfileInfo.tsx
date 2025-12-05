import React from "react";
import { View, Text, Image } from "react-native";
import Button from "../ui/Button";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

export default function ProfileInfo({ auth }: any) {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <View className="bg-white pt-1 pb-2 px-4">
      <View className="flex items-center">
        <View className="flex  flex-row justify-center items-center h-32 w-32 border border-primary bg-gray-200 overflow-hidden rounded-full">
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
            
            }}
            source={require("../../assets/images/icons/profile.png")}
          />
        </View>

        {auth ? (
          <View className="ml-4 flex-1">
            <Text className="text-black text-xl font-bold">
              {auth?.user?.name}
            </Text>
            <Text className="text-black text-base mb-1">
              {auth?.user?.identifier}
            </Text>
          </View>
        ) : null}

        {!auth ? (
          <View className="flex items-center mt-5">
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
