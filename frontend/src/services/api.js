import axios from 'axios';

const API = axios.create({
  baseURL: '/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('r2r_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMsg = error.response?.data?.error || error.message || 'An unexpected error occurred.';
    return Promise.reject(new Error(errorMsg));
  }
);

export default API;
