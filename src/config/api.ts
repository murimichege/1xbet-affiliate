import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const baseURL = '/api';
const internalApiBaseURL = import.meta.env.VITE_INTERNAL_API_BASE_URL;
const cookieValue = import.meta.env.VITE_BETKUMI_COOKIE;
const hostValue = import.meta.env.VITE_HOST;

// Set cookie in browser
if (cookieValue) {
  cookies.set('ta', cookieValue, {
    path: '/',
    secure: true,
    sameSite: 'none', // Required for cross-origin
    // domain: 'betkumi.co.ke', // only if you're on https://betkumi.co.ke
  });
}

// ----------------------
// Betkumi External API (via proxy)
// ----------------------
export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true, // Important for sending cookies when using axios
  headers: {
    'Content-Type': 'application/json',
    'Accept-Api-Version': '70',
  },
});

//  REQUEST INTERCEPTOR
apiClient.interceptors.request.use(config => {
  // Add the cookie manually to headers as backup
  if (cookieValue) {
    config.headers = config.headers || {};
    config.headers['Cookie'] = `ta=${cookieValue}`;
  }
  
  // Add host header if specified
  if (hostValue) {
    config.headers = config.headers || {};
    config.headers['Host'] = hostValue;
  }
  
  return config;
});

//RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    return Promise.reject(err);
  }
);

// ----------------------
// Internal API
// ----------------------
export const internalApiClient = axios.create({
  baseURL: internalApiBaseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

internalApiClient.interceptors.request.use(config => {
  return config;
});

internalApiClient.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ----------------------
// Country API
// ----------------------
export const countryApiClient = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 5000,
});