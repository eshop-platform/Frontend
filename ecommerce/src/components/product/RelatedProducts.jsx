import { Link } from "react-router-dom";

export default function RelatedProducts({ products }) {
  return (
    <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900">Related Products</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="overflow-hidden rounded-xl border border-gray-200 transition hover:shadow-md"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-cover"
            />
            <div className="space-y-1 p-3">
              <p className="font-medium text-gray-900">{product.title}</p>
              <p className="text-blue-700">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
