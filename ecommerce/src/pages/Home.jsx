import { Link } from "react-router-dom";
import { useStore } from "../store/useStore";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import { Button } from "../components/ui/button";// shadcn component

const BEST_SELLERS = [
  { id: 1, name: "Wireless Earbuds", price: 89, image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400", category: "Electronics" },
  { id: 3, name: "Smart Watch", price: 150, image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=400", category: "Electronics" },
  { id: 17, name: "Running Shoes", price: 120, image: "https://images.unsplash.com/photo-1528701800489-20be3c7f8a5c?w=400", category: "Shoes" },
];

const NEW_ARRIVALS = [
  { id: 33, name: "Classic Watch", price: 120, image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400", category: "Watches" },
  { id: 52, name: "Gaming Controller", price: 80, image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f?w=400", category: "Video Games" },
  { id: 58, name: "Modern Sofa", price: 600, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400", category: "Furniture" },
];

export default function Home() {
  const { wishlist, toggleWishlist } = useStore();

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1600" 
            className="w-full h-full object-cover brightness-[0.4]" 
            alt="Hero"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl px-6 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Welcome to Our Store
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the future of shopping. From high-end electronics to 
            sustainable fashion, find everything you need to elevate your lifestyle.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg">
              <Link to="/shop">Shop Now</Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg bg-transparent text-white border-white hover:bg-white hover:text-black">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 w-full space-y-24">
        {/* --- CATEGORY SECTION --- */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Shop by Category</h2>
              <p className="text-muted-foreground">Find exactly what you're looking for</p>
            </div>
          </div>
          <CategoryFilter />
        </section>

        {/* --- BEST SELLERS --- */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Best Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {BEST_SELLERS.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                wishlist={wishlist} 
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        </section>

        {/* --- NEW ARRIVALS --- */}
        <section className="bg-slate-50 -mx-4 px-4 py-16 sm:-mx-8 sm:px-8 rounded-3xl">
          <h2 className="text-3xl font-bold mb-8">New Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {NEW_ARRIVALS.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                wishlist={wishlist} 
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        </section>

        {/* --- POPULAR CATEGORIES (Visual Grid) --- */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Electronics", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400" },
              { name: "Clothes", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400" },
              { name: "Shoes", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
              { name: "Accessories", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" }
            ].map((item) => (
              <div key={item.name} className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <h3 className="text-xl font-bold text-white">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}