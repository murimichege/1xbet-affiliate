import axios from 'axios';

const API_CONFIG = {
  development: 'http://localhost:3001/api',
  production: 'https://your-production-api.com/api',
  staging: 'https://staging-api.com/api'
};

// Determine environment (you can customize this logic)
const getCurrentApiUrl = (): string => {
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return API_CONFIG.development;
  } else if (hostname.includes('staging')) {
    return API_CONFIG.staging;
  } else {
    return API_CONFIG.production;
  }
};

export const apiClient = axios.create({
  baseURL: getCurrentApiUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// External third-party API (for fetching countries)
export const countryApiClient = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 5000,
});

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Handle auth errors
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

countryApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Country API Error:', error.message);
    return Promise.reject(error);
  }
);