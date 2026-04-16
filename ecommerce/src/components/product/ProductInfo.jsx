export default function ProductInfo({ title, price, shortDescription, longDescription }) {
  return (
    <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-2xl font-semibold text-blue-700">${price.toFixed(2)}</p>
      <p className="text-base text-gray-600">{shortDescription}</p>
      <p className="leading-7 text-gray-700">{longDescription}</p>
    </section>
  );
}
