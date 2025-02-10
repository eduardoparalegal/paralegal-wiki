import React, { createContext, useContext, useState, useEffect } from 'react';
import Loader from '../components/Loader';
import { authAPI } from '../config/api';

// Create context with a default value
const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: () => {},
  loading: true,
  error: null
});

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          setUser({ token });
        }
      } catch (err) {
        setError(err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { token } = response;

      if (!token) {
        throw new Error('Token no recibido del servidor');
      }

      localStorage.setItem('token', token);
      setUser({ token });
      setError(null);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return <Loader />;
  }

  const value = {
    user,
    login,
    logout,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export both the provider and the hook
export { AuthContext };