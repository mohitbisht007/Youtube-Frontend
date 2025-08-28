import axios from "axios";

const api = axios.create();

// Request interceptor to attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to catch 401
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
      // instead of store.dispatch(logout())
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default api;
