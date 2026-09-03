import { FilterDefinition } from '@/types';

export const FILTER_INTENTIONS: FilterDefinition = {
  key: "intention",
  label: "Intention",
  options: ["All", "Protection", "Clarity", "Confidence", "Love", "Wealth"],
};

export const FILTER_STYLES: FilterDefinition = {
  key: "style",
  label: "Style",
  options: ["All", "Minimal", "Signature", "Statement"],
};

export const FILTER_CHAKRAS: FilterDefinition = {
  key: "chakra",
  label: "Chakra",
  options: ["All"],
};

export const FILTER_COLLECTIONS: FilterDefinition = {
  key: "collection",
  label: "Collection",
  options: ["All", "Launch 01"],
};
