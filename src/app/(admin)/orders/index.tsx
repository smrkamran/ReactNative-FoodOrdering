import { View, Text, FlatList } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import OrderListItem from "@/components/OrderListItem";
import orders from "assets/data/orders";

const OrderList = () => {
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
