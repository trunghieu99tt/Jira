import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from '@config/secret';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
const client = axios.create({
  baseURL: API_URL || 'http://localhost:3000/api/',
  headers,
});

client.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

export default client;
