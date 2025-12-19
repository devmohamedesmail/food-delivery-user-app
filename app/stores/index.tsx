import BottomNavigation from "@/components/common/BottomNavigation";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useState, useMemo } from "react";
import { View, FlatList , Text } from "react-native";
import { useTranslation } from "react-i18next";
import useFetch from "@/hooks/useFetch";
import StoreItem from "@/components/stores/StoreItem";
import Loading from "@/components/common/Loading";
import NoStores from "@/components/stores/NoStores";
import Layout from "@/components/ui/Layout";
import Header from "@/components/stores/Header";

const Stores = () => {
  const { storeType } = useLocalSearchParams();
  const parsedStoreType = JSON.parse(storeType as string);
  const { data, loading } = useFetch(`/store-types/${parsedStoreType.id}/stores`);
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter businesses based on search query
  const filteredBusinesses = useMemo(() => {
    if (!data) return [];
    if (!searchQuery.trim()) return data;

    return data.filter(
      (store: any) =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  return (
    <Layout>
      <View className="flex-1">
        {/* Header */}
        <Header
          parsedStoreType={parsedStoreType}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {loading ? (
          <View className="flex-1 items-center justify-center">
            <Loading type="processing" message={t("common.loading")} />
          </View>
        ) : null}

        {!loading && filteredBusinesses.length === 0 ? (
          <NoStores searchQuery={searchQuery} />
        ) : null}

        <View style={{ flex: 1 }} className="">
          <FlatList
            data={filteredBusinesses}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <StoreItem item={item} />}
            columnWrapperStyle={{ gap: 1 }}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 20,
              paddingBottom: 120, 
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      <BottomNavigation />
    </Layout>
  );
};

export default Stores;
