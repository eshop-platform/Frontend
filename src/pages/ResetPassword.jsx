import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    otp: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        {
          email: state?.email,
          otp: form.otp,
          newPassword: form.newPassword,
        }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      setMessage(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl border w-full max-w-md">

        <h2 className="text-xl font-bold mb-4">Reset Password</h2>

        {message && (
          <p className="text-sm text-center mb-3 text-gray-700">
            {message}
          </p>
        )}

        <form onSubmit={handleReset} className="space-y-4">

          <input
            type="text"
            placeholder="Enter OTP"
            value={form.otp}
            onChange={(e) =>
              setForm({ ...form, otp: e.target.value })
            }
            className="w-full px-4 py-3 border rounded-xl bg-gray-50"
          />

          <input
            type="password"
            placeholder="New Password"
            value={form.newPassword}
            onChange={(e) =>
              setForm({ ...form, newPassword: e.target.value })
            }
            className="w-full px-4 py-3 border rounded-xl bg-gray-50"
          />

          <button className="w-full bg-gray-950 text-white py-3 rounded-full">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;