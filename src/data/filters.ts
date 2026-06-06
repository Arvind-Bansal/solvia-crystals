import { FilterDefinition } from '@/types';

export const FILTER_INTENTIONS: FilterDefinition = {
  key: "intention",
  label: "Intention",
  options: ["All", "Protection", "Clarity", "Confidence", "Love", "Balance", "Wealth"],
};

export const FILTER_STYLES: FilterDefinition = {
  key: "style",
  label: "Style",
  options: ["All", "Minimal", "Signature", "Statement"],
};

export const FILTER_CHAKRAS: FilterDefinition = {
  key: "chakra",
  label: "Chakra",
  options: ["All", "Root", "Sacral", "Solar Plexus", "Heart", "Throat", "Third Eye", "Crown"],
};

export const FILTER_COLLECTIONS: FilterDefinition = {
  key: "collection",
  label: "Collection",
  options: ["All", "Everyday Rituals", "Quiet Energy", "Grounding Series", "Signature Stones", "Minimal Forms"],
};
