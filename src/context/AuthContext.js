const login = async (credentials) => {
  try {
    const response = await authAPI.login(credentials);
    if (!response || !response.token) {
      throw new Error('Respuesta inválida del servidor');
    }
    
    localStorage.setItem('token', response.token);
    setUser({ token: response.token });
    setError(null);
  } catch (err) {
    setError(err.message || 'Error durante el inicio de sesión');
    throw err;
  }
};