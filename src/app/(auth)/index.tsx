import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import Button from "@/components/Button";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";

const SignUpIn = () => {
  const { isSignUpScreen } = useLocalSearchParams();

  const onSignInSubmit = () => {};
  const onSignUpSubmit = () => {};

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: isSignUpScreen ? "Sign up" : "Sign in",
        }}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="abc@abc.com" />
      <Text style={styles.label}>Password</Text>
      <TextInput secureTextEntry style={styles.input} placeholder="●●●●●●●" />

      <Button
        text={isSignUpScreen ? "Sign up" : "Sign in"}
        onPress={isSignUpScreen ? onSignUpSubmit : onSignInSubmit}
      />
      <Link
        href={isSignUpScreen ? "/(auth)" : "/(auth)?isSignUpScreen=true"}
        asChild
      >
        <Text style={styles.textBtn}>
          {isSignUpScreen ? "Sign in" : "Sign up"}
        </Text>
      </Link>
    </View>
  );
};

export default SignUpIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  textBtn: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});
