import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/store/store";
import { selectCartTotalPrice } from "@/store/hooks";
import { config } from "@/constants/config";

export default function CartSummary() {
  const { t, i18n } = useTranslation();
  const totalPrice = useAppSelector(selectCartTotalPrice);

  return (
    <View className="bg-white mx-4 rounded-xl p-4 mb-4 shadow-sm">
      <Text className={`text-lg text-black text-center mb-4 font-extrabold`}>
        {t("cart.orderSummary")}
      </Text>

      <View className="border-t border-gray-200 pt-2 mt-2">
        <View
          className={`flex-row justify-between items-center  ${i18n.language === "ar" ? "flex-row-reverse" : ""}`}
        >
          <Text className="text-lg text-black ">{t("cart.total")}</Text>
          <Text className="text-lg font-bold text-black">
            {config.CurrencySymbol} {totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}
