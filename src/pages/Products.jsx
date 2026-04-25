import { useMemo, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { Filter, ChevronDown, Search, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { api } from '../lib/api';

const PRODUCTS_PER_BATCH = 9;

const ProductResults = ({ items, onQuickBuy, loading }) => {
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_BATCH);
  const visible = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/5] bg-gray-100 rounded-3xl mb-4" />
            <div className="h-4 bg-gray-100 rounded-full w-1/3 mb-2" />
            <div className="h-5 bg-gray-100 rounded-full w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {visible.map((product) => (
          <ProductCard key={product._id} product={product} onQuickBuy={onQuickBuy} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + PRODUCTS_PER_BATCH)}
            className="rounded-full border border-gray-200 bg-white text-gray-900 px-8 py-3.5 text-sm font-semibold hover:bg-gray-950 hover:text-white hover:border-gray-950 transition-all"
          >
            Load More ({items.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </>
  );
};

const FilterSidebar = ({ sidebarOpen, setSidebarOpen, categoryFilter, updateParam, collectionButtons, categories }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6 space-y-6">
    <div className="flex items-center gap-2">
      <Filter className="w-4 h-4 text-gray-400" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Filters</span>
    </div>

    {/* Gender */}
    <div className="border-t border-gray-100 pt-5">
      <p className="text-sm font-semibold text-gray-900 mb-3">Gender</p>
      <div className="flex flex-wrap gap-2">
        {[['All', 'All'], ['men', "Men's"], ['women', "Women's"]].map(([val, label]) => (
          <button
            key={val}
            type="button"
            onClick={() => updateParam('cat', val)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-all ${categoryFilter === val ? 'border-gray-950 bg-gray-950 text-white' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
    <div className="border-t border-gray-100 pt-5">
      <button
        type="button"
        onClick={() => setSidebarOpen((c) => ({ ...c, categories: !c.categories }))}
        className="w-full flex items-center justify-between text-sm font-semibold text-gray-900 mb-3"
      >
        Categories
        <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${sidebarOpen.categories ? 'rotate-90' : ''}`} />
      </button>
      {sidebarOpen.categories && (
        <div className="flex flex-wrap gap-2">
          {categories.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => updateParam('cat', opt)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-all ${categoryFilter === opt ? 'border-gray-950 bg-gray-950 text-white' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
    <div className="border-t border-gray-100 pt-5">
      <button
        type="button"
        onClick={() => setSidebarOpen((c) => ({ ...c, collections: !c.collections }))}
        className="w-full flex items-center justify-between text-sm font-semibold text-gray-900 mb-3"
      >
        Collections
        <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${sidebarOpen.collections ? 'rotate-90' : ''}`} />
      </button>
      {sidebarOpen.collections && (
        <div className="flex flex-wrap gap-2">
          {collectionButtons.map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => updateParam('cat', value)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-all ${categoryFilter === value ? 'border-gray-950 bg-gray-950 text-white' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
);

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState({ categories: true, collections: true });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriesList, setCategoriesList] = useState([]);

  const searchQuery = searchParams.get('q') ?? '';
  const categoryFilter = searchParams.get('cat') ?? 'All';
  const sortOrder = searchParams.get('sort') ?? 'newest';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.get('/categories');
        setCategoriesList(data.data.map(c => c.name));
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          q: searchQuery,
          cat: categoryFilter,
          sort: sortOrder,
          status: 'approved'
        }).toString();

        const data = await api.get(`/products?${query}`);
        setProducts(data.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        toast('Failed to load products', 'error');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, categoryFilter, sortOrder, toast]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'All' || (key === 'sort' && value === 'newest')) next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  };

  const handleQuickBuy = (product) => {
    addToCart({ ...product, selectedColor: product.colors?.[0], selectedSize: product.sizes?.[0] });
    toast(`${product.title} added to cart`);
  };

  const collectionButtons = [['new', 'New Arrivals'], ['sale', 'Sale Picks'], ['best-sellers', 'Best Sellers']];
  const resultsKey = `${categoryFilter}-${searchQuery}-${sortOrder}`;

  return (
    <div className="pt-[104px] pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pt-8">
        <div>
          <p className="text-xs text-gray-400 tracking-[0.25em] uppercase font-medium mb-2">Browse</p>
          <h1 className="text-4xl font-bold text-gray-950 tracking-tight">The Catalog</h1>
          <p className="text-gray-500 mt-1 text-sm">{products.length} item{products.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Mobile filter toggle */}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((c) => !c)}
            className="lg:hidden inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-400 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => updateParam('q', e.target.value)}
              placeholder="Search products…"
              className="bg-white border border-gray-200 pl-10 pr-4 py-2.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 w-52 transition-all"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="appearance-none bg-white border border-gray-200 px-4 py-2.5 pr-9 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-950 font-medium text-gray-700 cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Mobile filters */}
      {mobileFiltersOpen && (
        <div className="lg:hidden mb-6">
          <FilterSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} categoryFilter={categoryFilter} updateParam={updateParam} collectionButtons={collectionButtons} categories={categoriesList} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block lg:sticky lg:top-28 h-fit">
          <FilterSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} categoryFilter={categoryFilter} updateParam={updateParam} collectionButtons={collectionButtons} categories={categoriesList} />
        </aside>

        {/* Results */}
        <div>
          {!loading && products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-16 text-center">
              <p className="text-2xl font-semibold text-gray-900 mb-2">No products found</p>
              <p className="text-gray-500 text-sm mb-6">Try a different keyword or clear the active filters.</p>
              <Link to="/products" className="inline-flex items-center px-6 py-3 rounded-full bg-gray-950 text-white text-sm font-semibold hover:bg-gray-800 transition-colors">
                Reset Catalog
              </Link>
            </div>
          ) : (
            <ProductResults key={resultsKey} items={products} onQuickBuy={handleQuickBuy} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
