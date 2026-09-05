import Image from "next/image";
import { EditorialBlock } from "@/types";

interface EditorialFullWidthProps {
  block: EditorialBlock;
}

export function EditorialFullWidth({ block }: EditorialFullWidthProps) {
  return (
    <section className="relative py-32 border-t border-[#262626]/10 overflow-hidden bg-[#F2EDE4]">
      {block.image && (
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src={block.image}
            alt={block.imageAlt || ""}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8F5EF] via-[#F8F5EF]/80 to-[#F8F5EF]" />
        </div>
      )}
      <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
        {block.subtitle && (
          <span className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4 block">
            {block.subtitle}
          </span>
        )}
        {block.title && (
          <h2 className="text-4xl md:text-6xl font-serif text-[#262626] mb-8 font-medium">
            {block.title}
          </h2>
        )}
        <p className="text-lg md:text-xl text-[#262626]/80 leading-relaxed font-light max-w-2xl mx-auto">
          {block.body}
        </p>
      </div>
    </section>
  );
}
