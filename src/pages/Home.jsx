import { Link, useNavigate } from 'react-router-dom';
import { Suspense, lazy, useMemo } from 'react';
import ProductCard from '../components/ui/ProductCard';
import { ArrowRight, Truck, RotateCcw, ShieldCheck, Star, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useCatalog } from '../context/CatalogContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';

const Hero3D = lazy(() => import('../components/ui/Hero3D'));

const Home = () => {
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const { wishlist } = useWishlist();
  const { viewed } = useRecentlyViewed();
  const { toast } = useToast();
  const { catalog } = useCatalog();

  const newArrivals = useMemo(() => catalog.filter((product) => product.isNew).slice(0, 4), [catalog]);
  const bestSellers = useMemo(() => catalog.filter((product) => product.bestSeller).slice(0, 3), [catalog]);

  const personalizedProducts = useMemo(() => {
    const preferredCategories = [
      ...viewed.map((product) => product.category),
      ...wishlist.map((product) => product.category),
      ...cart.map((item) => item.category),
    ].filter(Boolean);

    const categoryScore = preferredCategories.reduce((accumulator, category) => {
      accumulator[category] = (accumulator[category] ?? 0) + 1;
      return accumulator;
    }, {});

    return [...catalog]
      .filter((product) => !viewed.some((item) => item.id === product.id))
      .sort((a, b) => {
        const scoreA = categoryScore[a.category] ?? 0;
        const scoreB = categoryScore[b.category] ?? 0;
        return scoreB - scoreA || Number(b.bestSeller) - Number(a.bestSeller) || b.rating - a.rating;
      })
      .slice(0, 4);
  }, [catalog, cart, viewed, wishlist]);

  const handleQuickBuy = (product) => {
    addToCart({ ...product, selectedColor: product.colors[0], selectedSize: product.sizes[0] });
    toast(`${product.name} added to cart`);
  };

  return (
    <div className="pt-[104px]">
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
            <p className="text-gray-400 text-sm tracking-[0.3em] uppercase font-medium mb-6">AI-Enhanced Marketplace</p>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-white leading-[0.95] mb-8">
              Crafted for<br />
              <span className="italic font-normal text-gray-300">Modern</span><br />
              Living.
            </h1>
            <p className="text-gray-400 text-lg mb-10 max-w-md leading-relaxed">
              Discover curated essentials, personalized picks, and newly approved marketplace products all in one storefront.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/products')}
                className="inline-flex items-center gap-2 bg-white text-gray-950 px-8 py-4 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
              >
                Shop Collection <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/sell"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                Sell with AI
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On all orders over $150' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '30-day hassle-free returns' },
              { icon: ShieldCheck, title: 'Secure Checkout', desc: 'Powered by Chapa' },
              { icon: Sparkles, title: 'AI Assistance', desc: 'Shopping help and smart seller tools' }
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

      {personalizedProducts.length > 0 && (
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12 gap-4">
            <div>
              <p className="text-xs text-gray-400 tracking-[0.25em] uppercase font-medium mb-2">Personalized</p>
              <h2 className="text-4xl font-bold text-gray-950 tracking-tight">Picked for You</h2>
            </div>
            <Link to="/products" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-950 hover:gap-2.5 transition-all">
              Explore More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalizedProducts.map((product) => (
              <ProductCard key={product.id} product={product} onQuickBuy={handleQuickBuy} />
            ))}
          </div>
        </section>
      )}

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} onQuickBuy={handleQuickBuy} />
          ))}
        </div>
      </section>

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
            <p className="text-gray-400 text-xs tracking-[0.3em] uppercase font-medium mb-4">AI Seller Tools</p>
            <h2 className="font-display text-5xl font-bold text-white mb-4 italic">Upload, price, and draft faster.</h2>
            <p className="text-gray-400 max-w-sm">Use image understanding, pricing suggestions, and AI-generated content to launch listings with less manual work.</p>
          </div>
          <Link
            to="/sell"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-gray-950 px-8 py-4 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
          >
            Open Seller Portal <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs text-gray-400 tracking-[0.25em] uppercase font-medium mb-3">Explore</p>
            <h2 className="text-4xl font-bold text-gray-950 tracking-tight">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Electronics', img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=600&q=80', cat: 'Electronics' },
              { label: "Men's Fashion", img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80', cat: 'men' },
              { label: "Women's Fashion", img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80', cat: 'women' },
              { label: 'Beauty', img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=600&q=80', cat: 'Beauty' },
              { label: 'Sports', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80', cat: 'Sports' },
              { label: 'Furniture', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80', cat: 'Furniture' },
              { label: 'Jewelry', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80', cat: 'Jewelry' },
              { label: 'Books', img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80', cat: 'Books' },
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} onQuickBuy={handleQuickBuy} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
