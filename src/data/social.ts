import { InstagramPost, CustomerStory } from '@/types';

// ─── Instagram Feed ──────────────────────────
// Empty by default. Populate when real Instagram content is available.
// Components gracefully handle empty arrays.

export const instagramPosts: InstagramPost[] = [];

// ─── Customer Stories ────────────────────────
// Empty by default. No fake reviews.
// Populate when real customer testimonials are collected.

export const customerStories: CustomerStory[] = [];

// ─── Query Helpers ───────────────────────────

export function getInstagramFeed(limit = 6): InstagramPost[] {
  return instagramPosts.slice(0, limit);
}

export function getCustomerStories(limit = 3): CustomerStory[] {
  return customerStories.slice(0, limit);
}

export function hasInstagramContent(): boolean {
  return instagramPosts.length > 0;
}

export function hasCustomerStories(): boolean {
  return customerStories.length > 0;
}
