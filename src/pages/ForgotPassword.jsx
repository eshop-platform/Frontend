import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAuthJson } from "../lib/authApi";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await postAuthJson("/forgot-password", { email });

      setMessage(data.message);

      // go to reset page
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1000);

    } catch (err) {
      setMessage(err.message || "Error sending OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl border w-full max-w-md">

        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

        {message && (
          <p className="text-sm text-center mb-3 text-gray-700">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl bg-gray-50"
          />

          <button className="w-full bg-gray-950 text-white py-3 rounded-full">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
