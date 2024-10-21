import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import Button from "@/components/Button";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";

const AuthScreenLayout = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="index" options={{headerShown: true}} /> */}
    </Stack>
  );
};

export default AuthScreenLayout;
