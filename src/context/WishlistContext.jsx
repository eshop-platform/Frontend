/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some((item) => item.id === product.id);

      if (exists) {
        return currentWishlist.filter((item) => item.id !== product.id);
      }

      return [
        ...currentWishlist,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          rating: product.rating,
          reviewCount: product.reviewCount,
          isNew: product.isNew,
          onSale: product.onSale,
          bestSeller: product.bestSeller,
          stock: product.stock
        }
      ];
    });
  };

  const isWishlisted = (productId) => wishlist.some((item) => item.id === productId);

  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
