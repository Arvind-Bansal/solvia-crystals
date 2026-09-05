import { EditorialBlock } from "@/types";
import { Quote } from "lucide-react";

interface EditorialQuoteProps {
  block: EditorialBlock;
}

export function EditorialQuote({ block }: EditorialQuoteProps) {
  return (
    <section className="py-32 border-t border-[#262626]/10">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Quote className="w-8 h-8 text-brand-gold/60 mx-auto mb-8" />
          <p className="text-2xl md:text-3xl font-serif text-[#262626] leading-relaxed mb-6 font-medium">
            {block.body}
          </p>
          {block.subtitle && (
            <span className="text-sm text-[#262626]/60 uppercase tracking-widest">
              {block.subtitle}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
