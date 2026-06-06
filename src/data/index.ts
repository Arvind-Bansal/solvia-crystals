// Data layer barrel exports
// These re-exports create the single entry point for all data access.
// When migrating to a CMS, update the individual files — consumers stay unchanged.

export { products, getAllProducts, getProductBySlug, getProductById, getProductsByIds, getProductsByIntention, getProductsByCollection } from './products';
export { collections, getAllCollections, getCollectionBySlug, getProductsForCollection } from './collections';
export { intentions, getAllIntentions, getIntentionBySlug, getProductsForIntention } from './intentions';
export { editorialBlocks, getEditorialBlock, getEditorialBlocksByType } from './editorial';
export { FILTER_INTENTIONS, FILTER_STYLES, FILTER_CHAKRAS, FILTER_COLLECTIONS } from './filters';
export { getBestsellers, getRelatedProducts, getFeaturedHeroProduct } from './featured';
export { blogPosts, getAllPosts, getPostBySlug } from './blog';
