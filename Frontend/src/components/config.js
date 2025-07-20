export const API_URL = process.env.REACT_APP_API_URL || 'https://spincitybackend.onrender.com';  // URL de tu API

export const API_ENDPOINTS = {
    login: `${API_URL}/api/v1/auth/authenticate` ,
    register: `${API_URL}/api/v1/auth/register`,
    // Añadir otros endpoints si es necesario
};
