import productMain from "@/assets/product-main.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";
import product9 from "@/assets/product-9.jpg";
import product10 from "@/assets/product-10.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  catchphrase?: string;
  description?: string;
  category?: string;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
}

export const mainProduct: Product = {
  id: "main",
  name: "The Essential Backpack",
  price: 189,
  image: productMain,
  catchphrase: "Crafted for the modern minimalist.",
  description:
    "Our signature leather backpack combines timeless design with everyday functionality. Made from premium full-grain leather with a water-resistant lining, padded laptop sleeve, and organizer pockets. The clean silhouette pairs effortlessly with any look — from the office to the weekend.",
  category: "Accessories",
  badge: "Bestseller",
};

export const products: Product[] = [
  {
    id: "main",
    name: "The Essential Backpack",
    price: 189,
    image: productMain,
    category: "Accessories",
    catchphrase: "Crafted for the modern minimalist.",
    description:
      "Our signature leather backpack combines timeless design with everyday functionality. Made from premium full-grain leather with a water-resistant lining, padded laptop sleeve, and organizer pockets.",
    badge: "Bestseller",
  },
  {
    id: "1",
    name: "Classic Sneakers",
    price: 129,
    image: product1,
    category: "Men",
    catchphrase: "Effortless style, every step.",
    description:
      "Premium leather low-tops with a cushioned insole and rubber sole. Designed to pair with everything in your wardrobe.",
  },
  {
    id: "2",
    name: "Minimal Tote",
    price: 95,
    image: product2,
    category: "Women",
    catchphrase: "Carry the essentials, beautifully.",
    description:
      "Soft-structured canvas tote with leather handles and an interior zip pocket. Spacious enough for daily life.",
    badge: "New",
  },
  {
    id: "3",
    name: "Noir Sunglasses",
    price: 165,
    image: product3,
    category: "Accessories",
    catchphrase: "Iconic shape. Timeless presence.",
    description:
      "Acetate frames with polarized lenses and 100% UV protection. Includes a soft case and cleaning cloth.",
  },
  {
    id: "4",
    name: "Bomber Jacket",
    price: 245,
    image: product4,
    category: "Men",
    catchphrase: "A modern take on a classic silhouette.",
    description:
      "Lightweight technical fabric with a satin lining, ribbed cuffs, and a relaxed fit. Built for cool evenings.",
  },
  {
    id: "5",
    name: "Ceramic Mug",
    price: 28,
    image: product5,
    category: "Accessories",
    catchphrase: "Slow mornings, made better.",
    description:
      "Hand-glazed stoneware mug with a comfortable handle. Microwave and dishwasher safe.",
  },
  {
    id: "6",
    name: "Heritage Watch",
    price: 320,
    image: product6,
    category: "Accessories",
    catchphrase: "Time, refined.",
    description:
      "Stainless steel case with sapphire crystal and Italian leather strap. Swiss quartz movement.",
    badge: "New",
  },
  {
    id: "7",
    name: "Cashmere Sweater",
    price: 215,
    image: product7,
    category: "Women",
    catchphrase: "Quiet luxury, everyday comfort.",
    description:
      "100% Mongolian cashmere knit with a relaxed crewneck. Soft, warm, and built to last.",
  },
  {
    id: "8",
    name: "Leather Wallet",
    price: 89,
    image: product8,
    category: "Men",
    catchphrase: "Slim, smart, essential.",
    description:
      "Full-grain leather bifold with six card slots and a billfold compartment. Ages beautifully with use.",
  },
  {
    id: "9",
    name: "Wool Fedora",
    price: 110,
    image: product9,
    category: "Accessories",
    catchphrase: "A finishing touch.",
    description:
      "Crushable wool felt fedora with a grosgrain band. Travel-friendly and effortlessly cool.",
  },
  {
    id: "10",
    name: "Silk Blouse",
    price: 175,
    image: product10,
    category: "Women",
    catchphrase: "Soft, structured, statement-ready.",
    description:
      "100% mulberry silk with a relaxed cut and mother-of-pearl buttons. A wardrobe foundation.",
  },
];

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const reviews: Review[] = [
  { id: "1", username: "Alex M.", rating: 5, comment: "Incredible quality. The leather just gets better with age. Worth every penny." },
  { id: "2", username: "Jordan K.", rating: 4, comment: "Beautiful design and very spacious. Wish it had a water bottle pocket, but otherwise perfect." },
  { id: "3", username: "Sam T.", rating: 5, comment: "I get compliments on this bag every single day. The craftsmanship is top-notch." },
];
