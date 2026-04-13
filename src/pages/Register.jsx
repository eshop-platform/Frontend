import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Make sure to npm install lucide-react
import API from '../api/axios';
import AuthLayout from '../components/AuthLayout';

export default function Register() {
    const [form, setForm] = useState({
        fullName: '', email: '', password: '', confirmPassword: '', role: 'user', adminSecret: ''
    });
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
        return setError("Passwords do not match!");
    }

    try {
        // Change confirmPassword to _confirmPassword
        // This tells ESLint: "I know I'm not using this, and that's okay."
        const { confirmPassword: _confirmPassword, ...submitData } = form;
        
        await API.post('/auth/register', submitData);
        navigate('/verify-email', { state: { email: form.email } });
    } catch (err) {
        setError(err.response?.data?.message || "Registration failed");
    }
};

    const inputStyle = "w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition backdrop-blur-sm";

    return (
        <AuthLayout title="Create Account">
            {error && (
                <p className="bg-red-500/20 text-red-100 border border-red-500/40 p-3 rounded-xl mb-4 text-sm text-center backdrop-blur-md">
                    {error}
                </p>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                <input 
                    className={inputStyle}
                    placeholder="Full Name" 
                    required
                    value={form.fullName}
                    onChange={e => setForm({...form, fullName: e.target.value})} 
                />

                <input 
                    className={inputStyle}
                    type="email" 
                    placeholder="Email Address" 
                    required
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})} 
                />
                
                {/* Password Field */}
                <div className="relative">
                    <input 
                        className={inputStyle}
                        type={showPass ? "text" : "password"} 
                        placeholder="Password" 
                        required
                        value={form.password}
                        onChange={e => setForm({...form, password: e.target.value})} 
                    />
                    <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                        {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                {/* Confirm Password Field */}
                <div className="relative">
                    <input 
                        className={inputStyle}
                        type={showConfirmPass ? "text" : "password"} 
                        placeholder="Confirm Password" 
                        required
                        value={form.confirmPassword}
                        onChange={e => setForm({...form, confirmPassword: e.target.value})} 
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                        {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                
                <select 
                    className={inputStyle}
                    value={form.role}
                    onChange={e => setForm({...form, role: e.target.value})}
                >
                    <option value="user" className="bg-gray-900">User Role</option>
                    <option value="admin" className="bg-gray-900">Admin Role</option>
                </select>

                {form.role === 'admin' && (
                    <input 
                        className="w-full p-3 bg-red-900/20 border border-red-500/30 rounded-xl text-white placeholder-red-200 focus:outline-none focus:ring-2 focus:ring-red-400 transition backdrop-blur-sm" 
                        placeholder="Enter Admin Secret Code" 
                        required
                        value={form.adminSecret}
                        onChange={e => setForm({...form, adminSecret: e.target.value})} 
                    />
                )}

                <button className="w-full bg-white text-black py-3 rounded-xl font-bold shadow-xl hover:bg-gray-200 transition-all active:scale-95 duration-200">
                    Register
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-300">
                Already have an account? <Link to="/login" className="text-white font-bold hover:underline">Login</Link>
            </p>
        </AuthLayout>
    );
}