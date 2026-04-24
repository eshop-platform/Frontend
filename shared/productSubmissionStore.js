const SUBMISSIONS_COOKIE_KEY = 'primecommerce-product-submissions';
const OVERRIDES_COOKIE_KEY = 'primecommerce-product-submission-overrides';

const seedSubmissions = [
  {
    id: 'seed-1',
    vendor: "Maison D'Elle",
    productTitle: 'Charcoal Wool Coat',
    description: 'Tailored wool coat with a clean double-breasted front and soft quilted lining.',
    img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80'
    ],
    price: 299,
    category: 'Apparel',
    stock: 16,
    colors: ['Charcoal', 'Camel'],
    sizes: ['S', 'M', 'L'],
    sellerName: 'Nadine El',
    sellerEmail: 'vendor@maisondelle.com',
    status: 'pending',
    submittedAt: '2026-04-24T09:30:00.000Z',
    decisionNote: ''
  },
  {
    id: 'seed-2',
    vendor: 'Urban Threads',
    productTitle: 'Distressed Denim Jacket',
    description: 'Relaxed washed denim jacket with contrast stitching and a structured collar.',
    img: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80'
    ],
    price: 145,
    category: 'Apparel',
    stock: 12,
    colors: ['Blue Wash'],
    sizes: ['M', 'L', 'XL'],
    sellerName: 'Marcus Reed',
    sellerEmail: 'seller@urbanthreads.com',
    status: 'pending',
    submittedAt: '2026-04-24T07:15:00.000Z',
    decisionNote: ''
  },
  {
    id: 'seed-3',
    vendor: 'Lumina Jewelry',
    productTitle: 'Gold Hoop Earrings',
    description: 'Polished lightweight hoops designed for daily wear and easy layering.',
    img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80'
    ],
    price: 85,
    category: 'Accessories',
    stock: 30,
    colors: ['Gold'],
    sizes: ['One Size'],
    sellerName: 'Lina Kiros',
    sellerEmail: 'hello@luminajewelry.com',
    status: 'pending',
    submittedAt: '2026-04-24T06:10:00.000Z',
    decisionNote: ''
  }
];

const inMemoryStore = {
  submissions: [],
  overrides: {}
};

const canUseDocument = () => typeof document !== 'undefined';

const parseJson = (value) => {
  try {
    const parsed = JSON.parse(value);
    return parsed ?? null;
  } catch {
    return null;
  }
};

const sortByNewest = (submissions) => [...submissions].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

const readCookie = (key) => {
  if (!canUseDocument()) return null;

  const match = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${key}=`));

  if (!match) return null;

  return decodeURIComponent(match.slice(key.length + 1));
};

const writeCookie = (key, value) => {
  if (!canUseDocument()) return;

  document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=2592000; samesite=lax`;
};

const readCustomSubmissions = () => {
  if (canUseDocument()) {
    const parsed = parseJson(readCookie(SUBMISSIONS_COOKIE_KEY));
    return Array.isArray(parsed) ? parsed : [];
  }

  return inMemoryStore.submissions;
};

const saveCustomSubmissions = (submissions) => {
  const sorted = sortByNewest(submissions);

  if (canUseDocument()) {
    writeCookie(SUBMISSIONS_COOKIE_KEY, JSON.stringify(sorted));
  } else {
    inMemoryStore.submissions = sorted;
  }

  return sorted;
};

const readOverrides = () => {
  if (canUseDocument()) {
    const parsed = parseJson(readCookie(OVERRIDES_COOKIE_KEY));
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  }

  return inMemoryStore.overrides;
};

const saveOverrides = (overrides) => {
  if (canUseDocument()) {
    writeCookie(OVERRIDES_COOKIE_KEY, JSON.stringify(overrides));
  } else {
    inMemoryStore.overrides = overrides;
  }

  return overrides;
};

const mergeWithOverrides = (submission, overrides) => {
  const override = overrides[submission.id];
  return override ? { ...submission, ...override } : submission;
};

export const getProductSubmissions = () => {
  const overrides = readOverrides();
  const customSubmissions = readCustomSubmissions().map((submission) => mergeWithOverrides(submission, overrides));
  const seededSubmissions = seedSubmissions.map((submission) => mergeWithOverrides(submission, overrides));

  return sortByNewest([...customSubmissions, ...seededSubmissions]);
};

export const submitProduct = (payload) => {
  const submission = {
    id: `submission-${Date.now()}`,
    vendor: payload.brandName.trim(),
    productTitle: payload.productTitle.trim(),
    description: payload.description.trim(),
    img: payload.imageUrl.trim(),
    gallery: payload.imageGallery,
    price: Number(payload.price),
    category: payload.category,
    stock: Number(payload.stock),
    colors: payload.colors,
    sizes: payload.sizes,
    sellerName: payload.sellerName.trim(),
    sellerEmail: payload.sellerEmail.trim(),
    status: 'pending',
    submittedAt: new Date().toISOString(),
    decisionNote: ''
  };

  const submissions = readCustomSubmissions();
  saveCustomSubmissions([submission, ...submissions]);

  return getProductSubmissions();
};

export const updateSubmissionStatus = (submissionId, status, decisionNote = '') => {
  const nextValues = {
    status,
    decisionNote,
    reviewedAt: new Date().toISOString()
  };

  const customSubmissions = readCustomSubmissions();
  const customIndex = customSubmissions.findIndex((submission) => submission.id === submissionId);

  if (customIndex >= 0) {
    const nextCustomSubmissions = [...customSubmissions];
    nextCustomSubmissions[customIndex] = {
      ...nextCustomSubmissions[customIndex],
      ...nextValues
    };
    saveCustomSubmissions(nextCustomSubmissions);
  } else {
    saveOverrides({
      ...readOverrides(),
      [submissionId]: nextValues
    });
  }

  return getProductSubmissions();
};

export const formatRelativeSubmittedTime = (submittedAt) => {
  const submitted = new Date(submittedAt);
  const now = new Date();
  const diffMinutes = Math.max(1, Math.round((now - submitted) / (1000 * 60)));

  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
};

export const productSubmissionCategories = [
  'Apparel',
  'Accessories',
  'Footwear',
  'Gear',
  'Home',
  'Tech',
  'Audio',
  'Beauty',
  'Sports',
  'Furniture',
  'Books'
];
