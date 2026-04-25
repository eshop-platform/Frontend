/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../../shared/productApi';
import { buildCatalogCategories, buildCategoryGroups, mergeCatalog } from '../../shared/catalogUtils';

const CatalogContext = createContext();

export const CatalogProvider = ({ children }) => {
  const [remoteProducts, setRemoteProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshCatalog = async () => {
    setLoading(true);
    try {
      const approvedProducts = await fetchProducts();
      setRemoteProducts(approvedProducts);
    } catch {
      setRemoteProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCatalog();
  }, []);

  const catalog = useMemo(() => mergeCatalog(remoteProducts), [remoteProducts]);
  const categories = useMemo(() => buildCatalogCategories(catalog), [catalog]);
  const categoryGroups = useMemo(() => buildCategoryGroups(catalog), [catalog]);

  return (
    <CatalogContext.Provider value={{ catalog, remoteProducts, categories, categoryGroups, loading, refreshCatalog }}>
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (context === undefined) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};

