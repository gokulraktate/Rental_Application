import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (vehicle) => {
    const cartItem = {
      ...vehicle,
      cartItemId: uuidv4(), // Unique ID per cart item
      quantity: vehicle.quantity || 1,
    };
    setCart((prev) => [...prev, cartItem]);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
