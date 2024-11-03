import { useInsertOrderItems } from "@/api/order_items";
import { useInsertOrder } from "@/api/orders";
import { CartItem, PizzaSize, Tables } from "@/types";
import { randomUUID } from "expo-crypto";
import { useRouter } from "expo-router";
import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";

type CartType = {
  items: CartItem[];
  addItem: (product: Tables<"products">, size: PizzaSize) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems } = useInsertOrderItems();
  const router = useRouter();

  const addItem = (product: Tables<"products">, size: PizzaSize) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }
    const newCartItem: CartItem = {
      product,
      size,
      quantity: 1,
      product_id: product.id,
      id: randomUUID(),
    };
    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items
      .map((x) =>
        x.id !== itemId ? x : { ...x, quantity: x.quantity + amount }
      )
      .filter((x) => x.quantity > 0);
    setItems(updatedItems);
  };

  const total = items.reduce(
    (sum, item) => (sum += item.product.price! * item.quantity),
    0
  );

  const clearCart = () => {
    setItems([]);
  };

  const checkout = () => {
    insertOrder(
      { total: 11.99 },
      {
        onSuccess: saveOrderItems,
      }
    );
  };

  const saveOrderItems = (data: Tables<"orders">) => {
    const order_items = items.map((cart_item) => ({
      order_id: data.id,
      product_id: cart_item.product_id,
      quantity: cart_item.quantity,
      size: cart_item.size,
    }));
    insertOrderItems(order_items, {
      onSuccess: () => {
        clearCart();
        router.replace(`/(user)/orders/${data.id}`);
      },
    });
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, checkout, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
