import { categoryGroups as staticCategoryGroups, categories as staticCategories, products as staticProducts } from '../src/data/products';

export const mergeCatalog = (remoteProducts = []) => {
  const merged = [...remoteProducts];
  const seenIds = new Set(remoteProducts.map((product) => String(product.id)));

  staticProducts.forEach((product) => {
    if (!seenIds.has(String(product.id))) {
      merged.push(product);
    }
  });

  return merged;
};

export const buildCatalogCategories = (catalog) => {
  const dynamic = new Set(catalog.map((product) => product.category).filter(Boolean));
  const ordered = staticCategories.filter((category) => category === 'All' || dynamic.has(category));
  dynamic.forEach((category) => {
    if (!ordered.includes(category)) ordered.push(category);
  });
  return ordered;
};

export const buildCategoryGroups = (catalog) => {
  const staticFashion = staticCategoryGroups.find((group) => group.title === 'Fashion')?.items ?? [];
  const catalogCategories = [...new Set(catalog.map((product) => product.category).filter(Boolean))];
  const fashion = [...new Set([...staticFashion, ...catalogCategories.filter((category) => !['Electronics', 'Sports', 'Beauty', 'Furniture', 'Food & Drink', 'Kids', 'Jewelry', 'Books'].includes(category))])];

  return staticCategoryGroups.map((group) =>
    group.title === 'Fashion'
      ? { ...group, items: fashion }
      : group
  );
};
