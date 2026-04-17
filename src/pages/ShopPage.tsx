import { useState } from "react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/mockData";

const categories = ["All", "Men", "Women", "Accessories"];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 – $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
];

const ShopPage = () => {
  const [category, setCategory] = useState("All");
  const [priceIdx, setPriceIdx] = useState(0);

  const filtered = products.filter((p) => {
    const catMatch = category === "All" || p.category === category;
    const range = priceRanges[priceIdx];
    const priceMatch = p.price >= range.min && p.price < range.max;
    return catMatch && priceMatch;
  });

  return (
    <Layout>
      <div className="container-shop py-10">
        <h1 className="text-3xl font-semibold mb-8">Shop All</h1>
        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <aside className="md:w-56 shrink-0 space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Category</h3>
              <div className="space-y-1.5">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`block w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                      category === c ? "bg-secondary font-medium" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-3">Price</h3>
              <div className="space-y-1.5">
                {priceRanges.map((r, i) => (
                  <button
                    key={r.label}
                    onClick={() => setPriceIdx(i)}
                    className={`block w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                      priceIdx === i ? "bg-secondary font-medium" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <p className="text-muted-foreground py-20 text-center">No products match your filters.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;
