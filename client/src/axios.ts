import axios from 'axios';
import { AuthService } from "@genezio/auth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API base URL
});

// Set up the interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage or other secure storage
    const token = AuthService.getInstance().getUserToken();

    if (token) {
      // Add the Authorization header with the Bearer token
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
