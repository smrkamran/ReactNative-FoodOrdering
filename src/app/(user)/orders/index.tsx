import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import OrderListItem from "@/components/OrderListItem";
import { useMyOrderList } from "@/api/orders";

const OrderList = () => {
  const { data: orders, isLoading, error } = useMyOrderList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch orders</Text>;
  }

  return (
    <View style={{ backgroundColor: "gainsboro", height: "100%" }}>
      <Stack.Screen options={{ title: "Orders" }} />
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem key={item.id} order={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
};

export default OrderList;
