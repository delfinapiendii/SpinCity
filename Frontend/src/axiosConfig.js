// src/axiosConfig.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://spincitybackend.onrender.com', // Asegúrate de que esta URL apunte a tu backend
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Puedes manejar errores globalmente aquí
    return Promise.reject(error);
  }
);

export default axiosInstance;
