import { Link, useNavigate } from 'react-router-dom';
import { Suspense, lazy, useState, useEffect } from 'react';
import ProductCard from '../components/ui/ProductCard';
import { ArrowRight, Truck, RotateCcw, ShieldCheck, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { api } from '../lib/api';

const Hero3D = lazy(() => import('../components/ui/Hero3D'));

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [newArrivals, setNewArrivals] = useState({ data: [], loading: true });
  const [bestSellers, setBestSellers] = useState({ data: [], loading: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newData, bestData] = await Promise.all([
          api.get('/products?cat=new&status=approved'),
          api.get('/products?cat=best-sellers&status=approved')
        ]);
        setNewArrivals({ data: newData.data.slice(0, 4), loading: false });
        setBestSellers({ data: bestData.data.slice(0, 3), loading: false });
      } catch (err) {
        console.error('Failed to fetch home data:', err);
        setNewArrivals(prev => ({ ...prev, loading: false }));
        setBestSellers(prev => ({ ...prev, loading: false }));
      }
    };
    fetchData();
  }, []);

  const handleQuickBuy = (product) => {
    addToCart({ ...product, selectedColor: product.colors?.[0], selectedSize: product.sizes?.[0] });
    toast(`${product.name} added to cart`);
  };

  const Skeleton = ({ count = 4 }) => (
    <div className={`grid grid-cols-1 ${count === 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'} gap-6`}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/5] bg-gray-100 rounded-3xl mb-4" />
          <div className="h-4 bg-gray-100 rounded-full w-1/3 mb-2" />
          <div className="h-5 bg-gray-100 rounded-full w-2/3" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="pt-[104px]">
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-gray-950">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=85"
            className="w-full h-full object-cover opacity-20"
            alt="Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/60 to-gray-950/20" />
        </div>
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <p className="text-gray-400 text-sm tracking-[0.3em] uppercase font-medium mb-6">New Season Collection</p>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-white leading-[0.95] mb-8">
              Crafted for<br />
              <span className="italic font-normal text-gray-300">Modern</span><br />
              Living.
            </h1>
            <p className="text-gray-400 text-lg mb-10 max-w-md leading-relaxed">
              Curated essentials designed with intention — for the way you actually live.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/products')}
                className="inline-flex items-center gap-2 bg-white text-gray-950 px-8 py-4 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
              >
                Shop Collection <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/products?cat=new"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/40" />
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On all orders over $150' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '30-day hassle-free returns' },
              { icon: ShieldCheck, title: 'Secure Checkout', desc: 'Powered by Chapa' }
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4 py-5 px-6">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4.5 h-4.5 text-gray-700" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{title}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12 gap-4">
          <div>
            <p className="text-xs text-gray-400 tracking-[0.25em] uppercase font-medium mb-2">Just Dropped</p>
            <h2 className="text-4xl font-bold text-gray-950 tracking-tight">New Arrivals</h2>
          </div>
          <Link to="/products?cat=new" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-950 hover:gap-2.5 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {newArrivals.loading ? <Skeleton /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.data.map((product) => (
              <ProductCard key={product._id} product={product} onQuickBuy={handleQuickBuy} />
            ))}
          </div>
        )}
      </section>

      {/* Feature banner */}
      <section className="mx-4 sm:mx-6 lg:mx-8 mb-24 rounded-3xl overflow-hidden bg-gray-950 relative">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=80"
            className="w-full h-full object-cover opacity-20"
            alt="Feature"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-gray-400 text-xs tracking-[0.3em] uppercase font-medium mb-4">Limited Time</p>
            <h2 className="font-display text-5xl font-bold text-white mb-4 italic">Sale Picks</h2>
            <p className="text-gray-400 max-w-sm">Up to 40% off on selected items. Curated for quality, priced for now.</p>
          </div>
          <Link
            to="/products?cat=sale"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-gray-950 px-8 py-4 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
          >
            Shop Sale <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs text-gray-400 tracking-[0.25em] uppercase font-medium mb-3">Explore</p>
            <h2 className="text-4xl font-bold text-gray-950 tracking-tight">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Footwear', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80', cat: 'Footwear' },
              { label: "Men's Fashion", img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80', cat: 'men' },
              { label: "Women's Fashion", img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80', cat: 'women' },
              { label: 'Accessories', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80', cat: 'Accessories' },
            ].map(({ label, img, cat }) => (
              <Link
                key={cat}
                to={`/products?cat=${encodeURIComponent(cat)}`}
                className="group relative aspect-square rounded-2xl overflow-hidden"
              >
                <img src={img} alt={label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold text-sm">{label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12 gap-4">
            <div>
              <p className="text-xs text-gray-400 tracking-[0.25em] uppercase font-medium mb-2">Customer Favorites</p>
              <h2 className="text-4xl font-bold text-gray-950 tracking-tight">Best Sellers</h2>
            </div>
            <Link to="/products?cat=best-sellers" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-950 hover:gap-2.5 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {bestSellers.loading ? <Skeleton count={3} /> : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bestSellers.data.map((product) => (
                <ProductCard key={product._id} product={product} onQuickBuy={handleQuickBuy} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Social proof */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs text-gray-400 tracking-[0.25em] uppercase font-medium mb-4">Reviews</p>
        <h2 className="text-4xl font-bold text-gray-950 mb-4 tracking-tight">Loved by Thousands</h2>
        <div className="flex items-center justify-center gap-1 mb-12">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
          ))}
          <span className="ml-2 text-sm font-semibold text-gray-700">4.8 / 5 from 2,400+ reviews</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { quote: "The quality is unmatched. I've ordered three times and every piece has exceeded expectations.", author: 'Maya R.', role: 'Verified Buyer' },
            { quote: 'Fast shipping, beautiful packaging, and the products look even better in person.', author: 'Jordan P.', role: 'Verified Buyer' },
            { quote: 'Finally a store that gets it — clean design, quality materials, and fair prices.', author: 'Chris L.', role: 'Verified Buyer' }
          ].map(({ quote, author, role }) => (
            <div key={author} className="bg-gray-50 rounded-2xl p-8 text-left">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">"{quote}"</p>
              <div>
                <p className="font-semibold text-sm text-gray-900">{author}</p>
                <p className="text-xs text-gray-400">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

