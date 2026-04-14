const ProductCard = ({ product }) => {
  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition">{product.name}</h3>
        <p className="mt-1 font-semibold text-indigo-600">ETB {product.price.toLocaleString()}</p>
      </div>
    </article>
  );
};

export default ProductCard;
