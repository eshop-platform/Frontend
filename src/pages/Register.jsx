import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [pendingEmail, setPendingEmail] = useState('');
  const [needsVerification, setNeedsVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, verifyEmail } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      return toast('Please fill all fields', 'error');
    }
    if (password !== confirmPassword) {
      return toast('Passwords do not match', 'error');
    }
    if (password.length < 8) {
      return toast('Password must be at least 8 characters', 'error');
    }

    setLoading(true);
    try {
      const data = await register(username, email, password);

      if (data?.requiresVerification) {
        setNeedsVerification(true);
        setPendingEmail(email);
        toast(data.message || 'Enter the verification code sent to your email', 'success');
      } else {
        toast('Welcome to PRIME COMMERCE!', 'success');
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    const otp = verificationCode.trim();
    if (!otp) {
      return toast('Please enter your verification code', 'error');
    }

    setLoading(true);
    try {
      const data = await verifyEmail(pendingEmail, otp);
      toast(data.message || 'Email verified successfully!', 'success');
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      toast(err.message || 'Verification failed', 'error');
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
          <h2 className="text-3xl font-bold text-gray-950 mt-6 mb-2">Create an account</h2>
          <p className="text-gray-500 text-sm">Join thousands of happy customers</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {!needsVerification ? (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="johndoe"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-950 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-950 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-950 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="********"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-950 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-950 text-white py-3.5 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors mt-2 disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={handleVerifySubmit}>
              <p className="text-sm text-gray-500">
                Enter the verification code sent to <span className="font-medium text-gray-700">{pendingEmail}</span>.
              </p>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Verification Code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-950 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-950 text-white py-3.5 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors mt-2 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
            </form>
          )}

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-gray-950 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
