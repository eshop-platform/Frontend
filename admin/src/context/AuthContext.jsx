import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            setUser(null);
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        if (data.success) {
          // Only allow admins to stay in the admin dashboard
          if (data.user.role === 'admin') {
            setUser(data.user);
          } else {
            console.warn('Access denied: Not an admin');
            setUser(null);
            localStorage.removeItem('token');
            window.location.href = 'http://localhost:5173';
          }
        } else {
          localStorage.removeItem('token');
          setUser(null);
        }
      } catch (err) {
        console.error('Session verification failed:', err);
        // Don't remove token on network error, just stop loading
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = 'http://localhost:5173/login';
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
