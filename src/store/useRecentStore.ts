import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface RecentState {
  items: Product[];
  addRecent: (product: Product) => void;
  clearRecent: () => void;
}

export const useRecentStore = create<RecentState>()(
  persist(
    (set) => ({
      items: [],
      addRecent: (product) => {
        set((state) => {
          // Remove if it already exists so we can add it to the front
          const filtered = state.items.filter((item) => item.id !== product.id);
          // Keep only the most recent 10 items
          return { items: [product, ...filtered].slice(0, 10) };
        });
      },
      clearRecent: () => set({ items: [] }),
    }),
    {
      name: 'solvia-recent-storage',
    }
  )
);
