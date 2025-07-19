// src/axiosConfig.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Asegúrate de que esta URL apunte a tu backend
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Puedes manejar errores globalmente aquí
    return Promise.reject(error);
  }
);

export default axiosInstance;
