import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { api } from '../lib/api';

const CartContext = createContext();

const mapBackendCartToFrontend = (backendCart) => {
  return backendCart
    .filter(cartItem => cartItem.item) // Defensive: filter out items where product is missing
    .map(cartItem => ({
      lineId: `${cartItem.item._id || cartItem.item.id}-${cartItem.selectedColor ?? 'default'}-${cartItem.selectedSize ?? 'default'}`,
      id: cartItem.item._id || cartItem.item.id,
      product: cartItem.item,
      name: cartItem.item.title || cartItem.item.name,
      price: cartItem.item.price,
      image: cartItem.item.image || (cartItem.item.images && cartItem.item.images[0]),
      category: cartItem.item.categoryName || (cartItem.item.category && cartItem.item.category.name),
      selectedColor: cartItem.selectedColor,
      selectedSize: cartItem.selectedSize,
      quantity: cartItem.quantity
    }));
};

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user?.cart) {
      setCart(mapBackendCartToFrontend(user.cart));
    } else if (!isAuthenticated) {
      setCart([]);
    }
  }, [user, isAuthenticated]);

  const addToCart = async (product) => {
    if (!isAuthenticated) return;

    try {
      const response = await api.post('/users/cart/add', {
        productId: product._id || product.id,
        quantity: 1,
        selectedColor: product.selectedColor || null,
        selectedSize: product.selectedSize || null
      });
      setCart(mapBackendCartToFrontend(response.data));
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const removeFromCart = async (lineId) => {
    if (!isAuthenticated) return;

    const item = cart.find(i => i.lineId === lineId);
    if (!item) return;

    try {
      const response = await api.post('/users/cart/remove', {
        productId: item.id,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize
      });
      setCart(mapBackendCartToFrontend(response.data));
    } catch (err) {
      console.error('Failed to remove from cart:', err);
    }
  };

  const updateQuantity = async (lineId, delta) => {
    if (!isAuthenticated) return;

    const item = cart.find(i => i.lineId === lineId);
    if (!item) return;

    const newQuantity = Math.max(0, item.quantity + delta);
    
    try {
      const response = await api.patch('/users/cart/quantity', {
        productId: item.id,
        quantity: newQuantity,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize
      });
      setCart(mapBackendCartToFrontend(response.data));
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
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
