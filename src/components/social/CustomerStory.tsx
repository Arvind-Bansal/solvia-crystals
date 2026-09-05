import Image from "next/image";
import Link from "next/link";
import { CustomerStory as CustomerStoryType } from "@/types";

interface CustomerStoryProps {
  story: CustomerStoryType;
}

/**
 * Customer testimonial card. Designed for real stories only — never fake.
 * Links to relevant product when productSlug is provided.
 */
export function CustomerStory({ story }: CustomerStoryProps) {
  return (
    <div className="p-6 bg-white border border-[#262626]/10 rounded-sm shadow-xs">
      <div className="flex items-start gap-4 mb-4">
        {story.image ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-[#262626]/10">
            <Image src={story.image} alt={story.name} fill className="object-cover" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
            <span className="text-brand-gold font-bold text-sm">{story.name.charAt(0)}</span>
          </div>
        )}
        <div>
          <p className="text-[#262626] font-medium text-sm">{story.name}</p>
          {story.productSlug && (
            <Link
              href={`/product/${story.productSlug}`}
              className="text-xs text-brand-gold hover:text-[#262626] transition-colors"
            >
              View piece &rarr;
            </Link>
          )}
        </div>
      </div>
      <p className="text-[#262626]/80 text-sm leading-relaxed italic">
        &ldquo;{story.quote}&rdquo;
      </p>
    </div>
  );
}
