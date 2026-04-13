import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import AuthLayout from '../components/AuthLayout';

export default function ResetPassword() {
    const [formData, setFormData] = useState({ otp: '', newPassword: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    // Handle case where user navigates directly to this page without an email
    if (!email) {
        return (
            <AuthLayout title="Access Denied">
                <div className="text-center space-y-4">
                    <p className="text-red-200 bg-red-500/20 p-4 rounded-xl border border-red-500/50">
                        Please start from the Forgot Password page to receive a code.
                    </p>
                    <Link to="/login" className="block text-white font-bold hover:underline">
                        Back to Login
                    </Link>
                </div>
            </AuthLayout>
        );
    }

    const handleReset = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await API.post('/auth/reset-password', { 
                email, 
                otp: formData.otp, 
                newPassword: formData.newPassword 
            });
            // Navigating with state so the Login page can show a success message if you want
            navigate('/login', { state: { message: "Password updated successfully!" } });
        } catch (err) {
            setError(err.response?.data?.message || "Reset failed. Check your code.");
        }
    };

    const inputStyle = "w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition backdrop-blur-sm";

    return (
        <AuthLayout title="Reset Password">
            {error && (
                <p className="bg-red-500/20 text-red-100 border border-red-500/40 p-3 rounded-xl mb-4 text-sm text-center backdrop-blur-md">
                    {error}
                </p>
            )}

            <form onSubmit={handleReset} className="space-y-6" autoComplete="off">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">
                        6-Digit Code
                    </label>
                    <input 
                        className={`${inputStyle} text-center text-2xl tracking-[0.5rem]`}
                        maxLength="6"
                        placeholder="000000"
                        required
                        value={formData.otp}
                        onChange={e => setFormData({...formData, otp: e.target.value})} 
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest ml-1">
                        New Password
                    </label>
                    <input 
                        className={inputStyle}
                        type="password" 
                        placeholder="••••••••" 
                        required
                        autoComplete="new-password"
                        value={formData.newPassword}
                        onChange={e => setFormData({...formData, newPassword: e.target.value})} 
                    />
                </div>

                <button className="w-full bg-white text-black py-3 rounded-xl font-bold shadow-xl hover:bg-gray-200 transition-all active:scale-95 uppercase tracking-widest">
                    Update Password
                </button>
            </form>
            
            <div className="mt-6 text-center">
                <Link to="/login" className="text-xs text-white/60 hover:text-white transition uppercase tracking-tighter">
                    Back to Login
                </Link>
            </div>
        </AuthLayout>
    );
}