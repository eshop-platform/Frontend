import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import ProductCard from '../components/ProductCard';

export default function CategoryPage() {
  const { categoryName } = useParams(); 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(data => {
      // Filter products to show only those matching the URL category
      const filtered = data.filter(p => 
        p.category.toLowerCase() === categoryName.toLowerCase()
      );
      setProducts(filtered);
    });
  }, [categoryName]);

  return (
    <div className="pt-32 px-6 max-w-7xl mx-auto min-h-screen text-white bg-[#0a0a0a]">
      <div className="mb-12">
        <h1 className="text-5xl font-bold uppercase tracking-tighter italic">
          {categoryName}
        </h1>
        <p className="text-white/40 uppercase tracking-[0.3em] mt-2">
          Discover our curated {categoryName} collection
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="py-20 text-center border border-white/10 rounded-3xl">
          <p className="text-white/30 uppercase tracking-widest">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}