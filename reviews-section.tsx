import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/catalog";

export function ReviewsSection() {
  return (
    <section id="ulasan" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-berry">
        Reviews
      </p>
      <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
        Orang bilang, sip lagi.
      </h2>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {REVIEWS.map((review) => (
          <figure
            key={review.name}
            className="rounded-[1.5rem] bg-foam p-6 shadow-[var(--shadow-card)]"
          >
            <div className="mb-3 flex gap-1 text-berry">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <blockquote className="text-base leading-relaxed">{review.text}</blockquote>
            <figcaption className="mt-4 font-display text-sm font-semibold">
              {review.name}
              <span className="ml-2 font-sans font-normal text-ink-soft">· {review.flavor}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
