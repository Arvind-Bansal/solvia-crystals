import { EditorialBlock } from "@/types";

interface EditorialMaterialProps {
  block: EditorialBlock;
}

export function EditorialMaterial({ block }: EditorialMaterialProps) {
  return (
    <div className="p-6 md:p-8 bg-[#0d0d0d] border border-white/5 rounded-sm">
      {block.subtitle && (
        <span className="text-xs text-brand-gold uppercase tracking-widest font-medium mb-3 block">
          {block.subtitle}
        </span>
      )}
      {block.title && (
        <h3 className="text-lg font-serif text-white mb-3">{block.title}</h3>
      )}
      <p className="text-sm text-brand-silver/70 leading-relaxed">{block.body}</p>
    </div>
  );
}
