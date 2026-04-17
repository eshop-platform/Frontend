import ProductCard from "./ProductCard";
import { Product } from "@/data/mockData";

const RelatedProducts = ({ products }: { products: Product[] }) => (
  <section className="mt-16">
    <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.slice(0, 4).map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  </section>
);

export default RelatedProducts;
