import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCurrency } from '../../context/CurrencyContext';
import { getDisplayProductStats } from '../../../shared/reviewStore';

const ProductCard = ({ product, onQuickBuy }) => {
  const isOutOfStock = product.stock === 0;
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const { format } = useCurrency();
  const { rating, reviewCount } = getDisplayProductStats(product);

  const badges = [
    product.isNew ? { label: 'New', style: 'bg-gray-950 text-white' } : null,
    product.onSale ? { label: 'Sale', style: 'bg-rose-500 text-white' } : null,
    product.bestSeller ? { label: 'Best Seller', style: 'bg-amber-50 text-amber-700 border border-amber-200' } : null
  ].filter(Boolean);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100/80 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges */}
        {badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {badges.map(({ label, style }) => (
              <span key={label} className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${style}`}>
                {label}
              </span>
            ))}
          </div>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 rounded-full p-2.5 shadow-md transition-all ${wishlisted ? 'bg-rose-500 text-white scale-110' : 'bg-white/90 text-gray-500 hover:text-rose-500 hover:scale-110'}`}
          aria-label={`Toggle wishlist for ${product.name}`}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
            <span className="text-gray-700 font-semibold text-sm tracking-widest uppercase border border-gray-300 px-4 py-2 rounded-full">
              Out of Stock
            </span>
          </div>
        )}

        {/* Hover actions */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={() => onQuickBuy(product)}
            disabled={isOutOfStock}
            className="bg-white text-gray-900 px-4 py-2.5 rounded-full shadow-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-gray-950 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
          </button>
          <Link
            to={`/products/${product.id}`}
            className="bg-white text-gray-900 p-2.5 rounded-full shadow-lg hover:bg-gray-950 hover:text-white transition-colors"
            aria-label={`View ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="p-4">
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-medium mb-1">{product.category}</p>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 text-sm mb-2 truncate hover:text-gray-600 transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-gray-700">{rating.toFixed(1)}</span>
            <span className="text-xs text-gray-400">({reviewCount})</span>
          </div>
          <p className="font-bold text-gray-950">{format(product.price)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
