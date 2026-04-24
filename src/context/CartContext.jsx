/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext();

const initialCart = [];

const buildCartItem = (product) => ({
  lineId: `${product.id}-${product.selectedColor ?? 'default'}-${product.selectedSize ?? 'default'}`,
  id: product.id,
  name: product.name,
  price: product.price,
  image: product.image,
  category: product.category,
  selectedColor: product.selectedColor ?? null,
  selectedSize: product.selectedSize ?? null,
  quantity: 1
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initialCart);

  const addToCart = (product) => {
    const item = buildCartItem(product);

    setCart((currentCart) => {
      const existingItem = currentCart.find((cartItem) => cartItem.lineId === item.lineId);

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.lineId === item.lineId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...currentCart, item];
    });
  };

  const removeFromCart = (lineId) => {
    setCart((currentCart) => currentCart.filter((item) => item.lineId !== lineId));
  };

  const updateQuantity = (lineId, delta) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.lineId === lineId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const total = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, total, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
