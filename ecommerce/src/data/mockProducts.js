export const products = [
  {
    id: "1",
    title: "Classic Cotton Overshirt",
    price: 69.99,
    shortDescription: "A clean everyday overshirt with premium cotton comfort.",
    longDescription:
      "Designed for daily wear, this classic cotton overshirt offers a breathable feel, structured silhouette, and easy layering across seasons. It pairs with jeans, trousers, or skirts and is tailored for a polished casual look.",
    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=80",
    ],
    sizes: ["S", "M", "L"],
    colors: ["Red", "Blue", "Black"],
    reviews: [
      {
        id: 1,
        user: "Alem T.",
        rating: 5,
        comment: "Excellent fit and quality. Looks even better in person.",
      },
      {
        id: 2,
        user: "Noah R.",
        rating: 4,
        comment: "Great fabric and style. Delivery was quick.",
      },
      {
        id: 3,
        user: "Sara K.",
        rating: 4,
        comment: "Comfortable and easy to pair with other outfits.",
      },
      {
        id: 4,
        user: "Miki B.",
        rating: 5,
        comment: "One of my favorite wardrobe picks this season.",
      },
    ],
  },
  {
    id: "2",
    title: "Minimal Linen Shirt",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Urban Denim Jacket",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    title: "Tailored Chino Pants",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    title: "Soft Knit Sweater",
    price: 54.99,
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
  },
];

export const getProductById = (id) =>
  products.find((product) => product.id === id) || products[0];
