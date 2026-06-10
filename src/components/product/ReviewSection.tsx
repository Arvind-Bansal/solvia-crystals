"use client";

import { Star, MessageSquare } from "lucide-react";

interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
}

interface ReviewSectionProps {
  productName: string;
  reviews?: Review[];
}

export function ReviewSection({ productName, reviews = [] }: ReviewSectionProps) {
  if (reviews.length === 0) {
    return (
      <section className="pt-16 border-t border-white/10 mt-16">
        <h2 className="text-2xl font-serif text-white mb-8 text-center">Customer Reviews</h2>
        <div className="flex flex-col items-center justify-center py-12 bg-[#121212] border border-white/5 rounded-sm text-center">
          <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <MessageSquare className="w-6 h-6 text-brand-silver/40" />
          </div>
          <p className="text-brand-silver/60 text-sm mb-2">No reviews yet</p>
          <p className="text-brand-silver/40 text-xs max-w-sm">
            Customer reviews for {productName} will appear here once orders begin shipping.
          </p>
        </div>
      </section>
    );
  }

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <section className="pt-16 border-t border-white/10 mt-16">
      <h2 className="text-2xl font-serif text-white mb-8 text-center">Customer Reviews</h2>
      
      {/* Summary */}
      <div className="flex items-center justify-center gap-4 mb-10">
        <span className="text-3xl font-medium text-white">{avgRating.toFixed(1)}</span>
        <div>
          <div className="flex text-brand-gold mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.round(avgRating) ? "fill-current" : "text-brand-silver/20"}`} />
            ))}
          </div>
          <p className="text-xs text-brand-silver/60">Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}</p>
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="p-6 bg-[#121212] border border-white/5 rounded-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold text-sm font-bold">
                  {review.author.charAt(0)}
                </span>
                <span className="text-white text-sm font-medium">{review.author}</span>
              </div>
              <div className="flex text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-current" : "text-brand-silver/20"}`} />
                ))}
              </div>
            </div>
            <p className="text-brand-silver/80 text-sm leading-relaxed">{review.content}</p>
            <p className="text-xs text-brand-silver/40 mt-3">
              {new Date(review.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
