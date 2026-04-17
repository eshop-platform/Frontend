import { useNavigate } from 'react-router-dom';

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-[#0a0a0a]">
      <h1 className="text-4xl font-bold mb-4">🎉 Order Successful!</h1>
      <p className="text-white/60 mb-6">Thank you for your purchase.</p>

      <button
        onClick={() => navigate('/')}
        className="bg-white text-black px-6 py-3 rounded"
      >
        Back to Home
      </button>
    </div>
  );
}