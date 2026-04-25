import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCat, setNewCat] = useState({ name: '', description: '' });

  const fetchCategories = async () => {
    try {
      const data = await api.get('/categories');
      setCategories(data.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/categories', newCat);
      setNewCat({ name: '', description: '' });
      fetchCategories();
    } catch (err) {
      console.error('Failed to create category:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure? This may affect products in this category.')) return;
    try {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error('Failed to delete category:', err);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-400">Loading categories...</div>;

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="h1">Categories</h1>
        <p className="subtitle">Organize your marketplace products.</p>
      </div>

      <div className="main-grid" style={{ gridTemplateColumns: '1fr 300px' }}>
        <div className="card">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Description</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => (
                  <tr key={cat._id}>
                    <td style={{ fontWeight: '500' }}>{cat.name}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{cat.description || 'No description'}</td>
                    <td>
                      <div className="action-buttons" style={{ justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => handleDelete(cat._id)}
                          className="btn btn-danger" 
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h2 className="h2" style={{ marginBottom: '16px' }}>Add Category</h2>
          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Name</label>
              <input 
                type="text" 
                className="input" 
                required 
                value={newCat.name}
                onChange={(e) => setNewCat({...newCat, name: e.target.value})}
                placeholder="e.g. Footwear" 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Description</label>
              <textarea 
                className="input" 
                value={newCat.description}
                onChange={(e) => setNewCat({...newCat, description: e.target.value})}
                style={{ height: '80px', resize: 'none' }} 
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Category</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Categories;
