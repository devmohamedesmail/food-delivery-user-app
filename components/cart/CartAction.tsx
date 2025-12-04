import React from 'react'
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function CartAction() {
    const router = useRouter();
    const { t } = useTranslation();

  return (
    <View className="px-4 mt-10">
         <Button
            title={t("cart.proceedToCheckout")}
            onPress={() => router.push("/order")}
            icon={
              <MaterialIcons
                name="shopping-cart-checkout"
                size={24}
                color="white"
              />
            }
          />
       </View>
  )
}
