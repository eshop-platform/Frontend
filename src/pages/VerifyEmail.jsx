import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import AuthLayout from '../components/AuthLayout';

export default function VerifyEmail() {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    const handleVerify = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await API.post('/auth/verify-email', { email, otp });
            // Using a cleaner approach than a browser alert
            navigate('/login', { state: { message: "Email verified! Please login." } });
        } catch (err) {
            setError(err.response?.data?.message || "Verification failed");
        }
    };

    return (
        <AuthLayout title="Verify Email">
            <div className="text-center space-y-4">
                <p className="text-gray-300 text-sm">
                    Please enter the 6-digit code sent to: <br />
                    <span className="text-white font-semibold">{email || "your email"}</span>
                </p>

                {error && (
                    <p className="bg-red-500/20 text-red-200 border border-red-500/40 p-2 rounded-lg text-xs">
                        {error}
                    </p>
                )}
                
                <form onSubmit={handleVerify} className="space-y-6">
                    <input 
                        className="w-full bg-white/10 border border-white/20 p-4 rounded-xl text-center text-3xl tracking-[0.8rem] text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition backdrop-blur-sm"
                        maxLength="6" 
                        placeholder="000000"
                        value={otp}
                        onChange={e => setOtp(e.target.value)} 
                        required 
                    />
                    
                    <button className="w-full bg-white text-black py-3 rounded-xl font-bold shadow-xl hover:bg-gray-200 transition-all active:scale-95 duration-200 uppercase tracking-widest">
                        Verify Code
                    </button>
                </form>

                <button 
                    onClick={() => navigate('/register')}
                    className="text-xs text-gray-400 hover:text-white transition uppercase tracking-tighter"
                >
                    Entered wrong email? Go back
                </button>
            </div>
        </AuthLayout>
    );
}