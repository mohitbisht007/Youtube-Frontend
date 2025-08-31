// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://youtube-backend-bl51.onrender.com"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }
  return config;
});

export const setupInterceptors = (store) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const isAuthRequest = error.config?.headers?.Authorization;
      if (
        isAuthRequest &&
        error.response &&
        error.response.status === 401 &&
        error.response.data?.message?.toLowerCase().includes("token")
      ) {
        store.dispatch({ type: "user/logout" });
      }
      return Promise.reject(error);
    }
  );
};

export default api;
