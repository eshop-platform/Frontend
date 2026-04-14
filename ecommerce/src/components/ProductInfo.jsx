const ProductInfo = ({ title, price, shortDescription, longDescription }) => {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-2xl font-semibold text-indigo-600">ETB {price.toLocaleString()}</p>
      <p className="text-gray-700">{shortDescription}</p>
      <p className="leading-7 text-gray-600">{longDescription}</p>
    </section>
  );
};

export default ProductInfo;
