// src/api.js
import axios from 'axios';

// Create an Axios instance with default configuration
const api = axios.create({
  baseURL: 'https://dc.strideton.io/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Set up request and response interceptors
api.interceptors.request.use(
  (config) => {
    // Modify config before request is sent, if needed
    // e.g., add authorization token
    const token = localStorage.getItem('token') || '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response errors globally, if needed
    return Promise.reject(error);
  }
);

export default api;
