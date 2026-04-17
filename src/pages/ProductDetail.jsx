import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/products';
import { useStore } from '../store/useStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    fetchProducts().then(data => {
      const found = data.find(p => p.id === parseInt(id));
      setProduct(found);
    });
  }, [id]);

  if (!product) return <div className="pt-40 text-center text-white">Loading...</div>;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen text-white bg-[#0a0a0a]">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="mb-8 text-white/50 hover:text-white"
      >
        ← Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left: Image */}
        <div className="rounded-3xl overflow-hidden bg-[#1a1a1a] aspect-[3/4]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <Badge className="bg-white text-black mb-4 uppercase">{product.tag}</Badge>
            <p className="text-white/40 uppercase tracking-[0.2em] text-sm">{product.category}</p>
            <h1 className="text-6xl font-bold tracking-tighter uppercase italic mt-2">{product.name}</h1>
            <p className="text-3xl font-light mt-4">${product.price}</p>
          </div>

          <p className="text-white/60 leading-relaxed text-lg">
            Experience premium craftsmanship with the {product.name}. 
            Designed for those who appreciate timeless elegance and modern luxury.
          </p>

          <Button 
            onClick={() => addToCart(product)}
            className="w-full md:w-64 bg-white text-black hover:bg-gray-200 py-8 text-lg font-bold uppercase tracking-widest rounded-full"
          >
            Add to Bag
          </Button>
        </div>
      </div>
    </div>
  );
}