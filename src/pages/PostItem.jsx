import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { Package, DollarSign, Tag, Image as ImageIcon, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

const PostItem = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: 1,
    gender: 'unisex'
  });
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await api.get('/categories');
        const rawCategories = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.categories)
              ? data.categories
              : [];

        const normalizedCategories = rawCategories
          .map((cat) => ({
            _id: cat?._id || cat?.id || '',
            name: cat?.name || cat?.title || 'Unnamed category'
          }))
          .filter((cat) => cat._id);

        if (normalizedCategories.length > 0) {
          setCategories(normalizedCategories);
          setFormData(prev => ({ ...prev, category: normalizedCategories[0]._id }));
        } else {
          console.warn('No categories found in database');
          setCategories([]);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    console.log("Submitting item:", formData);

    try {
      const response = await api.post('/products', {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      });
      
      console.log("Item posted response:", response);
      
      setStatus({ 
        type: 'success', 
        message: 'Item posted successfully! It is now pending approval from administrators.' 
      });
      
      // Clear form
      setFormData({
        title: '',
        description: '',
        price: '',
        category: categories[0]?._id || '',
        image: '',
        stock: 1,
        gender: 'unisex'
      });

      // Redirect after a short delay
      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (err) {
      setStatus({ 
        type: 'error', 
        message: err.message || 'Failed to post item. Please try again.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-gray-950 mb-2">Sell Your Item</h1>
        <p className="text-gray-500">Fill out the details below to list your item on the marketplace.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 p-8">
        {status.message && (
          <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 ${
            status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          }`}>
            {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="text-sm font-medium">{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Item Title</label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  required
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Vintage Leather Jacket"
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-gray-950 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Price ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  required
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-gray-950 transition-all text-sm font-medium"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Category</label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  required
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-gray-950 transition-all text-sm font-medium appearance-none"
                >
                  {loading && <option value="">Loading categories...</option>}
                  {!loading && categories.length === 0 && <option value="">No categories available</option>}
                  {!loading && categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Gender</label>
              <select
                required
                name="gender"
                value={formData.gender || 'unisex'}
                onChange={handleChange}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-4 focus:ring-2 focus:ring-gray-950 transition-all text-sm font-medium"
              >
                <option value="unisex">Unisex</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Stock Quantity</label>
              <input
                required
                type="number"
                name="stock"
                min="1"
                value={formData.stock}
                onChange={handleChange}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-4 focus:ring-2 focus:ring-gray-950 transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Image URL</label>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                required
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-gray-950 transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Description</label>
            <div className="relative">
              <FileText className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <textarea
                required
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your item's condition, features, and more..."
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-gray-950 transition-all text-sm font-medium resize-none"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gray-950 text-white py-4 rounded-2xl font-bold text-sm hover:bg-gray-800 transition-all shadow-lg shadow-gray-200 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {submitting ? 'Posting Item...' : 'Post Item for Approval'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostItem;
