const ProductCard = ({ product }) => {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <img src={product.image} alt={product.name} className="h-36 w-full object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-indigo-600 font-semibold">${product.price.toFixed(2)}</p>
      </div>
    </article>
  );
};

export default ProductCard;
