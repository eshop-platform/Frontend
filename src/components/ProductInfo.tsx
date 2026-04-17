import { Product } from "@/data/mockData";

const ProductInfo = ({ product }: { product: Product }) => (
  <div className="space-y-4">
    <h1 className="text-3xl md:text-4xl">{product.name}</h1>
    <p className="text-2xl font-medium">${product.price}</p>
    {product.catchphrase && (
      <p className="text-muted-foreground italic">{product.catchphrase}</p>
    )}
    {product.description && (
      <p className="text-muted-foreground leading-relaxed text-sm pt-2 border-t border-border">
        {product.description}
      </p>
    )}
  </div>
);

export default ProductInfo;
