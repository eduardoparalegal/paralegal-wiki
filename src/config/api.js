login: async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(credentials),
      credentials: 'include'
    });

    // Si la respuesta no es JSON, capturamos el texto primero
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`El servidor respondió con un formato incorrecto: ${text.substring(0, 100)}...`);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
    }

    if (!data.token) {
      throw new Error('El servidor no devolvió un token válido');
    }

    return data;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Error al procesar la respuesta del servidor');
    }
    throw error;
  }
}