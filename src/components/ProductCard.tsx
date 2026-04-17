import { Link } from "react-router-dom";
import { Product } from "@/data/mockData";

const ProductCard = ({ product }: { product: Product }) => (
  <Link to={`/product/${product.id}`} className="group block">
    <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary mb-3">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        width={640}
        height={800}
      />
      {product.badge && (
        <span className="absolute top-3 left-3 bg-background/95 backdrop-blur-sm text-foreground text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full">
          {product.badge}
        </span>
      )}
      <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <div className="bg-foreground text-background text-center text-xs font-medium py-2.5 rounded-full">
          View Product
        </div>
      </div>
    </div>
    <div className="flex items-start justify-between gap-2">
      <div>
        <h3 className="text-sm font-medium leading-tight">{product.name}</h3>
        {product.category && (
          <p className="text-xs text-muted-foreground mt-0.5">{product.category}</p>
        )}
      </div>
      <p className="text-sm font-medium whitespace-nowrap">${product.price}</p>
    </div>
  </Link>
);

export default ProductCard;
