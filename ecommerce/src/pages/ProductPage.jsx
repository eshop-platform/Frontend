import { useState } from 'react';
import ProductImageGallery from '../components/ProductImageGallery';
import ProductInfo from '../components/ProductInfo';
import VariantSelector from '../components/VariantSelector';
import QuantityStepper from '../components/QuantityStepper';
import ReviewList from '../components/ReviewList';
import RelatedProducts from '../components/RelatedProducts';

const product = {
  title: 'Urban Trail Jacket',
  price: 7500,
  badge: 'Bestseller',
  inStock: true,
  shortDescription: 'Lightweight, weather-ready jacket designed for city streets and weekend hikes.',
  longDescription:
    'Built with breathable fabric and a water-resistant outer shell, this jacket keeps you comfortable from commute to adventure. The ergonomic fit, hidden pockets, and durable stitching make it an everyday staple for any active lifestyle.',
  images: [
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
    'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80',
  ],
};

const reviews = [
  { id: 1, user: 'Abebe T.', rating: 5, comment: 'Perfect fit and the material feels premium. Worth every birr!' },
  { id: 2, user: 'Tigist M.', rating: 4, comment: 'Great for Addis Abeba\'s cool mornings. Stylish and practical.' },
  { id: 3, user: 'Dawit A.', rating: 5, comment: 'Love the pockets and the lightweight feel. Highly recommend.' },
  { id: 4, user: 'Selam B.', rating: 4, comment: 'Comfortable all day and very easy to layer.' },
  { id: 5, user: 'Yohannes G.', rating: 5, comment: 'Top-notch quality. I bought one for my brother too.' },
  { id: 6, user: 'Hiwot K.', rating: 4, comment: 'Excellent jacket, fast delivery. Fits true to size.' },
];

const relatedProducts = [
  {
    id: 1,
    name: 'Summit Windbreaker',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80',
  },
  {
    id: 2,
    name: 'Metro Utility Vest',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&q=80',
  },
  {
    id: 3,
    name: 'Trail Cargo Pants',
    price: 3900,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80',
  },
  {
    id: 4,
    name: 'Compact Daypack',
    price: 3100,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
  },
  {
    id: 5,
    name: 'Classic Hoodie',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?w=400&q=80',
  },
  {
    id: 6,
    name: 'Trail Running Shoes',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
  },
  {
    id: 7,
    name: 'Outdoor Cap',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80',
  },
  {
    id: 8,
    name: 'Fleece Gloves',
    price: 950,
    image: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=400&q=80',
  },
];

const ProductPage = () => {
  const [size, setSize] = useState('M');
  const [color, setColor] = useState('Blue');
  const [material, setMaterial] = useState('Standard');
  const [quantity, setQuantity] = useState(1);

  const averageRating = reviews.length
    ? (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const decrementQuantity = () => setQuantity((current) => Math.max(1, current - 1));
  const incrementQuantity = () => setQuantity((current) => current + 1);

  const handleAddToCart = () => {
    alert(`Added ${quantity} item(s) - Size: ${size}, Color: ${color}, Material: ${material}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="grid gap-8 lg:grid-cols-2">
          <ProductImageGallery images={product.images} productName={product.title} />

          <div className="space-y-6">
            <ProductInfo
              title={product.title}
              price={product.price}
              badge={product.badge}
              inStock={product.inStock}
              shortDescription={product.shortDescription}
              longDescription={product.longDescription}
            />

            <VariantSelector
              label="Size"
              options={['S', 'M', 'L']}
              selectedValue={size}
              onSelect={setSize}
            />

            <VariantSelector
              label="Color"
              options={['Red', 'Blue', 'Black']}
              selectedValue={color}
              onSelect={setColor}
            />

            <VariantSelector
              label="Material"
              options={['Standard', 'Recycled']}
              selectedValue={material}
              onSelect={setMaterial}
            />

            <QuantityStepper
              quantity={quantity}
              onDecrease={decrementQuantity}
              onIncrease={incrementQuantity}
            />

            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Add to Cart
            </button>
          </div>
        </section>

        <ReviewList averageRating={averageRating} reviews={reviews} />

        <RelatedProducts products={relatedProducts} />
      </div>
    </main>
  );
};

export default ProductPage;
