import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "../store/useStore";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const addToCart = useStore((state) => state.addToCart);

  /**
   * We handle the "Add to Cart" click separately.
   * e.stopPropagation() is crucial here: it prevents the 
   * click from "bubbling up" to the main Card container.
   */
  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    addToCart(product);
  };

  return (
    <Card 
      className="overflow-hidden border-none bg-transparent group cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Product Image & Badge */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#1a1a1a]">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 opacity-90" 
        />
        {product.tag && (
          <Badge className="absolute top-4 left-4 bg-white/90 text-black border-none backdrop-blur-md uppercase text-[10px] font-bold">
            {product.tag}
          </Badge>
        )}
      </div>

      {/* Product Info */}
      <CardContent className="pt-5 px-0 text-center">
        <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-medium text-white tracking-wide group-hover:underline underline-offset-4 decoration-white/30">
          {product.name}
        </h3>
        <p className="text-white font-light mt-1">${product.price}</p>
      </CardContent>

      {/* Action Button */}
      <CardFooter className="px-0">
        <Button 
          onClick={handleAddToCart} 
          variant="outline" 
          className="w-full border-white/10 text-black hover:bg-white hover:text-black transition-all text-[10px] uppercase tracking-widest relative z-10"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}