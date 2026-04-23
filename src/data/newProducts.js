// Men's products: IDs 25-34
// Women's products: IDs 35-44

export const menProducts = [
  {
    id: 25,
    name: 'Oxford Slim Chino',
    price: 98,
    category: "Men's",
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506629905607-d9e2a4c1d2c3?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A tailored slim-fit chino in stretch cotton twill. Clean lines, versatile color palette, and a comfortable waistband for all-day wear.',
    colors: ['Navy', 'Khaki', 'Charcoal', 'Olive'],
    sizes: ['28', '30', '32', '34', '36'],
    stock: 22,
    isNew: true,
    onSale: false,
    bestSeller: true,
    rating: 4.7,
    reviewCount: 143,
    tags: ['chino', 'pants', 'men', 'slim', 'office'],
    reviews: [
      { id: '25-a', author: 'James K.', rating: 5, title: 'Perfect office trouser', body: 'Great fit and the stretch fabric makes them comfortable all day.' },
      { id: '25-b', author: 'Ryan M.', rating: 4, title: 'Clean and versatile', body: 'Works with sneakers or dress shoes. Solid everyday pant.' }
    ]
  },
  {
    id: 26,
    name: 'Structured Oxford Shirt',
    price: 84,
    category: "Men's",
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A classic Oxford weave button-down with a modern slim cut. Wrinkle-resistant fabric that goes from desk to dinner.',
    colors: ['White', 'Light Blue', 'Pale Pink', 'Slate'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 18,
    isNew: true,
    onSale: false,
    bestSeller: false,
    rating: 4.6,
    reviewCount: 97,
    tags: ['shirt', 'oxford', 'men', 'button-down', 'office'],
    reviews: [
      { id: '26-a', author: 'Tom B.', rating: 5, title: 'Best Oxford I own', body: 'The fabric is crisp but not stiff. Looks sharp tucked or untucked.' },
      { id: '26-b', author: 'Alex P.', rating: 4, title: 'Great everyday shirt', body: 'Holds its shape well after washing. True to size.' }
    ]
  },
  {
    id: 27,
    name: 'Merino Crew Sweater',
    price: 128,
    category: "Men's",
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A fine-gauge merino wool crew neck with a clean ribbed finish. Naturally temperature-regulating and soft against the skin.',
    colors: ['Navy', 'Camel', 'Charcoal', 'Forest'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 14,
    isNew: false,
    onSale: false,
    bestSeller: true,
    rating: 4.8,
    reviewCount: 112,
    tags: ['sweater', 'merino', 'men', 'wool', 'crew neck'],
    reviews: [
      { id: '27-a', author: 'Daniel H.', rating: 5, title: 'Luxury feel at a fair price', body: 'Incredibly soft and the fit is exactly right — not boxy, not tight.' },
      { id: '27-b', author: 'Chris W.', rating: 5, title: 'My go-to winter layer', body: 'Warm without being bulky. Pairs with everything.' }
    ]
  },
  {
    id: 28,
    name: 'Leather Derby Shoe',
    price: 195,
    category: "Men's",
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A full-grain leather derby with a cushioned insole and durable rubber sole. Polished enough for the office, relaxed enough for weekends.',
    colors: ['Tan', 'Black', 'Espresso'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    stock: 10,
    isNew: false,
    onSale: true,
    bestSeller: false,
    rating: 4.7,
    reviewCount: 68,
    tags: ['shoes', 'leather', 'men', 'derby', 'formal'],
    reviews: [
      { id: '28-a', author: 'Marcus L.', rating: 5, title: 'Excellent quality leather', body: 'The leather is thick and the sole is solid. These will last years.' },
      { id: '28-b', author: 'Oliver T.', rating: 4, title: 'Smart and comfortable', body: 'Comfortable from day one, which is rare for leather shoes.' }
    ]
  },
  {
    id: 29,
    name: 'Bomber Jacket',
    price: 178,
    category: "Men's",
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A clean satin bomber with ribbed cuffs, a minimal silhouette, and a subtle sheen. The kind of jacket that elevates any outfit.',
    colors: ['Black', 'Olive', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 12,
    isNew: true,
    onSale: false,
    bestSeller: true,
    rating: 4.6,
    reviewCount: 89,
    tags: ['jacket', 'bomber', 'men', 'outerwear'],
    reviews: [
      { id: '29-a', author: 'Jake S.', rating: 5, title: 'Sleek and versatile', body: 'Looks great over a hoodie or a plain tee. The fit is spot on.' },
      { id: '29-b', author: 'Noah C.', rating: 4, title: 'Great everyday jacket', body: 'Lightweight enough for spring and fall. Very clean look.' }
    ]
  },
  {
    id: 30,
    name: 'Slim Jogger Pant',
    price: 72,
    category: "Men's",
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1506629905607-d9e2a4c1d2c3?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1506629905607-d9e2a4c1d2c3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A tapered jogger in French terry with a clean elastic waistband and minimal branding. Comfortable enough for the gym, sharp enough for the street.',
    colors: ['Black', 'Heather Gray', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 28,
    isNew: false,
    onSale: true,
    bestSeller: false,
    rating: 4.5,
    reviewCount: 76,
    tags: ['jogger', 'pants', 'men', 'athleisure', 'comfort'],
    reviews: [
      { id: '30-a', author: 'Ethan R.', rating: 5, title: 'Best joggers I own', body: 'The taper is perfect and the fabric is thick without being heavy.' },
      { id: '30-b', author: 'Liam G.', rating: 4, title: 'Comfortable and clean', body: 'Wear them to the gym and out for coffee. Very versatile.' }
    ]
  },
  {
    id: 31,
    name: 'Canvas Tote Bag',
    price: 48,
    category: "Men's",
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1553531889-56cc480ac5cb?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1553531889-56cc480ac5cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A heavy-duty waxed canvas tote with reinforced handles and an interior zip pocket. Built for daily carry.',
    colors: ['Natural', 'Black', 'Olive'],
    sizes: ['Standard'],
    stock: 30,
    isNew: true,
    onSale: false,
    bestSeller: false,
    rating: 4.4,
    reviewCount: 54,
    tags: ['tote', 'bag', 'men', 'canvas', 'carry'],
    reviews: [
      { id: '31-a', author: 'Ben F.', rating: 4, title: 'Solid everyday bag', body: 'Holds a lot and the waxed canvas looks better with age.' },
      { id: '31-b', author: 'Sam D.', rating: 5, title: 'Great quality', body: 'The handles are thick and the stitching is clean. Very durable.' }
    ]
  },
  {
    id: 32,
    name: 'Slim Fit Polo',
    price: 62,
    category: "Men's",
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A pique cotton polo with a slim cut, ribbed collar, and a clean two-button placket. The refined casual essential.',
    colors: ['White', 'Navy', 'Forest', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 20,
    isNew: false,
    onSale: false,
    bestSeller: true,
    rating: 4.6,
    reviewCount: 102,
    tags: ['polo', 'shirt', 'men', 'pique', 'smart casual'],
    reviews: [
      { id: '32-a', author: 'Will H.', rating: 5, title: 'Perfect polo', body: 'The fit is slim without being tight. Great for smart casual occasions.' },
      { id: '32-b', author: 'Jack N.', rating: 4, title: 'Clean and comfortable', body: 'Good fabric weight and the collar holds its shape.' }
    ]
  },
  {
    id: 33,
    name: 'Leather Belt',
    price: 55,
    category: "Men's",
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A full-grain leather belt with a brushed silver buckle. Clean, minimal, and built to last a decade.',
    colors: ['Tan', 'Black', 'Espresso'],
    sizes: ['30', '32', '34', '36', '38'],
    stock: 25,
    isNew: false,
    onSale: false,
    bestSeller: false,
    rating: 4.5,
    reviewCount: 61,
    tags: ['belt', 'leather', 'men', 'accessories'],
    reviews: [
      { id: '33-a', author: 'Paul R.', rating: 5, title: 'Quality leather', body: 'Thick, supple leather and the buckle feels solid. Great value.' },
      { id: '33-b', author: 'Mike T.', rating: 4, title: 'Clean and minimal', body: 'Exactly what I wanted — no logos, just good leather.' }
    ]
  },
  {
    id: 34,
    name: 'Performance Quarter-Zip',
    price: 88,
    category: "Men's",
    gender: 'men',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A moisture-wicking quarter-zip in brushed fleece. Lightweight enough to layer under a shell, warm enough to wear solo.',
    colors: ['Black', 'Navy', 'Heather Gray', 'Cobalt'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 16,
    isNew: true,
    onSale: false,
    bestSeller: false,
    rating: 4.5,
    reviewCount: 73,
    tags: ['quarter-zip', 'fleece', 'men', 'athletic', 'layering'],
    reviews: [
      { id: '34-a', author: 'Connor B.', rating: 5, title: 'Great mid-layer', body: 'Fits perfectly under a jacket and the zip is smooth.' },
      { id: '34-b', author: 'Tyler M.', rating: 4, title: 'Comfortable and functional', body: 'Good for runs and casual wear. The fabric is soft.' }
    ]
  }
];

export const womenProducts = [
  {
    id: 35,
    name: 'Wrap Midi Dress',
    price: 118,
    category: "Women's",
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A fluid wrap midi dress in lightweight crepe. Adjustable tie waist, V-neckline, and a flattering A-line skirt. Effortlessly elegant.',
    colors: ['Terracotta', 'Sage', 'Black', 'Ivory'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 15,
    isNew: true,
    onSale: false,
    bestSeller: true,
    rating: 4.8,
    reviewCount: 134,
    tags: ['dress', 'midi', 'women', 'wrap', 'elegant'],
    reviews: [
      { id: '35-a', author: 'Sophie L.', rating: 5, title: 'Absolutely stunning', body: 'The fabric drapes beautifully and the wrap style is so flattering.' },
      { id: '35-b', author: 'Chloe M.', rating: 5, title: 'My new favourite dress', body: 'Wore it to a wedding and got so many compliments. True to size.' }
    ]
  },
  {
    id: 36,
    name: 'High-Rise Wide Leg Jean',
    price: 108,
    category: "Women's",
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506629905607-d9e2a4c1d2c3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A high-rise wide-leg jean in premium stretch denim. Clean wash, full-length cut, and a comfortable waistband that stays put all day.',
    colors: ['Light Wash', 'Dark Wash', 'Black'],
    sizes: ['24', '25', '26', '27', '28', '29', '30'],
    stock: 19,
    isNew: true,
    onSale: false,
    bestSeller: true,
    rating: 4.7,
    reviewCount: 158,
    tags: ['jeans', 'denim', 'women', 'wide leg', 'high rise'],
    reviews: [
      { id: '36-a', author: 'Emma T.', rating: 5, title: 'Perfect wide leg', body: 'The high rise is genuinely high and the leg is wide without being overwhelming.' },
      { id: '36-b', author: 'Zoe K.', rating: 4, title: 'Great denim', body: 'Comfortable and flattering. The stretch is just right.' }
    ]
  },
  {
    id: 37,
    name: 'Cashmere Blend Cardigan',
    price: 148,
    category: "Women's",
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A relaxed-fit cashmere blend cardigan with deep pockets and a longline silhouette. The ultimate cosy layer.',
    colors: ['Oatmeal', 'Camel', 'Dusty Rose', 'Charcoal'],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 11,
    isNew: false,
    onSale: false,
    bestSeller: true,
    rating: 4.9,
    reviewCount: 96,
    tags: ['cardigan', 'cashmere', 'women', 'knitwear', 'cosy'],
    reviews: [
      { id: '37-a', author: 'Isla B.', rating: 5, title: 'Incredibly soft', body: 'The cashmere blend is so soft and the longline cut is very flattering.' },
      { id: '37-b', author: 'Freya N.', rating: 5, title: 'Worth every penny', body: 'I wear this every day. The pockets are deep and it washes beautifully.' }
    ]
  },
  {
    id: 38,
    name: 'Block Heel Mule',
    price: 132,
    category: "Women's",
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A square-toe block heel mule in supple leather. Comfortable enough for all-day wear, polished enough for evenings out.',
    colors: ['Black', 'Tan', 'White'],
    sizes: ['5', '6', '7', '8', '9', '10'],
    stock: 13,
    isNew: true,
    onSale: false,
    bestSeller: false,
    rating: 4.6,
    reviewCount: 72,
    tags: ['shoes', 'mule', 'women', 'heels', 'leather'],
    reviews: [
      { id: '38-a', author: 'Ava R.', rating: 5, title: 'Chic and comfortable', body: 'The block heel makes them so much easier to walk in. Love the square toe.' },
      { id: '38-b', author: 'Mia C.', rating: 4, title: 'Great quality leather', body: 'Soft leather and the heel height is perfect — not too high.' }
    ]
  },
  {
    id: 39,
    name: 'Linen Wide Trouser',
    price: 92,
    category: "Women's",
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Relaxed wide-leg trousers in breathable linen. Elasticated waist, side pockets, and a clean drape that works from beach to brunch.',
    colors: ['Sand', 'White', 'Sage', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 20,
    isNew: true,
    onSale: true,
    bestSeller: false,
    rating: 4.5,
    reviewCount: 83,
    tags: ['trousers', 'linen', 'women', 'wide leg', 'summer'],
    reviews: [
      { id: '39-a', author: 'Luna S.', rating: 5, title: 'Perfect summer trousers', body: 'So breezy and comfortable. The linen gets softer with every wash.' },
      { id: '39-b', author: 'Nadia P.', rating: 4, title: 'Great fit', body: 'The elastic waist is comfortable and the drape is lovely.' }
    ]
  },
  {
    id: 40,
    name: 'Silk Cami Top',
    price: 78,
    category: "Women's",
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A bias-cut silk cami with adjustable straps and a delicate lace trim. Wear alone or layered under a blazer.',
    colors: ['Ivory', 'Black', 'Dusty Rose', 'Champagne'],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 17,
    isNew: false,
    onSale: false,
    bestSeller: false,
    rating: 4.6,
    reviewCount: 59,
    tags: ['cami', 'silk', 'women', 'top', 'elegant'],
    reviews: [
      { id: '40-a', author: 'Lily W.', rating: 5, title: 'Luxurious feel', body: 'The silk is so smooth and the bias cut is incredibly flattering.' },
      { id: '40-b', author: 'Rose M.', rating: 4, title: 'Beautiful top', body: 'Delicate and elegant. Looks great tucked into high-waist trousers.' }
    ]
  },
  {
    id: 41,
    name: 'Structured Tote Bag',
    price: 145,
    category: "Women's",
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1553531889-56cc480ac5cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A structured leather tote with a zip closure, interior organiser pockets, and a detachable crossbody strap. The perfect work bag.',
    colors: ['Black', 'Tan', 'Burgundy', 'Ivory'],
    sizes: ['Standard'],
    stock: 9,
    isNew: false,
    onSale: false,
    bestSeller: true,
    rating: 4.8,
    reviewCount: 117,
    tags: ['tote', 'bag', 'women', 'leather', 'work bag'],
    reviews: [
      { id: '41-a', author: 'Hannah G.', rating: 5, title: 'The perfect work bag', body: 'Fits my laptop, lunch, and everything else. The leather is gorgeous.' },
      { id: '41-b', author: 'Olivia J.', rating: 5, title: 'Stunning quality', body: 'The interior pockets are so useful and the strap is a great bonus.' }
    ]
  },
  {
    id: 42,
    name: 'Ribbed Bodysuit',
    price: 54,
    category: "Women's",
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A fitted ribbed cotton bodysuit with a scoop neck and snap closure. The ultimate layering base that stays tucked all day.',
    colors: ['White', 'Black', 'Camel', 'Sage'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 26,
    isNew: true,
    onSale: false,
    bestSeller: true,
    rating: 4.7,
    reviewCount: 189,
    tags: ['bodysuit', 'ribbed', 'women', 'basics', 'layering'],
    reviews: [
      { id: '42-a', author: 'Ella F.', rating: 5, title: 'My wardrobe staple', body: 'I own four colours. The ribbed fabric is thick and the fit is perfect.' },
      { id: '42-b', author: 'Grace T.', rating: 5, title: 'Stays tucked all day', body: 'Finally a bodysuit that actually stays in place. Love it.' }
    ]
  },
  {
    id: 43,
    name: 'Oversized Blazer',
    price: 168,
    category: "Women's",
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A relaxed oversized blazer in a textured boucle fabric. Padded shoulders, patch pockets, and a single-button closure. Power dressing, redefined.',
    colors: ['Ivory', 'Black', 'Camel', 'Cobalt'],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 12,
    isNew: true,
    onSale: false,
    bestSeller: false,
    rating: 4.7,
    reviewCount: 88,
    tags: ['blazer', 'women', 'oversized', 'boucle', 'office'],
    reviews: [
      { id: '43-a', author: 'Victoria H.', rating: 5, title: 'Statement piece', body: 'The boucle texture is beautiful and the oversized fit is so chic.' },
      { id: '43-b', author: 'Amber L.', rating: 4, title: 'Elevated everyday look', body: 'Throws on over anything and instantly looks polished.' }
    ]
  },
  {
    id: 44,
    name: 'Gold Hoop Earrings',
    price: 46,
    category: "Women's",
    gender: 'women',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Classic 18k gold-plated hoop earrings in three sizes. Lightweight, tarnish-resistant, and the kind of jewellery you never take off.',
    colors: ['Gold', 'Silver', 'Rose Gold'],
    sizes: ['Small (20mm)', 'Medium (35mm)', 'Large (50mm)'],
    stock: 35,
    isNew: false,
    onSale: true,
    bestSeller: true,
    rating: 4.8,
    reviewCount: 203,
    tags: ['earrings', 'hoops', 'women', 'jewellery', 'gold'],
    reviews: [
      { id: '44-a', author: 'Jasmine K.', rating: 5, title: 'Never taking these off', body: 'The gold plating is thick and they haven\'t tarnished after months of daily wear.' },
      { id: '44-b', author: 'Priya S.', rating: 5, title: 'Perfect everyday hoops', body: 'Lightweight and the clasp is secure. I bought all three sizes.' }
    ]
  }
];
