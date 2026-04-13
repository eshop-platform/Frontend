import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // 1. Compute initial state immediately. 
    // This removes the need for useEffect and the 'loading' state.
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        return (storedUser && token) ? JSON.parse(storedUser) : null;
    });

    const navigate = useNavigate();

    const login = (userData) => {
        localStorage.setItem('token', userData.token);
        // We ensure we store exactly what the frontend needs
        const userObj = { 
            name: userData.user?.firstName || userData.name, 
            role: userData.role 
        };
        localStorage.setItem('user', JSON.stringify(userObj));
        setUser(userObj);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);