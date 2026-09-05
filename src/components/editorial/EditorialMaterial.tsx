import { EditorialBlock } from "@/types";

interface EditorialMaterialProps {
  block: EditorialBlock;
}

export function EditorialMaterial({ block }: EditorialMaterialProps) {
  return (
    <div className="p-6 md:p-8 bg-white border border-[#262626]/10 rounded-sm shadow-xs">
      {block.subtitle && (
        <span className="text-xs text-brand-gold uppercase tracking-widest font-medium mb-3 block">
          {block.subtitle}
        </span>
      )}
      {block.title && (
        <h3 className="text-lg font-serif text-[#262626] mb-3 font-medium">{block.title}</h3>
      )}
      <p className="text-sm text-[#262626]/70 leading-relaxed">{block.body}</p>
    </div>
  );
}
