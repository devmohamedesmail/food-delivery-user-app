import React, { useContext, useState } from "react";
import { View, ScrollView, Button , Text , Image } from "react-native";
import { useAppSelector } from "../../store/hooks";
import { selectCartItems, selectCartTotalPrice } from "../../store/hooks";
import { useTranslation } from "react-i18next";
import { config } from "@/constants/config";
import { useFormik } from "formik";
import axios from "axios";
import { AuthContext } from "@/context/auth_context";
import { Toast } from "toastify-react-native";
import * as Yup from "yup";
import useFetch from "@/hooks/useFetch";
import Layout from "@/components/ui/Layout";
import Header from "@/components/order/Header";
import OrderSummary from "@/components/order/OrderSummary";
import OrderAction from "@/components/order/OrderAction";
import CustomerInfo from "@/components/order/CustomerInfo";
import SuccessModal from "@/components/order/SuccessModal";

export default function Order() {
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);
  const cart = useAppSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { data: areas } = useFetch("/areas/place/1");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const filteredAreas = areas?.filter((area: any) =>
    area.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


 

  const formik = useFormik({
    initialValues: {
      phone: "",
      address: "",
    },

    validationSchema: Yup.object({
      phone: Yup.string()
        .required(t("order.phoneRequired"))
        .min(6, t("order.phoneMin")),
      address: Yup.string()
        .required(t("order.addressRequired"))
        .min(6, t("order.addressMin")),
    }),

    onSubmit: async (values) => {
      try {
        setLoading(true);
        if (cartItems.length === 0) {
          Toast.show({
            type: "error",
            text1: "Your cart is empty",
            position: "bottom",
          });
          return;
        }

        const response = await axios.post(`${config.URL}/orders/create`, {
          user_id: auth?.user?.id || 0,
          store_id: cart.store.id,
          order: cartItems.map((item) => ({
            id: parseInt(item.id),
            name: item.name,
            quantity: item.quantity,
            price: item.selectedAttribute ? item.selectedAttribute.price : item.price,
          })),
          total_price: Number(cart.store.delivery_fee) + Number(totalPrice.toFixed(2)),
          delivery_address: values.address,
          phone: values.phone,
        });

        setLoading(false);
        setSuccessModalVisible(true);
      } catch (error) {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: t("order.orderErrorcreate"),
          position: "top",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Layout>
      <Header />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Customer Information */}
        <CustomerInfo
          formik={formik}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredAreas={filteredAreas}
          setSelectedArea={setSelectedArea}
        />

        {/* Order Summary */}
        <OrderSummary selectedArea={selectedArea} />

        {/* Place Order Button */}
        <OrderAction loading={loading} formik={formik} />

       
        <SuccessModal successModalVisible={successModalVisible} setSuccessModalVisible={setSuccessModalVisible} />

        {/* Bottom spacing */}
        <View className="h-8" />
      </ScrollView>
    </Layout>
  );
}
