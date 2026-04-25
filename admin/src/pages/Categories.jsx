import React, { useEffect, useMemo, useState } from 'react';
import { createCategory, fetchCategories, fetchAllAdminProducts, removeCategory, updateCategory } from '../../../shared/adminApi';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchCategories().catch(() => []),
      fetchAllAdminProducts().catch(() => []),
    ]).then(([categoryData, productData]) => {
      setCategories(categoryData);
      setProducts(productData);
      setLoading(false);
    });
  }, []);

  const listingCount = useMemo(() => {
    const counts = {};
    products.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  const handleCreate = async () => {
    const name = window.prompt('Category name');
    if (!name) return;
    const created = await createCategory({ name });
    setCategories((current) => [...current, created]);
  };

  const handleRename = async (category) => {
    const name = window.prompt('Update category name', category.name);
    if (!name || name === category.name) return;
    const updated = await updateCategory(category._id, { name });
    setCategories((current) => current.map((item) => item._id === category._id ? updated : item));
  };

  const handleDelete = async (id) => {
    await removeCategory(id);
    setCategories((current) => current.filter((item) => item._id !== id));
  };

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="h1">Categories Overview</h1>
          <p className="subtitle">Categories loaded from the backend with live listing counts.</p>
        </div>
        <button className="btn btn-primary" onClick={handleCreate}>Create Category</button>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Active Listings</th>
                <th>Description</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '24px' }}>Loading categories...</td>
                </tr>
              )}
              {!loading && categories.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '24px' }}>No categories found.</td>
                </tr>
              )}
              {categories.map((cat) => (
                <tr key={cat._id}>
                  <td style={{ fontWeight: '600' }}>{cat.name}</td>
                  <td>{(listingCount[cat.name] || 0).toLocaleString()}</td>
                  <td>{cat.description || '—'}</td>
                  <td>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                      <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleRename(cat)}>Edit</button>
                      <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleDelete(cat._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Categories;
