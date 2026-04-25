import { useEffect, useMemo, useState } from 'react';
import { Heart, Star, ChevronRight, Minus, Plus } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import VariantPicker from '../components/product/VariantPicker';
import { getColor } from '../lib/colorUtils';
import PurchaseModal from '../components/ui/PurchaseModal';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../context/ToastContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import ProductCard from '../components/ui/ProductCard';
import { api } from '../lib/api';

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

const ProductDetailsContent = ({ product: initialProduct }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { format } = useCurrency();
  const { toast } = useToast();
  const { addViewed, viewed } = useRecentlyViewed();
  
  const [product, setProduct] = useState(initialProduct);
  const [selectedColor, setSelectedColor] = useState(initialProduct.colors?.[0] ?? '');
  const [selectedSize, setSelectedSize] = useState(initialProduct.sizes?.[0] ?? '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(initialProduct.images?.[0] ?? initialProduct.image);
  const [qty, setQty] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const [reviewForm, setReviewForm] = useState({ author: '', rating: 5, title: '', body: '' });
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');

  useEffect(() => {
    addViewed(product);
    
    // Fetch related products
    const fetchRelated = async () => {
      try {
        const catName = typeof product.category === 'object' ? product.category.name : product.categoryName || product.category;
        const data = await api.get(`/products?cat=${encodeURIComponent(catName)}&status=approved`);
        setRelatedProducts(data.data.filter(p => p._id !== product._id).slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch related products:', err);
      }
    };
    fetchRelated();
  }, [product, addViewed]);

  const cartPayload = { ...product, id: product._id, selectedColor, selectedSize };
  const wishlisted = isWishlisted(product._id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(cartPayload);
    toast(`${qty} × ${product.title} added to cart`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
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
      const data = await api.post(`/products/${product._id}/reviews`, {
        ...reviewForm,
        reviewerKey: localStorage.getItem('reviewerKey') || Math.random().toString(36).substring(7)
      });
      
      if (data.success) {
        setProduct(data.data);
        setReviewForm({ author: '', rating: 5, title: '', body: '' });
        setReviewSuccess('Thanks. Your rating has been saved.');
      }
    } catch (error) {
      setReviewError(error.message);
    }
  };

  const categoryName = typeof product.category === 'object' ? product.category.name : product.categoryName || product.category;

  return (
    <div className="relative z-0 pt-[120px] pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 py-6">
        <Link to="/products" className="hover:text-gray-700 transition-colors">Products</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/products?cat=${encodeURIComponent(categoryName)}`} className="hover:text-gray-700 transition-colors">{categoryName}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-700 font-medium truncate max-w-[200px]">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <div className="space-y-3">
          <div
            className="aspect-square rounded-2xl overflow-hidden bg-gray-50"
            style={{ backgroundColor: getColor(selectedColor) + '18' }}
          >
            <img src={activeImg} className="w-full h-full object-cover" alt={product.title} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.images?.map((img) => (
              <button
                key={img}
                onClick={() => setActiveImg(img)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImg === img ? 'border-gray-950 scale-[0.97]' : 'border-transparent hover:border-gray-200'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt={product.title} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.createdBy?.role === 'admin' && <span className="rounded-full bg-blue-600 text-white px-3 py-1 text-[11px] font-semibold tracking-wide shadow-sm">Recommended</span>}
            {(product.isNewCollection || product.isNew) && <span className="rounded-full bg-gray-950 text-white px-3 py-1 text-[11px] font-semibold tracking-wide">New</span>}
            {product.onSale && <span className="rounded-full bg-rose-500 text-white px-3 py-1 text-[11px] font-semibold tracking-wide">Sale</span>}
            {product.bestSeller && <span className="rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 text-[11px] font-semibold">Best Seller</span>}
          </div>

          <div className="flex items-center gap-2 mb-2">
             <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Posted by {product.createdBy?.username || 'System'}</span>
             <span className="h-3 w-[1px] bg-gray-200"></span>
             <span className="text-[10px] font-mono text-gray-300">ID: {product._id}</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-950 tracking-tight mb-4 leading-tight">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-5">
            <ReviewStars rating={product.rating} />
            <span className="font-semibold text-sm text-gray-800">{product.rating?.toFixed(1) || '0.0'}</span>
            <span className="text-gray-400 text-sm">({product.reviewCount || 0} reviews)</span>
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
              onClick={() => navigate('/checkout', { state: { product, selectedColor, selectedSize, quantity: qty } })}
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

      {/* Reviews Section */}
      <section className="mt-24 grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-10">
        <div className="rounded-2xl bg-gray-50 p-8 h-fit text-center lg:text-left">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-semibold mb-3">Overall Rating</p>
          <div className="text-6xl font-bold text-gray-950 mb-2">{product.rating?.toFixed(1) || '0.0'}</div>
          <div className="flex justify-center lg:justify-start mb-3">
            <ReviewStars rating={product.rating} size="lg" />
          </div>
          <p className="text-gray-500 text-sm">Based on {product.reviewCount || 0} verified reviews</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-950 mb-6">Customer Reviews</h2>
          
          {/* Review Form */}
          <form onSubmit={handleReviewSubmit} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 mb-10 space-y-4">
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

          {/* Reviews List */}
          <div className="space-y-4">
            {product.reviews?.length > 0 ? product.reviews.map((review) => (
              <article key={review._id || review.id} className="rounded-2xl border border-gray-100 bg-white p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.title || 'Review'}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">by {review.author}</p>
                  </div>
                  <ReviewStars rating={review.rating} />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{review.body}</p>
              </article>
            )) : (
              <p className="text-gray-500 text-sm italic">No reviews yet for this product.</p>
            )}
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
              <ProductCard key={p._id} product={p} onQuickBuy={(prod) => { addToCart({ ...prod, id: prod._id, selectedColor: prod.colors?.[0], selectedSize: prod.sizes?.[0] }); toast(`${prod.title} added to cart`); }} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      {viewed.filter((p) => p._id !== product._id).length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-950 mb-6">Recently Viewed</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {viewed.filter((p) => p._id !== product._id).slice(0, 4).map((p) => (
              <ProductCard key={p._id} product={p} onQuickBuy={(prod) => { addToCart({ ...prod, id: prod._id, selectedColor: prod.colors?.[0], selectedSize: prod.sizes?.[0] }); toast(`${prod.title} added to cart`); }} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await api.get(`/products/${id}`);
        setProduct(data.data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-[104px] pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="h-4 bg-gray-100 rounded w-1/4 my-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="aspect-square bg-gray-100 rounded-2xl" />
          <div className="space-y-6">
            <div className="h-10 bg-gray-100 rounded w-3/4" />
            <div className="h-6 bg-gray-100 rounded w-1/4" />
            <div className="h-24 bg-gray-100 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
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

  return <ProductDetailsContent key={product._id} product={product} />;
};

export default ProductDetails;
