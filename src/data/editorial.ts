import { EditorialBlock } from '@/types';

export const editorialBlocks: EditorialBlock[] = [
  {
    id: "craftsmanship-quote",
    type: "quote",
    body: "We don\u0027t rush the process. Every bracelet is assembled by hand, inspected bead by bead, and packaged with the same care you\u0027d expect from a piece you\u0027ll wear every day.",
    subtitle: "Made with Intention",
  },
  {
    id: "philosophy-split",
    type: "split-image",
    title: "Designed with Intention, Built to Last",
    subtitle: "Our Philosophy",
    body: "Every Solvia piece begins with the stone. We source directly from small-scale mines, selecting only AAA-grade crystals that meet our standards for colour, clarity, and character.\n\nEach bracelet is assembled by hand with ethically sourced stones and durable hardware. The result is a piece that sits well on the wrist, wears in naturally, and carries something beyond the aesthetic.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Solvia Crystals craftsmanship",
    position: "left",
  },
  {
    id: "packaging-split",
    type: "packaging",
    title: "Considered, Down to the Packaging",
    subtitle: "The Unboxing",
    body: "Every Solvia piece arrives in a linen-lined box with a soft pouch for storage. No plastic, no excess — just the piece, a care card, and a certificate of authenticity.\n\nIt\u0027s the kind of unboxing that feels like receiving a gift — even when it\u0027s from yourself.",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Solvia Crystals packaging",
    position: "right",
  },
];

// ─── Query Helpers ───────────────────────────

export function getEditorialBlock(id: string): EditorialBlock | undefined {
  return editorialBlocks.find(b => b.id === id);
}

export function getEditorialBlocksByType(type: EditorialBlock['type']): EditorialBlock[] {
  return editorialBlocks.filter(b => b.type === type);
}
