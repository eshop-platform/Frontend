import { useEffect, useMemo, useState } from 'react';
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
import { addRemoteReview, fetchProductById } from '../../shared/productApi';
import { getDisplayProductStats, getReviewerKey, saveLocalReview } from '../../shared/reviewStore';

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

const InputField = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-gray-950 outline-none"
    />
  </div>
);

const ProductDetailsContent = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { format } = useCurrency();
  const { toast } = useToast();
  const { addViewed, viewed } = useRecentlyViewed();
  const [currentProduct, setCurrentProduct] = useState(product);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(product.images[0] ?? product.image);
  const [qty, setQty] = useState(1);
  const [reviewForm, setReviewForm] = useState({ author: '', rating: 5, title: '', body: '' });
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');

  useEffect(() => {
    setCurrentProduct(product);
    setSelectedColor(product.colors[0] ?? '');
    setSelectedSize(product.sizes[0] ?? '');
    setActiveImg(product.images[0] ?? product.image);
    setReviewError('');
    setReviewSuccess('');
  }, [product]);

  useEffect(() => {
    addViewed(currentProduct);
  }, [currentProduct, addViewed]);

  const cartPayload = { ...currentProduct, selectedColor, selectedSize };
  const wishlisted = isWishlisted(currentProduct.id);
  const reviewStats = getDisplayProductStats(currentProduct);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(cartPayload);
    toast(`${qty} x ${currentProduct.name} added to cart`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(currentProduct);
    toast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', wishlisted ? 'info' : 'success');
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    setReviewError('');
    setReviewSuccess('');

    if (!reviewForm.author.trim()) {
      setReviewError('Please enter your name.');
      return;
    }

    try {
      if (currentProduct.isRemote) {
        const updated = await addRemoteReview(currentProduct.id, {
          ...reviewForm,
          reviewerKey: getReviewerKey()
        });
        setCurrentProduct(updated);
      } else {
        saveLocalReview(currentProduct.id, {
          ...reviewForm,
          reviewerKey: getReviewerKey()
        });
        setCurrentProduct({ ...currentProduct });
      }

      setReviewForm((current) => ({ ...current, rating: 5, title: '', body: '' }));
      setReviewSuccess('Thanks. Your rating has been saved.');
    } catch (error) {
      setReviewError(error.message);
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4);

  return (
    <div className="relative z-0 pt-[120px] pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 py-6">
        <Link to="/products" className="hover:text-gray-700 transition-colors">Products</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/products?cat=${currentProduct.category}`} className="hover:text-gray-700 transition-colors">{currentProduct.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-medium truncate max-w-[200px]">{currentProduct.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-3">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50" style={{ backgroundColor: getColor(selectedColor) + '18' }}>
            <img src={activeImg} className="w-full h-full object-cover" alt={currentProduct.name} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {currentProduct.images.map((img) => (
              <button
                key={img}
                onClick={() => setActiveImg(img)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImg === img ? 'border-gray-950 scale-[0.97]' : 'border-transparent hover:border-gray-200'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt={currentProduct.name} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2 mb-4">
            {currentProduct.isNew && <span className="rounded-full bg-gray-950 text-white px-3 py-1 text-[11px] font-semibold tracking-wide">New</span>}
            {currentProduct.onSale && <span className="rounded-full bg-rose-500 text-white px-3 py-1 text-[11px] font-semibold tracking-wide">Sale</span>}
            {currentProduct.bestSeller && <span className="rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 text-[11px] font-semibold">Best Seller</span>}
          </div>

          <h1 className="text-4xl font-bold text-gray-950 tracking-tight mb-4 leading-tight">{currentProduct.name}</h1>

          <div className="flex items-center gap-3 mb-5">
            <ReviewStars rating={reviewStats.rating} />
            <span className="font-semibold text-sm text-gray-800">{reviewStats.rating.toFixed(1)}</span>
            <span className="text-gray-400 text-sm">({reviewStats.reviewCount} reviews)</span>
          </div>

          <p className="text-4xl font-bold text-gray-950 mb-6">{format(currentProduct.price)}</p>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">{currentProduct.description}</p>

          <p className={`text-xs font-semibold mb-6 ${currentProduct.stock < 10 ? 'text-rose-500' : 'text-emerald-600'}`}>
            {currentProduct.stock < 10 ? `Only ${currentProduct.stock} left in stock` : `In stock (${currentProduct.stock} units)`}
          </p>

          <VariantPicker label="Color" options={currentProduct.colors} selected={selectedColor} onSelect={setSelectedColor} />
          <VariantPicker label="Size" options={currentProduct.sizes} selected={selectedSize} onSelect={setSelectedSize} />

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

          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={handleAddToCart} className="flex-1 bg-gray-950 text-white py-4 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors">
              Add to Cart
            </button>
            <button onClick={() => setIsModalOpen(true)} className="flex-1 bg-blue-600 text-white py-4 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors">
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

      <section className="mt-24 grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-10">
        <div className="rounded-2xl bg-gray-50 p-8 h-fit text-center lg:text-left">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-semibold mb-3">Overall Rating</p>
          <div className="text-6xl font-bold text-gray-950 mb-2">{reviewStats.rating.toFixed(1)}</div>
          <div className="flex justify-center lg:justify-start mb-3">
            <ReviewStars rating={reviewStats.rating} size="lg" />
          </div>
          <p className="text-gray-500 text-sm">Based on {reviewStats.reviewCount} verified reviews</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-950 mb-6">Customer Reviews</h2>
          <form onSubmit={handleReviewSubmit} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 mb-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <InputField label="Your name" value={reviewForm.author} onChange={(value) => setReviewForm((current) => ({ ...current, author: value }))} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Your rating</label>
                <select
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm((current) => ({ ...current, rating: Number(e.target.value) }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-gray-950 outline-none"
                >
                  {[5, 4, 3, 2, 1].map((value) => (
                    <option key={value} value={value}>{value} star{value !== 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
            <InputField label="Review title" value={reviewForm.title} onChange={(value) => setReviewForm((current) => ({ ...current, title: value }))} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Review</label>
              <textarea
                rows="4"
                value={reviewForm.body}
                onChange={(e) => setReviewForm((current) => ({ ...current, body: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-gray-950 outline-none"
                placeholder="Share what you liked, how it fit, or anything future buyers should know."
              />
            </div>
            {reviewError && <p className="text-sm text-rose-600">{reviewError}</p>}
            {reviewSuccess && <p className="text-sm text-emerald-600">{reviewSuccess}</p>}
            <button type="submit" className="rounded-full bg-gray-950 text-white px-5 py-3 text-sm font-semibold hover:bg-gray-800 transition-colors">
              Submit review
            </button>
          </form>

          <div className="space-y-4">
            {reviewStats.reviews.map((review) => (
              <article key={review.id} className="rounded-2xl border border-gray-100 bg-white p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.title || 'Review'}</h3>
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

      {viewed.filter((p) => p.id !== currentProduct.id).length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-950 mb-6">Recently Viewed</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {viewed.filter((p) => p.id !== currentProduct.id).slice(0, 4).map((p) => (
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
  const staticProduct = useMemo(() => getProductById(id), [id]);
  const [remoteProduct, setRemoteProduct] = useState(null);
  const [loadingRemote, setLoadingRemote] = useState(false);
  const product = staticProduct ?? remoteProduct;

  useEffect(() => {
    if (staticProduct) {
      setRemoteProduct(null);
      return;
    }

    let active = true;
    setLoadingRemote(true);

    fetchProductById(id)
      .then((item) => {
        if (active) setRemoteProduct(item);
      })
      .catch(() => {
        if (active) setRemoteProduct(null);
      })
      .finally(() => {
        if (active) setLoadingRemote(false);
      });

    return () => {
      active = false;
    };
  }, [id, staticProduct]);

  if (loadingRemote && !product) {
    return (
      <div className="pt-[104px] pb-24 max-w-4xl mx-auto px-4 text-center">
        <p className="text-gray-500 mb-8">Loading product...</p>
      </div>
    );
  }

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
