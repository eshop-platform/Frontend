const ProductInfo = ({ title, price, badge, inStock, shortDescription, longDescription }) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {badge && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
            {badge}
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <p className="text-2xl font-semibold text-indigo-600">ETB {price.toLocaleString()}</p>
        {inStock !== undefined && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        )}
      </div>
      <p className="text-gray-700">{shortDescription}</p>
      <p className="leading-7 text-gray-600">{longDescription}</p>
    </section>
  );
};

export default ProductInfo;
