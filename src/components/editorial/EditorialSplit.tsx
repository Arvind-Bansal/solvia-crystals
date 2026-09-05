import Image from "next/image";
import Link from "next/link";
import { EditorialBlock } from "@/types";
import { Button } from "@/components/ui/Button";

interface EditorialSplitProps {
  block: EditorialBlock;
  cta?: { label: string; href: string };
}

export function EditorialSplit({ block, cta }: EditorialSplitProps) {
  const paragraphs = block.body.split("\n\n").filter(Boolean);
  const imageFirst = block.position === "left";

  const imageBlock = block.image ? (
    <div className={`w-full md:w-1/2 relative ${block.type === "packaging" ? "aspect-square" : "aspect-[3/4]"} rounded-sm overflow-hidden border border-[#262626]/10 shadow-xs bg-[#F2EDE4]`}>
      <Image
        src={block.image}
        alt={block.imageAlt || block.title || ""}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
  ) : null;

  const textBlock = (
    <div className="w-full md:w-1/2">
      {block.subtitle && (
        <span className="text-xs text-brand-gold uppercase tracking-widest font-medium mb-4 block">
          {block.subtitle}
        </span>
      )}
      {block.title && (
        <h2 className="text-3xl md:text-4xl font-serif text-[#262626] mb-6 leading-tight font-medium">
          {block.title.split(",").map((part, i) => (
            <span key={i}>
              {i > 0 && <><br /></>}
              {part.trim()}
            </span>
          ))}
        </h2>
      )}
      {paragraphs.map((p, i) => (
        <p key={i} className={`text-[#262626]/80 leading-relaxed ${i < paragraphs.length - 1 ? "mb-4" : cta ? "mb-8" : ""}`}>
          {p}
        </p>
      ))}
      {cta && (
        <Link href={cta.href}>
          <Button variant="outline">{cta.label}</Button>
        </Link>
      )}
    </div>
  );

  return (
    <section className="py-24 border-t border-[#262626]/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center max-w-5xl mx-auto">
          {imageFirst ? (
            <>{imageBlock}{textBlock}</>
          ) : (
            <>{textBlock}{imageBlock}</>
          )}
        </div>
      </div>
    </section>
  );
}
