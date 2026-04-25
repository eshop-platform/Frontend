import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { Plus, X, Upload, Search } from 'lucide-react';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: 10,
    isNewCollection: false
  });

  const fetchData = async () => {
    try {
      const [prodData, catData] = await Promise.all([
        api.get('/products'),
        api.get('/categories')
      ]);
      setProducts(prodData.data);
      setCategories(catData.data);
      if (catData.data.length > 0) setFormData(f => ({ ...f, category: catData.data[0]._id }));
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/products', {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      });
      setShowModal(false);
      setFormData({ title: '', description: '', price: '', category: categories[0]?._id, image: '', stock: 10, isNewCollection: false });
      fetchData();
    } catch (err) {
      console.error('Failed to create product:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchData();
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.category?.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-10 text-center text-gray-400">Loading management console...</div>;

  return (
    <div className="relative">
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="h1">Products Management</h1>
          <p className="subtitle">Manage all active and pending marketplace listings.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by title or category..." 
            className="input" 
            style={{ border: 'none', padding: '0', fontSize: '14px' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product Details</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Poster</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-tertiary)' }}>
                    No products found matching your search.
                  </td>
                </tr>
              ) : filteredProducts.map(prod => (
                <tr key={prod._id}>
                  <td>
                    <div className="product-cell" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img 
                        src={prod.image} 
                        alt="" 
                        onError={(e) => e.target.src = 'https://via.placeholder.com/40'}
                        style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }} 
                      />
                      <div>
                        <div style={{ fontWeight: '600' }}>{prod.title}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>#{prod._id.slice(-6)}</div>
                      </div>
                    </div>
                  </td>
                  <td>{prod.category?.name || 'Uncategorized'}</td>
                  <td style={{ fontWeight: '700' }}>${prod.price?.toLocaleString()}</td>
                  <td>
                    <span style={{ color: prod.stock < 10 ? 'var(--danger-color)' : 'inherit', fontWeight: '600' }}>
                      {prod.stock}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${prod.status === 'approved' ? 'badge-green' : (prod.status === 'pending' ? 'badge-yellow' : 'badge-red')}`}>
                      {prod.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '12px', fontWeight: '500' }}>
                    {prod.createdBy?.username} <br/>
                    <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>({prod.createdBy?.role})</span>
                  </td>
                  <td>
                    <div className="action-buttons" style={{ justifyContent: 'flex-end', display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleDelete(prod._id)}
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

      {/* Add Product Modal */}
      {showModal && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className="h2">Add New Product</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <form onSubmit={handleCreate} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="label">Product Title</label>
                <input required className="input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Premium Denim Jacket" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label className="label">Price ($)</label>
                  <input required type="number" step="0.01" className="input" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
                <div>
                  <label className="label">Initial Stock</label>
                  <input required type="number" className="input" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="label">Category</label>
                <select required className="input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Image URL</label>
                <div style={{ position: 'relative' }}>
                  <Upload size={16} style={{ position: 'absolute', left: '12px', top: '12px' }} className="text-gray-400" />
                  <input required className="input" style={{ paddingLeft: '36px' }} value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://images.unsplash.com/..." />
                </div>
              </div>
              <div>
                <label className="label">Description</label>
                <textarea className="input" style={{ height: '80px', resize: 'none' }} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" id="isNew" checked={formData.isNewCollection} onChange={e => setFormData({...formData, isNewCollection: e.target.checked})} />
                <label htmlFor="isNew" style={{ fontSize: '13px', fontWeight: '500' }}>Mark as New Collection (Featured)</label>
              </div>
              <div style={{ marginTop: '8px', display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                <button disabled={submitting} type="submit" className="btn btn-primary" style={{ flex: 1 }}>{submitting ? 'Creating...' : 'Create Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManagement;
