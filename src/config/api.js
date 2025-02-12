const API_URL = process.env.REACT_APP_API_URL || 'https://backend-wiki-paralegal.onrender.com';

export const authAPI = {
  login: async (credentials) => {
    try {
      console.log('Intentando login con URL:', `${API_URL}/api/auth/login`); // Asegúrate de que la ruta sea correcta
      
      const response = await fetch(`${API_URL}/api/auth/login`, {
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
};