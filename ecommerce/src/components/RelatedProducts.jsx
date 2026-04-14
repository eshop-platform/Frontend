import ProductCard from './ProductCard';

const RelatedProducts = ({ products }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
