import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero'; // Import the new Hero component
import { useNavigate } from 'react-router-dom';
export default function LandingPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);
  const navigate = useNavigate();

const categories = [
  { id: 'cloth', name: 'cloth', image: 'https://images.unsplash.com/photo-1445205170230-053b830c6050?q=80&w=500' },
  { id: 'shoes', name: 'shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=500' },
  { id: 'bags', name: 'bags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=500' },
  { id: 'electronics', name: 'electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=500' },
  { id: 'accessory', name: 'accessory', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=500' },
  { id: 'perfumes', name: 'perfumes', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=500' },
];

  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* 1. THE BIG BANNER (HERO) */}
      <Hero />

      {/* 2. CATEGORIES SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-sm uppercase tracking-[0.4em] text-white/40 mb-10 text-center">Departmental Excellence</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div 
  key={cat.id} 
  onClick={() => navigate(`/category/${cat.name}`)}
  className="relative group h-[400px] overflow-hidden rounded-3xl cursor-pointer"
>
              <img src={cat.image} className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition duration-1000" alt={cat.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-8 left-0 w-full text-center">
                <h3 className="text-lg font-bold uppercase tracking-widest">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (Best Sellers & New Arrivals) */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-24">
        {/* Best Sellers Sub-section */}
        <div>
          <h2 className="text-3xl font-light italic uppercase tracking-tighter mb-10 border-l-2 border-white pl-6">Best Sellers</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            {products.filter(p => p.tag === 'Best Seller').slice(0, 5).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* New Arrivals Sub-section */}
        <div>
          <h2 className="text-3xl font-light italic uppercase tracking-tighter mb-10 border-l-2 border-indigo-500 pl-6">New Arrivals</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            {products.filter(p => p.tag === 'New Arrival').map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}