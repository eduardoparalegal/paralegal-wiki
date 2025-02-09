const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://paralegal-wiki.onrender.com/api'
  : 'http://localhost:5000/api';

export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'  // Agregamos este header
        },
        body: JSON.stringify(credentials),
        credentials: 'include'  // Agregamos esto para manejar cookies
      });

      // Primero verificamos si la respuesta es OK
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      // Intentamos parsear la respuesta
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Login error details:', error);
      if (error.message.includes('JSON')) {
        throw new Error('Error de conexión con el servidor. Por favor, intenta más tarde.');
      }
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el registro');
      }

      return await response.json();
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }
};