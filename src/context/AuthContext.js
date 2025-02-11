// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../config/api';
import Loader from '../components/Loader'; // Fixed import path

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    const checkAuthentication = async () => {
      try {
        const userData = await authAPI.checkAuth();
        setUser(userData.user);
      } catch (err) {
        console.error('Error checking auth:', err);
        localStorage.removeItem('token');
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
      if (response.token) {
        localStorage.setItem('token', response.token);
        setUser(response.user);
      }
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      localStorage.removeItem('token');
      setUser(null);
    } catch (err) {
      console.error('Error during logout:', err);
      localStorage.removeItem('token');
      setUser(null);
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
        error,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };