// 1. src/config/api.js
const BASE_URL = 'https://paralegal-wiki.onrender.com/api';

export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include' // Importante para cookies
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        throw new Error('Error en la autenticación');
      }

      const data = await response.json();
      console.log('Login response:', data);
      return data;
    } catch (error) {
      console.error('Login error details:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Error en el logout');
      }

      return await response.json();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/check`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('No autenticado');
      }

      return await response.json();
    } catch (error) {
      console.error('Check auth error:', error);
      throw error;
    }
  }
};