import { Star } from "lucide-react";
import { Review } from "@/data/mockData";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        size={14}
        className={i <= rating ? "fill-shop-warm text-shop-warm" : "text-border"}
      />
    ))}
  </div>
);

const ReviewList = ({ reviews }: { reviews: Review[] }) => {
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Customer Reviews</h3>
        <div className="flex items-center gap-2 mt-1">
          <StarRating rating={Math.round(avg)} />
          <span className="text-sm text-muted-foreground">{avg.toFixed(1)} out of 5</span>
        </div>
      </div>
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="border-t border-border pt-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium">{r.username}</span>
              <StarRating rating={r.rating} />
            </div>
            <p className="text-sm text-muted-foreground">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
