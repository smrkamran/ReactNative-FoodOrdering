import { Image, StyleSheet, Text, View } from "react-native";
import {} from "@/src/components/Themed";
import Colors from "@/src/constants/Colors";

const ProductListItem = ({
  product,
}: {
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
  };
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
