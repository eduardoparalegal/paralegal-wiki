// src/config/api.js
const API_URL = 'https://backend-wiki-paralegal.onrender.com/api';
const handleResponse = async (response) => {
  try {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    
    if (!response.ok) {
      if (isJson) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error del servidor: ${response.status}`);
      } else {
        throw new Error(`Error del servidor: ${response.status}`);
      }
    }
    
    if (isJson) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.error('Error completo:', error);
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
        credentials: 'include',
        body: JSON.stringify(credentials)
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
      throw error;
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem('token');
      return { success: true };
    } catch (error) {
      console.error('Error de logout:', error);
      localStorage.removeItem('token');
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró el token');
      }
      
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        credentials: 'include'
      });
      
      return handleResponse(response);
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      localStorage.removeItem('token');
      throw error;
    }
  }
};