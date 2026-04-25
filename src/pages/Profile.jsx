import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Calendar, Settings, ShoppingBag, Heart, X, Check, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const Profile = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: ''
  });
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="pt-[104px] pb-24 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Please log in</h1>
        <Link to="/login" className="text-blue-600 hover:underline">Go to Login</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateProfile(formData);
      toast('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      toast(err.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-[104px] pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <p className="text-xs text-gray-400 tracking-[0.3em] uppercase font-medium mb-3">Account</p>
        <h1 className="text-5xl font-black text-gray-950 tracking-tight">Your Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-8">
          {/* Main Info */}
          <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            {!isEditing ? (
              <div className="flex flex-col md:flex-row items-center gap-8 mb-10 pb-10 border-b border-gray-50">
                <div className="w-24 h-24 rounded-full bg-gray-950 flex items-center justify-center text-white text-4xl font-black">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="text-center md:text-left flex-1">
                  <h2 className="text-3xl font-bold text-gray-950 mb-1">{user.username}</h2>
                  <p className="text-gray-500 font-medium mb-4">{user.email}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider">{user.role} Account</span>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">Active Status</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 rounded-full border border-gray-200 text-sm font-semibold hover:border-gray-950 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mb-10 pb-10 border-b border-gray-50 space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-950">Update Profile</h3>
                  <button type="button" onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-950 p-2">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-gray-950 transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-gray-950 transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-1">New Password (optional)</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Leave blank to keep current"
                      className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 focus:ring-2 focus:ring-gray-950 transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-gray-950 text-white py-3 rounded-2xl font-bold text-sm hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {submitting ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Display Name</p>
                  <p className="font-semibold text-gray-900">{user.username}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Email Address</p>
                  <p className="font-semibold text-gray-900">{user.email}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Security Role</p>
                  <p className="font-semibold text-gray-900 capitalize">{user.role}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Member Since</p>
                  <p className="font-semibold text-gray-900">{user.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : 'N/A'}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Activity Placeholder */}
          <section className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-950 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl flex items-center gap-4 border border-gray-50">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Account logged in</p>
                  <p className="text-xs text-gray-400">Successfully verified session from browser</p>
                </div>
                <span className="ml-auto text-[10px] text-gray-400 font-medium">Just now</span>
              </div>
              <p className="text-center py-4 text-sm text-gray-400 italic">More activity history will appear here once you start shopping.</p>
            </div>
          </section>
        </div>

        {/* Sidebar Actions */}
        <aside className="space-y-4">
          <Link to="/cart" className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-950 transition-all group">
            <div className="flex items-center gap-4">
              <ShoppingBag className="w-5 h-5 text-gray-400 group-hover:text-gray-950 transition-colors" />
              <span className="text-sm font-semibold">My Cart</span>
            </div>
            <span className="text-xs text-gray-400">View items</span>
          </Link>
          <Link to="/wishlist" className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-950 transition-all group">
            <div className="flex items-center gap-4">
              <Heart className="w-5 h-5 text-gray-400 group-hover:text-gray-950 transition-colors" />
              <span className="text-sm font-semibold">Wishlist</span>
            </div>
            <span className="text-xs text-gray-400">View saved</span>
          </Link>
          <button className="w-full flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-950 transition-all group">
            <div className="flex items-center gap-4">
              <Settings className="w-5 h-5 text-gray-400 group-hover:text-gray-950 transition-colors" />
              <span className="text-sm font-semibold">Settings</span>
            </div>
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Profile;
