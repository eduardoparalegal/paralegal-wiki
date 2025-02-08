// src/config/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const endpoints = {
  login: `${API_URL}/api/auth/login`,
  register: `${API_URL}/api/auth/register`,
  users: `${API_URL}/api/auth/users`
};

export default API_URL;