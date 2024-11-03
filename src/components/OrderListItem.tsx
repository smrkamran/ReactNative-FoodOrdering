import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Order, OrderItem, Tables } from "@/types";
import { Href, Link, useSegments } from "expo-router";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Tables<"orders">;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();
  const href: Href<string> = `/${segments[0]}/orders/${order.id}`;
  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.orderNumber}>Order #{order.id}</Text>
          <Text style={styles.timeAgo}>
            {dayjs(order.created_at).fromNow()}
          </Text>
        </View>

        <Text style={styles.orderStatus}>{order.status}</Text>
      </Pressable>
    </Link>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderNumber: {
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 5,
  },
  timeAgo: {
    color: "gray",
    fontSize: 15,
  },
  orderStatus: {
    fontWeight: "500",
  },
});
