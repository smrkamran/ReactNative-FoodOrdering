import { useProductList } from "@/api/products";
import ProductListItem from "@/components/ProductListItem";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import products from "assets/data/products";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, ScrollView, Text } from "react-native";

export default function MenuScreen() {
  const { data: products, isLoading, error } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products.</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ title: "Menu" }} />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </>
  );
}
