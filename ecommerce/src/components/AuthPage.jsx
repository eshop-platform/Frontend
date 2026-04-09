import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react';

const API_BASE = "http://localhost:5000/api/auth";

function showMessage(text, isError = false) {
  if (isError) {
    alert(`Error: ${text}`);
  } else {
    alert(text);
  }
}

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token found in storage – user appears logged in');
      // Optional: redirect or verify token here
    }
  }, []);

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (!name || name.trim().length < 2) {
      showMessage('Name must be at least 2 characters', true);
      return;
    }

    if (!email || !email.includes('@')) {
      showMessage('Please enter a valid email', true);
      return;
    }

    if (!password || password.length < 6) {
      showMessage('Password must be at least 6 characters', true);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
      });

      const data = await res.json();
      if (!res.ok) {
        showMessage(data.message || 'Registration failed', true);
        return;
      }

      showMessage('Account created! You can now sign in.');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setIsLogin(true);
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Signup error:', err);
      showMessage('Network error – please try again', true);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showMessage('Email and password are required', true);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();
      if (!res.ok) {
        showMessage(data.message || 'Login failed', true);
        return;
      }

      showMessage(`Welcome back, ${data.user?.name || 'user'}!`);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setEmail('');
      setPassword('');
      // TODO: redirect to dashboard / home
      // window.location.href = '/dashboard';
    } catch (err) {
      console.error('Login error:', err);
      showMessage('Network error – please try again', true);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();

    if (!forgotEmail || !forgotEmail.includes('@')) {
      showMessage('Please enter a valid email address', true);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        showMessage(data.message || 'Request failed', true);
        return;
      }

      showMessage('If this email is registered, you will receive a reset link shortly.');
      setForgotEmail('');
      setShowForgot(false);
      // Optional redirect after success
      // setTimeout(() => window.location.href = '/', 2500);
    } catch (err) {
      console.error('Forgot password network error:', err);
      showMessage('Could not connect to the server – check your connection', true);
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password Screen
  if (showForgot) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
          <button
            onClick={() => setShowForgot(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium"
          >
            <ArrowLeft size={20} /> Back to Login
          </button>

          <h1 className="text-3xl font-bold text-center mb-2">Forgot Password?</h1>
          <p className="text-center text-gray-600 mb-8">
            Enter your email and we'll send you a reset link.
          </p>

          <form onSubmit={handleForgotSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-2xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        {isLogin ? (
          <>
            {/* SIGN IN FORM */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
              <p className="text-gray-500 mt-2">Sign in to continue shopping</p>
            </div>

            <form onSubmit={handleSignInSubmit} className="space-y-5">
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  Forgot your password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-2xl transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Please wait...' : 'Sign In'}
              </button>
            </form>
          </>
        ) : (
          <>
            {/* SIGN UP FORM */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
              <p className="text-gray-500 mt-2">Join our shopping community</p>
            </div>

            <form onSubmit={handleSignUpSubmit} className="space-y-5">
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-2xl transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Please wait...' : 'Sign Up'}
              </button>
            </form>
          </>
        )}

        {/* Toggle between Sign In and Sign Up */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;