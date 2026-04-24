import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-email",
        {
          email: state?.email,
          otp,
        }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      setMessage(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl border w-full max-w-md">

        <h2 className="text-xl font-bold mb-4">Verify Your Email</h2>

        <p className="text-sm text-gray-500 mb-4">
          Enter the OTP sent to your email
        </p>

        {message && (
          <p className="text-sm text-center mb-3 text-gray-700">
            {message}
          </p>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl bg-gray-50"
          />

          <button className="w-full bg-gray-950 text-white py-3 rounded-full">
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;