import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/mockData";
import heroImg from "@/assets/hero.jpg";
import catMen from "@/assets/category-men.jpg";
import catWomen from "@/assets/category-women.jpg";
import catAcc from "@/assets/category-accessories.jpg";

const categories = [
  { name: "Men", image: catMen },
  { name: "Women", image: catWomen },
  { name: "Accessories", image: catAcc },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative h-[85vh] overflow-hidden">
      <img src={heroImg} alt="Hero" className="w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-foreground/20" />
      <div className="absolute inset-0 flex items-center">
        <div className="container-shop">
          <div className="max-w-lg space-y-5 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-semibold text-background leading-tight">
              Less is More.
            </h1>
            <p className="text-background/80 text-lg">
              Timeless essentials designed for the modern individual.
            </p>
            <Link to="/shop" className="inline-block btn-primary-shop bg-background text-foreground hover:bg-background/90">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Categories */}
    <section className="container-shop py-16">
      <h2 className="text-2xl font-semibold mb-8">Shop by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link key={cat.name} to="/shop" className="group relative aspect-[3/4] rounded-lg overflow-hidden">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              width={640}
              height={800}
            />
            <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/20 transition-colors" />
            <div className="absolute bottom-6 left-6">
              <span className="bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                {cat.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>

    {/* Featured Products */}
    <section className="container-shop pb-16">
      <h2 className="text-2xl font-semibold mb-8">Featured Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  </Layout>
);

export default Index;
