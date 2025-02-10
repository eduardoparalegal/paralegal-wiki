const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
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

      const responseText = await response.text();
      console.log('Raw server response:', responseText);

      // Early check for potential HTML response
      if (responseText.includes('<!DOCTYPE') || responseText.includes('<html>')) {
        console.error('Received HTML instead of JSON');
        throw new Error('Respuesta del servidor no es JSON válido');
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        throw new Error('No se pudo parsear la respuesta del servidor');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Error de autenticación');
      }

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
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      });

      const responseText = await response.text();
      console.log('Logout raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Logout JSON parsing error:', parseError);
        throw new Error('No se pudo parsear la respuesta del logout');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Error en el logout');
      }

      return data;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/check`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      });

      const responseText = await response.text();
      console.log('Check auth raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Check auth JSON parsing error:', parseError);
        throw new Error('No se pudo parsear la respuesta de autenticación');
      }

      if (!response.ok) {
        throw new Error(data.message || 'No autenticado');
      }

      return data;
    } catch (error) {
      console.error('Check auth error:', error);
      throw error;
    }
  }
};