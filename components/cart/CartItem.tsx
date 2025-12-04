import { config } from "@/constants/config";
import { deleteFromCart, updateQuantity } from "@/store/slices/cartSlice";
import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { selectCartItems } from "../../store/hooks";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Modal from "react-native-modal";
import AntDesign from "@expo/vector-icons/AntDesign";
import ItemDeleteModal from "./ItemDeleteModal";

export default function CartItem({ item }: any) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const { t } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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

  const delete_item = (id: any) => {
    dispatch(deleteFromCart(id));
    toggleModal();
  };

  return (
    <>
      <View className="w-[48%] bg-gray-50 rounded-lg overflow-hidden">
        <View className="relative">
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={{ width: 100, height: 100 }}
            />
          ) : (
            <View className="bg-gray-100 h-44 flex items-center justify-center">
              <Text>{item.store_name}</Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              setSelectedItemId(item.id);
              toggleModal();
            }}
            className="absolute top-2 right-2 p-2 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center"
          >
            <FontAwesome5 name="trash" size={16} color="white" />
          </TouchableOpacity>
        </View>
        {/* item content */}
        <View>
          <Text className="text-lg text-center font-bold mt-5">{item.name}</Text>

          <Text className="text-primary font-bold mt-2 text-center">
            {item.selectedAttribute ? item.selectedAttribute.price : item.price}{" "}
            {config.CurrencySymbol}
          </Text>
          <Text className="text-primary font-bold mt-2 text-center">
            {item.selectedAttribute ? item.selectedAttribute.value : null}
          </Text>
        </View>

        {/* item actions */}
       <View className="flex flex-row items-center justify-center">
         <View className="flex-row justify-center w-32 items-center bg-gray-200 rounded-full p-1 px-2">
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
      </View>

      {/* modal */}

      {/* <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View className="bg-white p-4 rounded-lg">
          <View className="flex flex-row justify-end">
            <TouchableOpacity
              onPress={toggleModal}
              className="bg-red-600 w-10 h-10 rounded-full flex justify-center items-center"
            >
              <AntDesign name="close" size={16} color="white" />
            </TouchableOpacity>
          </View>

          <View>
            <Text className="text-center text-3xl font-bold">
              {t("cart.removeItem")}
            </Text>

            <Text className="text-center">
              {t("cart.areYouSureRemove", { itemName: item.name })}
            </Text>
          </View>

          <View className="flex flex-row justify-center px-10 my-5 gap-5">
            <TouchableOpacity
              className="bg-primary rounded-lg px-10 py-5"
              onPress={() => delete_item(selectedItemId)}
            >
              <Text className="text-white font-bold">{t("common.yes")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-primary rounded-lg px-10 py-5"
              onPress={toggleModal}
            >
              <Text className="text-white font-bold">{t("common.no")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
      <ItemDeleteModal toggleModal={toggleModal} isModalVisible={isModalVisible} selectedItemId={selectedItemId} delete_item={delete_item} item={item} />
    </>
  );
}
