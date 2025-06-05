import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Bearer token to all api requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle API errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);

    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// Third-party public API (i.e. countries)
export const countryApiClient = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 5000,
});

countryApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Country API Error:', error.message);
    return Promise.reject(error);
  }
);
