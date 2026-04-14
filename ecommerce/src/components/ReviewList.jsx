const ReviewList = ({ averageRating, reviews }) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
      <p className="mt-2 text-lg font-medium text-amber-600">⭐ {averageRating}/5</p>

      <div className="mt-4 space-y-4">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-xl bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{review.user}</h3>
              <p className="text-amber-500">{'⭐'.repeat(review.rating)}</p>
            </div>
            <p className="mt-2 text-gray-700">{review.comment}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ReviewList;
