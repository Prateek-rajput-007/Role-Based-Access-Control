
import { createContext, useState, useEffect } from 'react';
import apiClient from '@/api/apiClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await apiClient.get('/auth/verify');
          setUser(res.data.user);
        } catch (err) {
          console.error('Token verification failed:', err.response?.data || err.message);
          localStorage.removeItem('token');
          delete apiClient.defaults.headers.common['Authorization'];
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    verifyToken();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete apiClient.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
