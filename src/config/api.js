// src/config/api.js
const API_URL = import.meta.env.VITE_API_URL || 'https://backend-wiki-paralegal.onrender.com';

const handleResponse = async (response) => {
  try {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error del servidor');
    }
    return data;
  } catch (error) {
    if (error.name === 'SyntaxError') {
      throw new Error('Error de conexión con el servidor');
    }
    throw error;
  }
};

export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(credentials),
      });
      
      return handleResponse(response);
    } catch (error) {
      console.error('Error de login:', error);
      throw new Error(error.message || 'Error al conectar con el servidor');
    }
  },

  logout: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No hay sesión activa');
      }

      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });
      
      return handleResponse(response);
    } catch (error) {
      console.error('Error de logout:', error);
      throw new Error(error.message || 'Error al cerrar sesión');
    }
  },

  checkAuth: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró el token');
      }
      
      const response = await fetch(`${API_URL}/auth/check`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
      });
      
      return handleResponse(response);
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      throw new Error(error.message || 'Error al verificar la autenticación');
    }
  },
};