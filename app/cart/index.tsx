import React from "react";
import { View, ScrollView } from "react-native";
import { useAppSelector, selectCart } from "../../store/hooks";
import { selectCartItems } from "../../store/hooks";
import EmptyCart from "@/components/cart/EmptyCart";
import CartItem from "@/components/cart/CartItem";
import BottomNavigation from "@/components/common/BottomNavigation";
import Layout from "@/components/ui/Layout";
import Header from "@/components/cart/Header";
import CartSummary from "@/components/cart/CartSummary";
import CartAction from "@/components/cart/CartAction";

export default function Cart() {
  const cartItems = useAppSelector(selectCartItems);
  const cart = useAppSelector(selectCart);

 

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }




  return (
    <Layout>
      <Header />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 py-4 flex flex-row flex-wrap gap-4">
          {cart.items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </View>

       
       <CartSummary />   
       <CartAction />

        {/* Bottom spacing for navigation */}
        <View className="h-20" />
      </ScrollView>

      <BottomNavigation />
    </Layout>
  );
}
