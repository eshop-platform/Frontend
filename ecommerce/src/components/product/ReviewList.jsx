function calculateAverage(reviews) {
  if (!reviews.length) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
}

export default function ReviewList({ reviews }) {
  const averageRating = calculateAverage(reviews);

  return (
    <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900">Reviews</h2>
      <p className="text-lg font-medium text-gray-800">
        {"\u2B50"} {averageRating.toFixed(1)}/5
      </p>

      <div className="space-y-3">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-xl border border-gray-200 p-4">
            <div className="mb-1 flex items-center justify-between">
              <p className="font-medium text-gray-900">{review.user}</p>
              <p className="text-sm text-gray-600">{review.rating}/5</p>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
