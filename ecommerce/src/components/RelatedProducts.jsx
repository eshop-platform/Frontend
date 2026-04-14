import ProductCard from './ProductCard';

const RelatedProducts = ({ products }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
