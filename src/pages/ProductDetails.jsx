import { useMemo, useState, useEffect } from 'react';
import { Heart, Star, ChevronRight, Minus, Plus } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import VariantPicker from '../components/product/VariantPicker';
import { getColor } from '../lib/colorUtils';
import PurchaseModal from '../components/ui/PurchaseModal';
import { getProductById, products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../context/ToastContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import ProductCard from '../components/ui/ProductCard';

const ReviewStars = ({ rating, size = 'sm' }) => {
  const cls = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5';
  return (
    <div className="flex items-center gap-0.5 text-amber-400">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`${cls} ${i < Math.round(rating) ? 'fill-current' : 'text-gray-200'}`} />
      ))}
    </div>
  );
};

const ProductDetailsContent = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { format } = useCurrency();
  const { toast } = useToast();
  const { addViewed, viewed } = useRecentlyViewed();
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(product.images[0] ?? product.image);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    addViewed(product);
  }, [product, addViewed]);

  const cartPayload = { ...product, selectedColor, selectedSize };
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(cartPayload);
    toast(`${qty} × ${product.name} added to cart`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    toast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', wishlisted ? 'info' : 'success');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-[104px] pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 py-6">
        <Link to="/products" className="hover:text-gray-700 transition-colors">Products</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/products?cat=${product.category}`} className="hover:text-gray-700 transition-colors">{product.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <div className="space-y-3">
          <div
            className="aspect-square rounded-2xl overflow-hidden bg-gray-50"
            style={{ backgroundColor: getColor(selectedColor) + '18' }}
          >
            <img src={activeImg} className="w-full h-full object-cover" alt={product.name} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.images.map((img) => (
              <button
                key={img}
                onClick={() => setActiveImg(img)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImg === img ? 'border-gray-950 scale-[0.97]' : 'border-transparent hover:border-gray-200'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt={product.name} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.isNew && <span className="rounded-full bg-gray-950 text-white px-3 py-1 text-[11px] font-semibold tracking-wide">New</span>}
            {product.onSale && <span className="rounded-full bg-rose-500 text-white px-3 py-1 text-[11px] font-semibold tracking-wide">Sale</span>}
            {product.bestSeller && <span className="rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 text-[11px] font-semibold">Best Seller</span>}
          </div>

          <h1 className="text-4xl font-bold text-gray-950 tracking-tight mb-4 leading-tight">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-5">
            <ReviewStars rating={product.rating} />
            <span className="font-semibold text-sm text-gray-800">{product.rating.toFixed(1)}</span>
            <span className="text-gray-400 text-sm">({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <p className="text-4xl font-bold text-gray-950 mb-6">{format(product.price)}</p>

          <p className="text-gray-500 text-sm leading-relaxed mb-6">{product.description}</p>

          {/* Stock */}
          <p className={`text-xs font-semibold mb-6 ${product.stock < 10 ? 'text-rose-500' : 'text-emerald-600'}`}>
            {product.stock < 10 ? `Only ${product.stock} left in stock` : `In stock (${product.stock} units)`}
          </p>

          <VariantPicker label="Color" options={product.colors} selected={selectedColor} onSelect={setSelectedColor} />
          <VariantPicker label="Size" options={product.sizes} selected={selectedSize} onSelect={setSelectedSize} />

          {/* Quantity */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500 mb-3">Quantity</p>
            <div className="inline-flex items-center gap-4 border border-gray-200 rounded-full px-4 py-2">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="text-gray-500 hover:text-gray-950 transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-semibold w-6 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="text-gray-500 hover:text-gray-950 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gray-950 text-white py-4 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 bg-blue-600 text-white py-4 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Buy Now
            </button>
            <button
              type="button"
              onClick={handleToggleWishlist}
              className={`p-4 rounded-full border-2 transition-all ${wishlisted ? 'border-rose-500 bg-rose-50 text-rose-500' : 'border-gray-200 text-gray-500 hover:border-rose-300 hover:text-rose-400'}`}
              aria-label="Toggle wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-24 grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-10">
        <div className="rounded-2xl bg-gray-50 p-8 h-fit text-center lg:text-left">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-semibold mb-3">Overall Rating</p>
          <div className="text-6xl font-bold text-gray-950 mb-2">{product.rating.toFixed(1)}</div>
          <div className="flex justify-center lg:justify-start mb-3">
            <ReviewStars rating={product.rating} size="lg" />
          </div>
          <p className="text-gray-500 text-sm">Based on {product.reviewCount} verified reviews</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-950 mb-6">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <article key={review.id} className="rounded-2xl border border-gray-100 bg-white p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">by {review.author}</p>
                  </div>
                  <ReviewStars rating={review.rating} />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{review.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PurchaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={cartPayload} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-24">
          <h2 className="text-2xl font-bold text-gray-950 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onQuickBuy={(prod) => { addToCart({ ...prod, selectedColor: prod.colors[0], selectedSize: prod.sizes[0] }); toast(`${prod.name} added to cart`); }} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      {viewed.filter((p) => p.id !== product.id).length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-950 mb-6">Recently Viewed</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {viewed.filter((p) => p.id !== product.id).slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} onQuickBuy={(prod) => { addToCart({ ...prod, selectedColor: prod.colors[0], selectedSize: prod.sizes[0] }); toast(`${prod.name} added to cart`); }} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const product = useMemo(() => getProductById(id), [id]);

  if (!product) {
    return (
      <div className="pt-[104px] pb-24 max-w-4xl mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm tracking-widest uppercase mb-4">404</p>
        <h1 className="text-4xl font-bold text-gray-950 mb-4">Product Not Found</h1>
        <p className="text-gray-500 mb-8">The item you're looking for doesn't exist in our catalog.</p>
        <Link to="/products" className="inline-flex px-6 py-3 rounded-full bg-gray-950 text-white text-sm font-semibold hover:bg-gray-800 transition-colors">
          Back to Products
        </Link>
      </div>
    );
  }

  return <ProductDetailsContent key={product.id} product={product} />;
};

export default ProductDetails;
