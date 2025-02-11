// src/config/api.js
const API_URL = process.env.REACT_APP_API_URL || 'https://backend-wiki-paralegal.onrender.com';

const handleResponse = async (response) => {
  try {
    // Si la respuesta no es ok, intentamos obtener el mensaje de error
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `Error del servidor: ${response.status}`
      }));
      throw new Error(errorData.message || 'Error del servidor');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error completo:', error);
    if (error.name === 'SyntaxError') {
      throw new Error('Error de conexión con el servidor');
    }
    throw error;
  }
};

export const authAPI = {
  login: async (credentials) => {
    try {
      console.log('Intentando login con URL:', `${API_URL}/auth/login`);
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password
        })
      });
      
      console.log('Respuesta del servidor:', response.status);
      const data = await handleResponse(response);
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      } else {
        throw new Error('No se recibió un token válido');
      }
    } catch (error) {
      console.error('Error detallado del login:', error);
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
        }
      });
      
      await handleResponse(response);
      localStorage.removeItem('token');
      return { success: true };
    } catch (error) {
      console.error('Error de logout:', error);
      localStorage.removeItem('token'); // Limpiar token incluso si hay error
      throw error;
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
        }
      });
      
      return handleResponse(response);
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      localStorage.removeItem('token');
      throw error;
    }
  }
};