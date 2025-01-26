import React, { createContext, useContext, useState, useEffect } from 'react';
import Loader from '../components/Loader'; // Import the new Loader component

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Optional: Validate token with backend
          // const response = await validateTokenWithBackend(token);
          // if (response.valid) {
            setUser({ token });
          // }
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
      // Replace with actual login API call
      // const response = await loginAPI(credentials);
      // const { token } = response;
      const token = 'mock-token'; // Simulated token
      
      localStorage.setItem('token', token);
      setUser({ token });
      setError(null);
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

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};