import { menProducts, womenProducts } from './newProducts';
import { extraProducts } from './extraProducts';

const coreProducts = [
  {
    id: 1,
    name: 'Cloud Comfort Runner',
    price: 1850,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A lightweight daily runner with a breathable mesh upper, responsive midsole, and all-day comfort for city movement.',
    colors: ['Phantom Black', 'Ghost White', 'Midnight Blue'],
    sizes: ['7', '8', '9', '10', '11'],
    stock: 18,
    isNew: true,
    onSale: false,
    bestSeller: true,
    rating: 4.8,
    reviewCount: 126,
    tags: ['running', 'sneakers', 'comfort', 'urban'],
    reviews: [
      { id: '1-a', author: 'Maya R.', rating: 5, title: 'Comfort all day', body: 'The cushioning is soft without feeling unstable. Great for commuting and long walks.' },
      { id: '1-b', author: 'Jordan P.', rating: 4, title: 'Excellent daily pair', body: 'Clean look, breathable upper, and the fit was true to size.' }
    ]
  },
  {
    id: 2,
    name: 'Minimalist Leather Watch',
    price: 2800,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A slim premium leather watch with a brushed steel case and understated dial made for everyday wear.',
    colors: ['Tan', 'Black', 'Espresso'],
    sizes: ['40mm', '42mm'],
    stock: 11,
    isNew: true,
    onSale: false,
    bestSeller: false,
    rating: 4.7,
    reviewCount: 84,
    tags: ['watch', 'leather', 'minimal', 'timepiece'],
    reviews: [
      { id: '2-a', author: 'Chris L.', rating: 5, title: 'Sharp and understated', body: 'Looks more expensive than it is. The strap softened nicely after a week.' },
      { id: '2-b', author: 'Anita K.', rating: 4, title: 'Great finish', body: 'Very clean dial and easy to pair with office outfits.' }
    ]
  },
  {
    id: 3,
    name: 'Urban Tech Backpack',
    price: 1450,
    category: 'Gear',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A structured commuter backpack with padded laptop storage, waterproof fabric, and modular organization inside.',
    colors: ['Slate', 'Forest', 'Black'],
    sizes: ['20L', '28L'],
    stock: 24,
    isNew: true,
    onSale: false,
    bestSeller: true,
    rating: 4.9,
    reviewCount: 211,
    tags: ['backpack', 'travel', 'commute', 'laptop'],
    reviews: [
      { id: '3-a', author: 'Elias T.', rating: 5, title: 'Built for commuting', body: 'The internal organization is excellent and the waterproof shell held up in rain.' },
      { id: '3-b', author: 'Sofia N.', rating: 5, title: 'Laptop carry solved', body: 'Comfortable straps and enough room for daily gear without feeling bulky.' }
    ]
  },
  {
    id: 4,
    name: 'Studio ANC Headphones',
    price: 4500,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Over-ear wireless headphones with adaptive noise cancelling, plush memory foam, and a detailed studio-tuned sound profile.',
    colors: ['Matte Black', 'Silver Mist', 'Sand'],
    sizes: ['Standard'],
    stock: 9,
    isNew: false,
    onSale: true,
    bestSeller: true,
    rating: 4.8,
    reviewCount: 173,
    tags: ['headphones', 'audio', 'wireless', 'noise cancelling'],
    reviews: [
      { id: '4-a', author: 'Leo D.', rating: 5, title: 'Excellent isolation', body: 'Noise cancelling is strong and the ear cups stay comfortable on long flights.' },
      { id: '4-b', author: 'Priya V.', rating: 4, title: 'Balanced sound', body: 'Clear vocals and good bass without sounding muddy.' }
    ]
  },
  {
    id: 5,
    name: 'Meridian Wool Coat',
    price: 3600,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A tailored wool blend coat designed for layering, clean lines, and cold-weather versatility.',
    colors: ['Camel', 'Charcoal', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 7,
    isNew: false,
    onSale: false,
    bestSeller: false,
    rating: 4.6,
    reviewCount: 52,
    tags: ['coat', 'outerwear', 'wool', 'tailored'],
    reviews: [
      { id: '5-a', author: 'Grace W.', rating: 5, title: 'Polished fit', body: 'Feels structured but still comfortable over knitwear.' },
      { id: '5-b', author: 'Nadia H.', rating: 4, title: 'Warm and clean lines', body: 'A solid winter coat with a refined silhouette.' }
    ]
  },
  {
    id: 6,
    name: 'Aero Shell Jacket',
    price: 2400,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A water-resistant technical shell with lightweight insulation and a streamlined silhouette.',
    colors: ['Ice Gray', 'Graphite', 'Olive'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 13,
    isNew: true,
    onSale: false,
    bestSeller: false,
    rating: 4.5,
    reviewCount: 66,
    tags: ['jacket', 'shell', 'weather', 'technical'],
    reviews: [
      { id: '6-a', author: 'Theo S.', rating: 4, title: 'Good weather layer', body: 'Lightweight and easy to pack. The cut looks sharp in person.' },
      { id: '6-b', author: 'Nina F.', rating: 5, title: 'Useful every week', body: 'I wear it for travel and rainy commutes. Very versatile.' }
    ]
  },
  {
    id: 7,
    name: 'Contour Desk Lamp',
    price: 1200,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A dimmable aluminum desk lamp with warm LED lighting and a minimal pivoting arm.',
    colors: ['Ivory', 'Black', 'Stone'],
    sizes: ['Standard'],
    stock: 20,
    isNew: false,
    onSale: true,
    bestSeller: false,
    rating: 4.4,
    reviewCount: 41,
    tags: ['lamp', 'desk', 'lighting', 'home'],
    reviews: [
      { id: '7-a', author: 'Dev M.', rating: 4, title: 'Clean desk upgrade', body: 'The warm tone is great for late-night work and the dimmer is responsive.' },
      { id: '7-b', author: 'Olivia B.', rating: 4, title: 'Minimal and useful', body: 'Looks tidy on the desk and does not take much space.' }
    ]
  },
  {
    id: 8,
    name: 'Nomad Travel Mug',
    price: 480,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A double-wall stainless steel travel mug that keeps drinks hot and your commute spill-free.',
    colors: ['Sand', 'Coal', 'Terracotta'],
    sizes: ['12oz', '16oz'],
    stock: 30,
    isNew: false,
    onSale: false,
    bestSeller: true,
    rating: 4.7,
    reviewCount: 148,
    tags: ['mug', 'travel', 'coffee', 'stainless steel'],
    reviews: [
      { id: '8-a', author: 'Harper G.', rating: 5, title: 'No leaks', body: 'Easy to carry and actually seals properly in a bag.' },
      { id: '8-b', author: 'Sam Q.', rating: 4, title: 'Keeps drinks hot', body: 'Heat retention is strong and the finish still looks good after weeks of use.' }
    ]
  },
  {
    id: 9,
    name: 'Vertex Knit Sweater',
    price: 1350,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A soft textured knit sweater with a relaxed drape and clean ribbed finishing.',
    colors: ['Oatmeal', 'Coal', 'Sage'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 15,
    isNew: true,
    onSale: false,
    bestSeller: false,
    rating: 4.5,
    reviewCount: 63,
    tags: ['sweater', 'knit', 'layering', 'soft'],
    reviews: [
      { id: '9-a', author: 'Mila C.', rating: 5, title: 'Soft knit', body: 'Comfortable enough to wear all day and easy to layer with a coat.' },
      { id: '9-b', author: 'Ben A.', rating: 4, title: 'Great texture', body: 'Looks elevated without being fussy.' }
    ]
  },
  {
    id: 10,
    name: 'Parallel Cargo Pant',
    price: 1680,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506629905607-d9e2a4c1d2c3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Modern tapered cargo pants with stretch twill, utility pockets, and a clean tailored finish.',
    colors: ['Khaki', 'Black', 'Olive'],
    sizes: ['30', '32', '34', '36'],
    stock: 14,
    isNew: false,
    onSale: true,
    bestSeller: false,
    rating: 4.6,
    reviewCount: 77,
    tags: ['pants', 'cargo', 'utility', 'twill'],
    reviews: [
      { id: '10-a', author: 'Aiden J.', rating: 5, title: 'Modern utility', body: 'The pockets are useful without ruining the shape.' },
      { id: '10-b', author: 'Rae T.', rating: 4, title: 'Good structure', body: 'Comfortable fabric and the taper works with sneakers or boots.' }
    ]
  },
  {
    id: 11,
    name: 'Orbit Smart Speaker',
    price: 2200,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512446816042-444d64126727?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A room-filling smart speaker with rich bass, clear voice pickup, and seamless wireless playback.',
    colors: ['Fog', 'Charcoal'],
    sizes: ['Standard'],
    stock: 16,
    isNew: true,
    onSale: false,
    bestSeller: true,
    rating: 4.8,
    reviewCount: 138,
    tags: ['speaker', 'smart home', 'audio', 'wireless'],
    reviews: [
      { id: '11-a', author: 'Noah E.', rating: 5, title: 'Room-filling sound', body: 'Pairs quickly and delivers surprisingly strong bass for the size.' },
      { id: '11-b', author: 'Lena P.', rating: 4, title: 'Easy setup', body: 'Great for background music and voice controls are reliable.' }
    ]
  },
  {
    id: 12,
    name: 'Frame Blue-Light Glasses',
    price: 980,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Lightweight acetate frames with blue-light filtering lenses built for long hours in front of screens.',
    colors: ['Clear', 'Tortoise', 'Black'],
    sizes: ['Standard'],
    stock: 22,
    isNew: false,
    onSale: false,
    bestSeller: false,
    rating: 4.3,
    reviewCount: 58,
    tags: ['glasses', 'eyewear', 'blue light', 'screen'],
    reviews: [
      { id: '12-a', author: 'Ivy M.', rating: 4, title: 'Comfortable frames', body: 'Lightweight enough for long work sessions and the styling is subtle.' },
      { id: '12-b', author: 'Marco S.', rating: 4, title: 'Looks good on camera', body: 'Great everyday desk accessory and doesn not feel flimsy.' }
    ]
  },
  {
    id: 13,
    name: 'Summit Trail Bottle',
    price: 420,
    category: 'Gear',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'An insulated carry bottle that keeps water cold for hours and fits easily in a side pocket.',
    colors: ['Glacier', 'Onyx', 'Moss'],
    sizes: ['18oz', '24oz'],
    stock: 27,
    isNew: true,
    onSale: false,
    bestSeller: false,
    rating: 4.5,
    reviewCount: 93,
    tags: ['bottle', 'hydration', 'outdoor', 'insulated'],
    reviews: [
      { id: '13-a', author: 'Ty H.', rating: 5, title: 'Reliable carry bottle', body: 'Keeps water cold through a full workday and feels sturdy.' },
      { id: '13-b', author: 'Rina K.', rating: 4, title: 'Simple and durable', body: 'Great lid design and easy to clean.' }
    ]
  },
  {
    id: 14,
    name: 'Axis Wireless Charger',
    price: 780,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A weighted wireless charging pad with fast charging support and a soft-touch finish.',
    colors: ['Black', 'Stone'],
    sizes: ['Standard'],
    stock: 19,
    isNew: false,
    onSale: true,
    bestSeller: false,
    rating: 4.4,
    reviewCount: 47,
    tags: ['charger', 'wireless', 'phone', 'desk'],
    reviews: [
      { id: '14-a', author: 'Evan C.', rating: 4, title: 'Solid desk charger', body: 'The base stays put and the finish does not pick up fingerprints badly.' },
      { id: '14-b', author: 'Mia Y.', rating: 4, title: 'Works as expected', body: 'Good charging speed and looks tidy on a nightstand.' }
    ]
  },
  {
    id: 15,
    name: 'Lumen Table Clock',
    price: 880,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A compact brushed-metal table clock with silent movement and a crisp minimalist face.',
    colors: ['Brass', 'Black', 'Silver'],
    sizes: ['Standard'],
    stock: 12,
    isNew: false,
    onSale: false,
    bestSeller: false,
    rating: 4.2,
    reviewCount: 29,
    tags: ['clock', 'desk', 'home decor', 'minimal'],
    reviews: [
      { id: '15-a', author: 'Helen U.', rating: 4, title: 'Nice desk detail', body: 'Silent movement is the real win here. Looks clean without distracting.' },
      { id: '15-b', author: 'Kai J.', rating: 4, title: 'Simple accent', body: 'Good scale for a shelf or bedside table.' }
    ]
  },
  {
    id: 16,
    name: 'Drift Everyday Tee',
    price: 640,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A premium cotton jersey tee with a structured fit, soft wash, and easy everyday drape.',
    colors: ['White', 'Black', 'Clay'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 25,
    isNew: true,
    onSale: false,
    bestSeller: true,
    rating: 4.7,
    reviewCount: 164,
    tags: ['tshirt', 'tee', 'cotton', 'basics'],
    reviews: [
      { id: '16-a', author: 'Luca D.', rating: 5, title: 'Better than basic', body: 'The fabric weight is excellent and the cut feels intentional.' },
      { id: '16-b', author: 'Sara F.', rating: 4, title: 'Great staple', body: 'Easy fit and washes well.' }
    ]
  },
  {
    id: 17,
    name: 'Pulse Knit Trainer',
    price: 2050,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1465453869711-7e174808ace9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A flexible knit trainer with a supportive heel cage and responsive everyday cushioning.',
    colors: ['Ash', 'Black', 'Cobalt'],
    sizes: ['7', '8', '9', '10', '11'],
    stock: 20,
    isNew: true,
    onSale: false,
    bestSeller: false,
    rating: 4.6,
    reviewCount: 88,
    tags: ['trainer', 'footwear', 'knit', 'sport'],
    reviews: [
      { id: '17-a', author: 'Mason T.', rating: 5, title: 'Springy feel', body: 'The upper hugs the foot nicely and feels quick on daily errands.' },
      { id: '17-b', author: 'Keira V.', rating: 4, title: 'Good lightweight option', body: 'Comfortable straight out of the box.' }
    ]
  },
  {
    id: 18,
    name: 'Field Utility Vest',
    price: 1800,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A lightweight utility vest with secure pockets and a clean layering profile.',
    colors: ['Stone', 'Black', 'Olive'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 10,
    isNew: true,
    onSale: false,
    bestSeller: false,
    rating: 4.4,
    reviewCount: 36,
    tags: ['vest', 'utility', 'layering', 'apparel'],
    reviews: [
      { id: '18-a', author: 'Cleo A.', rating: 4, title: 'Useful pockets', body: 'Nice transitional piece when a jacket is too much.' },
      { id: '18-b', author: 'Jon K.', rating: 4, title: 'Good layering weight', body: 'Easy to wear over tees and knitwear.' }
    ]
  },
  {
    id: 19,
    name: 'Atlas Weekend Duffel',
    price: 2300,
    category: 'Gear',
    image: 'https://images.unsplash.com/photo-1553531889-56cc480ac5cb?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1553531889-56cc480ac5cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A structured duffel with durable handles, shoe compartment, and roomy interior for short trips.',
    colors: ['Espresso', 'Black', 'Stone'],
    sizes: ['32L'],
    stock: 8,
    isNew: false,
    onSale: false,
    bestSeller: true,
    rating: 4.8,
    reviewCount: 91,
    tags: ['duffel', 'travel', 'weekend', 'bag'],
    reviews: [
      { id: '19-a', author: 'Dylan M.', rating: 5, title: 'Perfect carry size', body: 'Fits a weekend wardrobe easily and the materials feel durable.' },
      { id: '19-b', author: 'Piper J.', rating: 4, title: 'Premium feel', body: 'Strong hardware and the shoe section is genuinely useful.' }
    ]
  },
  {
    id: 20,
    name: 'Breeze Linen Shirt',
    price: 1150,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A breathable linen shirt with an easy drape and crisp collar for warm-weather layering.',
    colors: ['Sky', 'White', 'Sand'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 17,
    isNew: true,
    onSale: true,
    bestSeller: false,
    rating: 4.5,
    reviewCount: 57,
    tags: ['linen', 'shirt', 'summer', 'breathable'],
    reviews: [
      { id: '20-a', author: 'Emma B.', rating: 5, title: 'Great summer shirt', body: 'Lightweight fabric and a nice relaxed fit.' },
      { id: '20-b', author: 'Cole W.', rating: 4, title: 'Easy warm-weather piece', body: 'Looks great open over a tee or buttoned up.' }
    ]
  },
  {
    id: 21,
    name: 'Halo Bedside Speaker',
    price: 1350,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512446816042-444d64126727?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A compact bedside speaker with Bluetooth playback, ambient lighting, and a simple tactile interface.',
    colors: ['Moon', 'Graphite'],
    sizes: ['Standard'],
    stock: 14,
    isNew: false,
    onSale: false,
    bestSeller: false,
    rating: 4.3,
    reviewCount: 33,
    tags: ['speaker', 'bedside', 'tech', 'bluetooth'],
    reviews: [
      { id: '21-a', author: 'Rosa C.', rating: 4, title: 'Nice nightstand piece', body: 'Good for casual listening and the footprint is small.' },
      { id: '21-b', author: 'Drew P.', rating: 4, title: 'Easy controls', body: 'Pairs quickly and is simple to use half asleep.' }
    ]
  },
  {
    id: 22,
    name: 'Signal Crossbody Pack',
    price: 1050,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1553531889-56cc480ac5cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A compact crossbody pack with quick-access pockets and a clean urban profile.',
    colors: ['Black', 'Clay', 'Navy'],
    sizes: ['Standard'],
    stock: 21,
    isNew: true,
    onSale: false,
    bestSeller: false,
    rating: 4.4,
    reviewCount: 49,
    tags: ['crossbody', 'bag', 'accessories', 'carry'],
    reviews: [
      { id: '22-a', author: 'Ava L.', rating: 5, title: 'Great daily carry', body: 'Fits essentials cleanly and stays close to the body.' },
      { id: '22-b', author: 'Zane R.', rating: 4, title: 'Useful city bag', body: 'Simple design with enough internal organization.' }
    ]
  },
  {
    id: 23,
    name: 'Arc Ceramic Vase',
    price: 820,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A sculptural ceramic vase with a matte finish designed to add soft structure to shelves and tables.',
    colors: ['Ivory', 'Sand', 'Charcoal'],
    sizes: ['Medium'],
    stock: 18,
    isNew: true,
    onSale: false,
    bestSeller: false,
    rating: 4.6,
    reviewCount: 24,
    tags: ['vase', 'ceramic', 'decor', 'home'],
    reviews: [
      { id: '23-a', author: 'Lily N.', rating: 5, title: 'Beautiful shape', body: 'Looks strong on its own and even better with branches.' },
      { id: '23-b', author: 'Miles F.', rating: 4, title: 'Nice texture', body: 'The matte finish feels premium and photographs well.' }
    ]
  },
  {
    id: 24,
    name: 'Northline Beanie',
    price: 520,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A soft rib-knit beanie with a clean cuff and enough stretch for everyday cold-weather wear.',
    colors: ['Heather Gray', 'Black', 'Rust'],
    sizes: ['One Size'],
    stock: 32,
    isNew: false,
    onSale: true,
    bestSeller: true,
    rating: 4.8,
    reviewCount: 118,
    tags: ['beanie', 'winter', 'accessories', 'knit'],
    reviews: [
      { id: '24-a', author: 'Nora S.', rating: 5, title: 'Perfect everyday beanie', body: 'Soft, warm, and not too tight. I ended up buying a second color.' },
      { id: '24-b', author: 'Victor D.', rating: 5, title: 'Simple and warm', body: 'Exactly what I wanted for winter commuting.' }
    ]
  }
];

export const products = [...coreProducts, ...menProducts, ...womenProducts, ...extraProducts];

export const getProductById = (id) => products.find((product) => product.id === Number(id));

export const categories = ['All', "Men's", "Women's", ...new Set(coreProducts.map((p) => p.category)), 'Electronics', 'Sports', 'Beauty', 'Kids', 'Furniture', 'Jewelry', 'Food & Drink', 'Books'];

export const categoryGroups = [
  { title: 'Shop by Gender', items: ['men', 'women'] },
  { title: 'Fashion', items: [...new Set(coreProducts.map((p) => p.category))] },
  { title: 'Lifestyle', items: ['Electronics', 'Sports', 'Beauty', 'Furniture', 'Food & Drink'] },
  { title: 'More', items: ['Kids', 'Jewelry', 'Books'] },
  { title: 'Collections', items: ['new', 'sale', 'best-sellers'] }
];
