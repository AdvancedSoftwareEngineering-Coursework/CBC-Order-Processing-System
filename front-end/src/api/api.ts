import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5121/api', // Base URL for your API
  timeout: 10000, // Request timeout (optional)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
