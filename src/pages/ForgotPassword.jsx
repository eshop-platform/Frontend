import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postAuthJson } from "../lib/authApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const data = await postAuthJson("/forgot-password", { email });
      setMessage(data.message);
      setTimeout(() => navigate("/reset-password", { state: { email } }), 1500);
    } catch (err) {
      setError(err.message || "Error sending reset code");
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
          <h2 className="text-3xl font-bold text-gray-950 mt-6 mb-2">Forgot password?</h2>
          <p className="text-gray-500 text-sm">Enter your email and we'll send you a reset code</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {message && <p className="text-sm text-green-600 text-center mb-4">{message}</p>}
          {error && <p className="text-sm text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
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
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-950 text-white py-3.5 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Remember your password?{" "}
            <Link to="/login" className="font-semibold text-gray-950 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
