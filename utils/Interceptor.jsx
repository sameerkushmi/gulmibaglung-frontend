import axios from "axios";

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
    (res) => res,
    async (error) => {

      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes("/auth/refresh")
      ) {

        originalRequest._retry = true;

        try {

          const { data } = await api.get("/api/auth/refresh-token");
          console.log("token refreshed : ", data.message)

          return api(originalRequest);

        } catch (err) {
          console.log('refresh error : ', err)
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );


  return api;
};

export default Interceptor;
