import axios from "axios";

import { isLoggedOut, loginUser } from "./globalLogout";

const Interceptor = (headers = {}) => {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    if (!(config.data instanceof FormData)) {
      config.headers = {
        ...config.headers,
        ...headers,
        "Content-Type": "application/json",
      };
    } else {
      config.headers = {
        ...config.headers,
        ...headers,
      };
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry && !isLoggedOut) {
        originalRequest._retry = true;
        try {
          await api.get("/api/auth/refresh-token"); // backend sets new cookie
          loginUser()
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token failed", refreshError);
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};

export default Interceptor;
