import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      // 🔐 AUTH
      isLoggedIn: false,
      user: null,

      // 🛒 CART
      cart: [],

      // =====================
      // AUTH ACTIONS
      // =====================
      login: (userData) => set({ isLoggedIn: true, user: userData }),

      logout: () => set({
        isLoggedIn: false,
        user: null,
        cart: []
      }),

      // =====================
      // CART ACTIONS
      // =====================

      // ✅ Add to Cart (NO duplicates)
      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find(item => item.id === product.id);

          if (existing) {
            return {
              cart: state.cart.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          }

          return {
            cart: [...state.cart, { ...product, quantity: 1 }]
          };
        }),

      // ✅ Remove item completely
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter(item => item.id !== productId)
        })),

      // ✅ Increase quantity
      increaseQty: (productId) =>
        set((state) => ({
          cart: state.cart.map(item =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        })),

      // ✅ Decrease quantity
      decreaseQty: (productId) =>
        set((state) => ({
          cart: state.cart
            .map(item =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter(item => item.quantity > 0)
        })),

      // ✅ Clear cart
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'fashion-platform-storage',
    }
  )
);