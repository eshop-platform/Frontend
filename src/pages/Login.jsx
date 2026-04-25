import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { postAuthJson } from "../lib/authApi";

const ADMIN_APP_URL = import.meta.env.VITE_ADMIN_APP_URL || "http://127.0.0.1:5174";

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await postAuthJson("/login", form);

      login(data);
      setMessage("Login successful");

      if (data.user?.role === "admin") {
        window.location.assign(ADMIN_APP_URL);
        return;
      }

      navigate("/");
    } catch (err) {
      setMessage(err.message || "Login failed");
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
          {message && (
            <p className="text-center text-sm text-gray-600 mb-3">
              {message}
            </p>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-950 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide">
                  Password
                </label>
              </div>

              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-950 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                placeholder="********"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-950 text-white py-3.5 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors mt-2"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-semibold text-gray-950 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
