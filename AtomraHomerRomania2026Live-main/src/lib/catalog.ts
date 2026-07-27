import { catalogCategories, catalogProducts, type CatalogCategory, type CatalogProduct } from '../data/catalog';
import { getResolvedImageList } from '../utils/imageSources';

const normalizeProduct = (product: CatalogProduct): CatalogProduct => ({
  ...product,
  images: getResolvedImageList(product.images),
  features: Array.isArray(product.features) ? product.features.filter(Boolean) : [],
  tags: Array.isArray(product.tags) ? product.tags.filter(Boolean) : [],
  image_alt_texts: Array.isArray(product.image_alt_texts) ? product.image_alt_texts.filter(Boolean) : []
});

export const getCatalogCategories = (): CatalogCategory[] =>
  [...catalogCategories].sort((a, b) => a.sort_order - b.sort_order);

export const getCatalogCategoryBySlug = (slug: string): CatalogCategory | undefined =>
  getCatalogCategories().find((category) => category.slug === slug);

export const getCatalogProducts = (): CatalogProduct[] =>
  catalogProducts
    .filter((product) => product.in_stock)
    .map(normalizeProduct)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

export const getCatalogProductsByCategory = (category: string): CatalogProduct[] =>
  getCatalogProducts().filter(
    (product) => product.category === category || product.category_slug === category
  );

export const getCatalogProductBySlug = (slug: string): CatalogProduct | undefined =>
  getCatalogProducts().find((product) => product.slug === slug);

export const searchCatalogProducts = (query: string): CatalogProduct[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return getCatalogProducts().filter((product) =>
    [product.name, product.description, product.category, ...product.tags].some((value) =>
      value.toLowerCase().includes(normalizedQuery)
    )
  );
};
