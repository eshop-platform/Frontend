import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Simple Navbar */}
            <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-indigo-600">E-Shop Auth</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">Welcome, <b>{user?.name}</b></span>
                    <button 
                        onClick={logout}
                        className="bg-red-500 text-white px-4 py-1 rounded text-sm hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Content */}
            <main className="p-8 max-w-4xl mx-auto">
                <div className="bg-white p-10 rounded-xl shadow-md border border-gray-100">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-4">User Dashboard</h2>
                    <p className="text-gray-600 mb-6">
                        You have successfully logged into the system. This area is protected by our JWT authentication system.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-indigo-50 rounded-lg">
                            <h3 className="font-bold text-indigo-700">Account Role</h3>
                            <p className="capitalize text-indigo-600">{user?.role}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <h3 className="font-bold text-green-700">Status</h3>
                            <p className="text-green-600">Email Verified ✅</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}