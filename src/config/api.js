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
        },
        body: JSON.stringify(credentials),
      });

      const text = await response.text();
      console.log('Respuesta del servidor:', text);

      if (!response.ok) {
        let errorMessage = 'Error en el login';
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = JSON.parse(text);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error en el registro');
      }

      return await response.json();
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },
};