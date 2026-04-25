import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast('Please fill all fields', 'error');

    setLoading(true);
    try {
      const data = await login(email, password);
      toast('Welcome back!', 'success');
      
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-[104px] flex items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <span className="text-2xl font-black tracking-tight text-gray-950">PRIME</span>
          <span className="text-2xl font-light tracking-tight text-gray-400">COMMERCE</span>
          <h2 className="text-3xl font-bold text-gray-950 mt-6 mb-2">Welcome back</h2>
          <p className="text-gray-500 text-sm">Sign in to your account to continue</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-950 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                placeholder="name@example.com"
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide">Password</label>
                <Link to="/forgot-password" className="text-xs text-gray-500 hover:text-gray-950 transition-colors">Forgot password?</Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-950 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-950 text-white py-3.5 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors mt-2 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-400">or</span>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-gray-950 hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
