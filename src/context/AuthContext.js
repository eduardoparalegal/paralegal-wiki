import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../config/api';
import Loader from '../components/Loader'; // Ruta corregida

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userData = await authAPI.checkAuth();
        setUser(userData);
      } catch (err) {
        console.error('Error checking auth:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authAPI.login(credentials);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      throw err;
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider 
      value={{
        user,
        login,
        logout,
        loading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };