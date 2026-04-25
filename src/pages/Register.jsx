import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postAuthJson } from "../lib/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fields = [
    { key: "fullName", label: "Full Name", type: "text", placeholder: "Jane Doe" },
    { key: "email", label: "Email Address", type: "email", placeholder: "jane@example.com" },
    { key: "password", label: "Password", type: "password", placeholder: "********" },
    { key: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "********" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (form.password !== form.confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      setLoading(true);

      const DEMO_MODE = false;

      if (DEMO_MODE) {
        console.log("Demo register:", form);

        setTimeout(() => {
          setMessage("Demo: OTP sent to email");
          navigate("/verify-email", { state: { email: form.email } });
        }, 1000);

        return;
      }

      await postAuthJson("/register", {
        username: form.fullName,
        email: form.email,
        password: form.password
      });

      setMessage("Account created successfully. You can sign in now.");
      navigate("/login");
    } catch (err) {
      setMessage(err.message || "Registration failed");
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
          {message && (
            <p className="text-sm text-center mb-3 text-gray-700">
              {message}
            </p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {fields.map((field, i) => (
              <div key={i}>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  {field.label}
                </label>

                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={(e) =>
                    setForm({ ...form, [field.key]: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-950 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-950 text-white py-3.5 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors mt-2"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-gray-950 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
