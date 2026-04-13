import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import AuthLayout from '../components/AuthLayout';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await API.post('/auth/forgot-password', { email });
            // Redirect to reset page and pass email in state
            navigate('/reset-password', { state: { email } });
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Forgot Password?">
            <div className="text-center mb-6">
                <p className="text-gray-300 text-sm leading-relaxed">
                    Enter your email and we'll send you a <br />
                    <span className="text-white font-semibold text-base">6-digit code</span> to reset your password.
                </p>
            </div>

            {error && (
                <p className="bg-red-500/20 text-red-100 border border-red-500/40 p-3 rounded-xl mb-4 text-sm text-center backdrop-blur-md">
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                <input 
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition backdrop-blur-sm" 
                    type="email" 
                    placeholder="Email Address" 
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                    required 
                />
                
                <button 
                    disabled={loading}
                    className="w-full bg-white text-black py-3 rounded-xl font-bold shadow-xl hover:bg-gray-200 transition-all active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed uppercase tracking-widest"
                >
                    {loading ? 'Sending Code...' : 'Send Reset Code'}
                </button>
            </form>

            <div className="mt-8 text-center">
                <Link 
                    to="/login" 
                    className="text-xs text-white/60 hover:text-white transition uppercase tracking-widest font-bold"
                >
                    &larr; Back to Login
                </Link>
            </div>
        </AuthLayout>
    );
}