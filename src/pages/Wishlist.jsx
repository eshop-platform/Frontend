import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { format } = useCurrency();

  return (
    <div className="pt-[104px] pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between pt-8 mb-10 gap-4">
        <div>
          <p className="text-xs text-gray-400 tracking-[0.25em] uppercase font-medium mb-2">Saved Items</p>
          <h1 className="text-4xl font-bold text-gray-950 tracking-tight">Wishlist</h1>
          {wishlist.length > 0 && <p className="text-gray-500 text-sm mt-1">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</p>}
        </div>
        <Link to="/products" className="px-5 py-2.5 rounded-full border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-950 hover:text-white hover:border-gray-950 transition-all">
          Continue Shopping
        </Link>
      </div>

      {wishlist.length === 0 ? (
        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-16 text-center">
          <Heart className="w-10 h-10 mx-auto text-gray-200 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Nothing saved yet</h2>
          <p className="text-gray-500 text-sm mb-8">Save products you love to come back to them later.</p>
          <Link to="/products" className="inline-flex px-6 py-3 rounded-full bg-gray-950 text-white text-sm font-semibold hover:bg-gray-800 transition-colors">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {wishlist.map((product) => (
            <div key={product.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/80 transition-all group">
              <Link to={`/products/${product.id}`} className="block aspect-[4/3] overflow-hidden bg-gray-50">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </Link>
              <div className="p-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium mb-1">{product.category}</p>
                <Link to={`/products/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-1 hover:text-gray-600 transition-colors">{product.name}</h3>
                </Link>
                <p className="font-bold text-gray-950 mb-4">{format(product.price)}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart({ ...product, selectedColor: product.colors?.[0], selectedSize: product.sizes?.[0] })}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gray-950 text-white px-4 py-2.5 text-xs font-semibold hover:bg-gray-800 transition-colors"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="rounded-full border border-gray-200 px-3 py-2.5 text-gray-400 hover:border-rose-300 hover:text-rose-500 transition-all"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
