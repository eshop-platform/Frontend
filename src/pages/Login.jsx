import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await API.post('/auth/login', { email, password });
            login(data);
            navigate(data.role === 'admin' ? '/admin' : '/');
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <AuthLayout title="Welcome Back">
            {error && <p className="bg-red-500/20 text-red-200 border border-red-500/50 p-2 rounded mb-4 text-sm text-center">{error}</p>}
            
            <form onSubmit={handleLogin} className="space-y-4">
                <input 
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" 
                    type="email" 
                    placeholder="Email" 
                    required
                    onChange={e => setEmail(e.target.value)} 
                />
                <input 
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition" 
                    type="password" 
                    placeholder="Password" 
                    required
                    onChange={e => setPassword(e.target.value)} 
                />
                <button className="w-full bg-stone-800 hover:bg-stone-500 text-white py-3 rounded-lg font-bold shadow-lg transition duration-200">
    Login
</button>

            </form>

            <div className="mt-6 flex flex-col items-center gap-2 text-sm text-gray-300">
                <Link to="/forgot-password" opacity-80 hover:opacity-100 className=" text-stone-900 font-bold hover:text-white transition">
                    Forgot Password?
                </Link>
                <span>
                    No account? <Link to="/register" className="text-stone-900 font-bold hover:text-white transition">Create one</Link>
                </span>
            </div>
        </AuthLayout>
    );
}