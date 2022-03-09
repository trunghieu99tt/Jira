import axios, { AxiosRequestConfig } from 'axios';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
const client = axios.create({
  baseURL: 'http://localhost:3020/api/v1',
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
