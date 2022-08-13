import { createContext, useReducer } from "react";
import Cart from "../components/Cart/Cart";

export const CartContext = createContext();

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const totalAmount =
      Math.round(
        (state.totalAmount + action.item.price * action.item.amount) * 100
      ) / 100;
    const existingItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];
    if (existingItem) {
      const updatedItemAmount = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      let updatedCart = [...state.items];
      updatedCart[existingItemIndex] = updatedItemAmount;
      return { items: updatedCart, totalAmount };
    }
    const updateCartItems = [...state.items, action.item];
    return {
      items: updateCartItems,
      totalAmount,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      item => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    const updatedAmount =
      Math.round((state.totalAmount - existingItem.price) * 100) / 100;
    if (existingItem.amount > 1) {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      let updatedCart = [...state.items];
      updatedCart[existingItemIndex] = updatedItem;
      return { items: updatedCart, totalAmount: updatedAmount };
    } else {
      return {
        items: state.items.filter(item => item.id !== action.id),
        totalAmount: updatedAmount,
      };
    }
  }
  if (action.type === "CLEAR_CART") {
    return {
      items: [],
      totalAmount: 0,
    };
  }
  return {
    items: [],
    totalAmount: 0,
  };
};

export const CartProvider = ({ children }) => {
  const [cart, dispatchCart] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
  });

  const addItem = item => {
    dispatchCart({ type: "ADD_ITEM", item });
  };
  const removeItem = id => {
    dispatchCart({ type: "REMOVE_ITEM", id });
  };
  const clearCart = () => {
    dispatchCart({ type: "CLEAR_CART" });
  };

  const cartData = { cart, addItem, removeItem, clearCart };
  return (
    <CartContext.Provider value={cartData}>{children}</CartContext.Provider>
  );
};
