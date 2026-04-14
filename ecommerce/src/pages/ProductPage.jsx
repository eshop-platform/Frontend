import { useState } from 'react';
import ProductImageGallery from '../components/ProductImageGallery';
import ProductInfo from '../components/ProductInfo';
import VariantSelector from '../components/VariantSelector';
import QuantityStepper from '../components/QuantityStepper';
import ReviewList from '../components/ReviewList';
import RelatedProducts from '../components/RelatedProducts';

const makeImage = (label, color) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='${color}'/><stop offset='100%' stop-color='#111827'/></linearGradient></defs><rect width='100%' height='100%' fill='url(#g)'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='44' fill='white'>${label}</text></svg>`)}`;

const product = {
  title: 'Urban Trail Jacket',
  price: 129.99,
  shortDescription: 'Lightweight, weather-ready jacket designed for city streets and weekend hikes.',
  longDescription:
    'Built with breathable fabric and a water-resistant outer shell, this jacket keeps you comfortable from commute to adventure. The ergonomic fit, hidden pockets, and durable stitching make it an everyday staple.',
  images: [
    makeImage('Front View', '#2563eb'),
    makeImage('Back View', '#0d9488'),
    makeImage('Detail Shot', '#7c3aed'),
    makeImage('Lifestyle', '#ea580c'),
  ],
};

const reviews = [
  { id: 1, user: 'Mia R.', rating: 5, comment: 'Perfect fit and the material feels premium.' },
  { id: 2, user: 'Jordan T.', rating: 4, comment: 'Great for windy days. Stylish and practical.' },
  { id: 3, user: 'Alex P.', rating: 5, comment: 'Love the pockets and lightweight feel.' },
  { id: 4, user: 'Sam K.', rating: 4, comment: 'Comfortable all day and easy to layer.' },
];

const relatedProducts = [
  { id: 1, name: 'Summit Windbreaker', price: 89.99, image: makeImage('Windbreaker', '#1d4ed8') },
  { id: 2, name: 'Metro Utility Vest', price: 74.99, image: makeImage('Utility Vest', '#0369a1') },
  { id: 3, name: 'Trail Cargo Pants', price: 69.99, image: makeImage('Cargo Pants', '#16a34a') },
  { id: 4, name: 'Compact Daypack', price: 54.99, image: makeImage('Daypack', '#9333ea') },
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
