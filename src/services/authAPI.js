// src/services/authAPI.js
import { API_URL } from '../config/api';

export const authAPI = {
  async login(credentials) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || 'Error en la autenticación'
        };
      }

      const data = await response.json();
      return {
        success: true,
        token: data.token,
        user: data.user
      };
    } catch (error) {
      console.error('Error en authAPI.login:', error);
      return {
        success: false,
        message: 'Error de conexión'
      };
    }
  }
};