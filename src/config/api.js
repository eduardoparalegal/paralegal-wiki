// src/config/api.js

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error de autenticación');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error en el logout');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/check`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'No autenticado');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Check auth error:', error);
      throw error;
    }
  }
};