import axios from 'axios';
import { message } from 'antd';

const API_BASE_URL = 'https://ai-resumebuilder-1-qff5.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor to attach JWT token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for unified error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';

    if (status === 401) {
      // Clear expired auth session
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        message.error('Session expired. Please log in again.');
        window.location.href = '/login';
      }
    } else if (status === 403) {
      message.error('You do not have permission to perform this action.');
    } else if (status >= 500) {
      message.error(`Server Error: ${errorMessage}`);
    }

    return Promise.reject(error);
  }
);

export default api;
