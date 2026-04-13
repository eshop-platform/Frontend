import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <nav className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
                <h1 className="text-xl font-mono font-bold text-red-500">ADMIN PANEL</h1>
                <button 
                    onClick={logout}
                    className="bg-slate-700 hover:bg-red-600 px-4 py-1 rounded transition"
                >
                    Exit Session
                </button>
            </nav>

            <main className="p-10">
                <div className="mb-8">
                    <h2 className="text-4xl font-bold">Welcome back, Commander {user?.name}</h2>
                    <p className="text-slate-400 mt-2">Sensitive system metrics and user management are available below.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <span className="text-slate-400 text-sm">Total Users</span>
                        <p className="text-3xl font-bold">1,284</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <span className="text-slate-400 text-sm">Security Logs</span>
                        <p className="text-3xl font-bold text-green-400">Stable</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <span className="text-slate-400 text-sm">Admin Secret</span>
                        <p className="text-3xl font-bold text-yellow-500">Active</p>
                    </div>
                </div>
            </main>
        </div>
    );
}