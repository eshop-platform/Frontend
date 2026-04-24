const REVIEW_STORAGE_KEY = 'primecommerce-local-reviews';
const REVIEWER_STORAGE_KEY = 'primecommerce-reviewer-key';

const canUseStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const parseJson = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const readStore = () => {
  if (!canUseStorage()) return {};
  return parseJson(window.localStorage.getItem(REVIEW_STORAGE_KEY), {});
};

const writeStore = (value) => {
  if (!canUseStorage()) return;
  window.localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(value));
};

export const getReviewerKey = () => {
  if (!canUseStorage()) return 'anonymous-reviewer';

  let reviewerKey = window.localStorage.getItem(REVIEWER_STORAGE_KEY);
  if (!reviewerKey) {
    reviewerKey = `reviewer-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    window.localStorage.setItem(REVIEWER_STORAGE_KEY, reviewerKey);
  }

  return reviewerKey;
};

export const saveLocalReview = (productId, review) => {
  const store = readStore();
  const reviews = Array.isArray(store[productId]) ? store[productId] : [];
  const reviewerKey = review.reviewerKey || getReviewerKey();
  const existingIndex = reviews.findIndex((item) => item.reviewerKey === reviewerKey);
  const nextReview = {
    id: `local-${Date.now()}`,
    reviewerKey,
    author: review.author,
    rating: Number(review.rating),
    title: review.title || '',
    body: review.body || '',
    createdAt: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    reviews[existingIndex] = { ...reviews[existingIndex], ...nextReview };
  } else {
    reviews.unshift(nextReview);
  }

  store[productId] = reviews;
  writeStore(store);
  return reviews;
};

export const getLocalReviews = (productId) => {
  const store = readStore();
  return Array.isArray(store[productId]) ? store[productId] : [];
};

export const getDisplayProductStats = (product) => {
  const baseRating = Number(product?.rating ?? 0);
  const baseCount = Number(product?.reviewCount ?? 0);
  const localReviews = getLocalReviews(product?.id);
  const localCount = localReviews.length;
  const localSum = localReviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
  const reviewCount = baseCount + localCount;
  const rating = reviewCount > 0 ? (baseRating * baseCount + localSum) / reviewCount : 0;

  return {
    rating,
    reviewCount,
    reviews: [...localReviews, ...(product?.reviews ?? [])]
  };
};
