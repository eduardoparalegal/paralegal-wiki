const BASE_URL = 'https://paralegal-wiki.onrender.com/api';

export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });

      const responseData = await response.text();
      console.log('Raw server response:', responseData);

      if (!response.ok) {
        const errorData = JSON.parse(responseData);
        throw new Error(errorData.message || 'Error de autenticación');
      }

      return JSON.parse(responseData);
    } catch (error) {
      console.error('Login error details:', error);
      throw error;
    }
  },
  // Resto del código permanece igual
};  