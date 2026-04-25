import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { api } from '../lib/api';

const WishlistContext = createContext();

const mapWishlistData = (data) => {
  return data.map(product => ({
    ...product,
    id: product._id || product.id,
    name: product.title || product.name,
    category: product.categoryName || (typeof product.category === 'object' ? product.category.name : product.category)
  }));
};

export const WishlistProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user?.wishlist) {
      setWishlist(mapWishlistData(user.wishlist));
    } else if (!isAuthenticated) {
      setWishlist([]);
    }
  }, [user, isAuthenticated]);

  const toggleWishlist = async (product) => {
    if (!isAuthenticated) return;

    try {
      const response = await api.post(`/users/wishlist/${product._id || product.id}`);
      setWishlist(mapWishlistData(response.data));
    } catch (err) {
      console.error('Failed to toggle wishlist:', err);
    }
  };

  const isWishlisted = (productId) => wishlist.some((item) => (item._id || item.id) === productId);

  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
