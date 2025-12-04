import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { selectCartItems } from "../store/hooks";
import {
  addToCart,
  removeFromCart,
  deleteFromCart,
  clearCart,
  updateQuantity,
} from "../store/slices/cartSlice";
import { Ionicons } from "@expo/vector-icons";
import { config } from "@/constants/config";
import { useTranslation } from "react-i18next";

export default function CartItem({ item }: any) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const { t } = useTranslation();

  // const handleIncreaseQuantity = (itemId: string) => {
  //     const item = cartItems.find(cartItem => cartItem.id === itemId);
  //     if (item) {
  //         dispatch(addToCart(item));
  //     }
  // };

  // const handleDecreaseQuantity = (itemId: string) => {
  //     dispatch(removeFromCart(itemId));
  // };

  const handleIncreaseQuantity = (itemId: string) => {
    const item = cartItems.find((cartItem) => cartItem.id === itemId);
    if (item) {
      dispatch(updateQuantity({ id: itemId, quantity: item.quantity + 1 }));
    }
  };

  const handleDecreaseQuantity = (itemId: string) => {
    const item = cartItems.find((cartItem) => cartItem.id === itemId);
    if (item) {
      dispatch(updateQuantity({ id: itemId, quantity: item.quantity - 1 }));
    }
  };

  const handleRemoveItem = (itemId: string, itemName: string) => {
    Alert.alert(
      t("cart.removeItem"),
      t("cart.areYouSureRemove", { itemName }),
      [
        { text: t("cart.cancel"), style: "cancel" },
        {
          text: t("cart.remove"),
          style: "destructive",
          onPress: () => dispatch(deleteFromCart(itemId)),
        },
      ]
    );
  };

  return (
    <View key={item.id} className="bg-white rounded-xl mb-4 p-4 shadow-sm">
      <View className="flex-row">
        {/* Item Image */}
        <View className="w-20 h-20 rounded-xl bg-gray-200 overflow-hidden mr-4">
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            />
          ) : (
            <View className="flex-1 flex items-center justify-center">
              <Ionicons name="image-outline" size={24} color="black" />
            </View>
          )}
        </View>

        {/* Item Details */}
        <View className="flex-1">
          <View className="flex-row justify-between items-start mb-2">
            <Text
              className="text-lg font-bold text-gray-900 flex-1 mr-2"
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <TouchableOpacity
              onPress={() => handleRemoveItem(item.id, item.name)}
              className="p-1"
            >
              <Ionicons name="trash-outline" size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center justify-between">
            {/* Price */}
            <Text className="text-lg font-bold text-gray-900">
              {config.CurrencySymbol} {(item.price * item.quantity).toFixed(2)}
            </Text>

           

            {/* Quantity Controls */}
            <View className="flex-row items-center bg-gray-200 rounded-full p-1 px-2">
              <TouchableOpacity
                onPress={() => handleDecreaseQuantity(item.id)}
                className="p-2 bg-primary rounded-full"
              >
                <Ionicons name="remove" size={18} color="white" />
              </TouchableOpacity>

              <View className="px-4 py-2">
                <Text className="font-bold text-gray-900">{item.quantity}</Text>
              </View>

              <TouchableOpacity
                onPress={() => handleIncreaseQuantity(item.id)}
                className="p-2 bg-primary rounded-full"
              >
                <Ionicons name="add" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
           <View className="flex flex-row ">
              <Text>{item?.selectedAttribute?.price} </Text>
              <Text> {item?.selectedAttribute?.value} </Text>
            </View>
        </View>
      </View>
    </View>
  );
}
