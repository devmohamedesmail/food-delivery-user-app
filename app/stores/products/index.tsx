import { useLocalSearchParams } from "expo-router";
import React, { useState, useMemo } from "react";
import { View, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/common/Loading";
import ProductItem from "@/components/products/ProductItem";
import NoProducts from "@/components/stores/NoProducts";
import Header from "@/components/products/Header";
import Layout from "@/components/ui/Layout";
import Categories from "@/components/products/Categories";

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  on_sale: boolean;
  sale_price: number | null;
  stock: number;
  business_id: number;
  category_id: number;
}

const Products = () => {
  const { storeItem } = useLocalSearchParams();
  const parsedStoreItem = JSON.parse(storeItem as string);
  const { data: products, loading: productsLoading } = useFetch(
    `/stores/${parsedStoreItem.id}/products`
  );

  

  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let filtered = products;

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product: Product) =>
          product?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product?.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== null) {
      filtered = filtered.filter(
        (product: Product) => product.category_id === selectedCategory
      );
    }

    return filtered;
  }, [products, searchQuery, selectedCategory]);

  return (
    <Layout>
      <Header
        parsedStoreItem={parsedStoreItem}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Categories
        parsedStoreItem={parsedStoreItem}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        t={t}
      />

      {productsLoading ? (
        <View className="flex-1 items-center justify-center">
          <Loading type="processing" message={t("stores.loading")} />
        </View>
      ) : null}

      {filteredProducts?.length === 0 && !productsLoading ? (
        <NoProducts searchQuery={searchQuery} />
      ) : null}

   
      <View className="px-2 flex-1 pb-3">
        <FlatList
          data={filteredProducts}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", gap: 10 }}
          renderItem={({ item }) => (
            <ProductItem item={item} store={parsedStoreItem} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Layout>
  );
};

export default Products;
