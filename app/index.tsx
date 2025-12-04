import { View, ScrollView } from "react-native";
import SaleProducts from "@/components/home/SaleProducts";
import Copouns from "@/components/home/Copouns";
import FeaturedStores from "@/components/home/FeaturedStores";
import BottomNavigation from "@/components/common/BottomNavigation";
import { StoreTypes } from "@/components/home/StoreTypes";
import Header from "@/components/home/Header";
import Layout from "@/components/ui/Layout";
import { Link } from "expo-router";

export default function Home() {
  return (
    <Layout>
      <Header />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <StoreTypes />
        <SaleProducts />
        <Copouns />

        <Link href="/auth/login">login</Link>
        <FeaturedStores />
        <View className="h-20" />
      </ScrollView>
      <BottomNavigation />
    </Layout>
  );
}
