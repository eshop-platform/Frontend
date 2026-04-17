import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import API from '../api/axios';
import { useStore } from '../store/useStore'; // Updated to Zustand
import AuthLayout from '../components/AuthLayout';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    
    const login = useStore((state) => state.login); // Zustand Action
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await API.post('/auth/login', { email, password });
            
            // data should contain user object and token
            login(data.user || data); 
            
            navigate(data.role === 'admin' ? '/admin' : '/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    const inputStyle = "w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition backdrop-blur-sm";

    return (
        <AuthLayout title="Welcome Back">
            {error && <p className="bg-red-500/20 text-red-200 border border-red-500/50 p-3 rounded-xl mb-4 text-sm text-center">{error}</p>}
            
            <form onSubmit={handleLogin} className="space-y-4">
                <input 
                    className={inputStyle}
                    type="email" 
                    placeholder="Email" 
                    required
                    onChange={e => setEmail(e.target.value)} 
                />
                
                <div className="relative">
                    <input 
                        className={inputStyle}
                        type={showPass ? "text" : "password"} 
                        placeholder="Password" 
                        required
                        onChange={e => setPassword(e.target.value)} 
                    />
                    <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                        {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <button className="w-full bg-white text-black py-3 rounded-xl font-bold shadow-xl hover:bg-gray-200 transition-all active:scale-95">
                    Login
                </button>
            </form>

            <div className="mt-6 flex flex-col items-center gap-2 text-sm">
                <Link to="/forgot-password" className="text-white/60 hover:text-white transition underline underline-offset-4">
                    Forgot Password?
                </Link>
                <span className="text-gray-400">
                    No account? <Link to="/register" className="text-white font-bold hover:underline">Create one</Link>
                </span>
            </div>
        </AuthLayout>
    );
}