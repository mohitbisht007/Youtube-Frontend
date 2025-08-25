import axios from "axios";
import store from "../redux/store";
import { logout } from "../redux/Slices/authSlice";

const api = axios.create();

api.interceptors.response.use(
  response => response,
  error => {
    const isAuthRequest = error.config?.headers?.Authorization;
    if (
      isAuthRequest &&
      error.response &&
      error.response.status === 401 &&
      error.response.data?.message?.toLowerCase().includes("token")
    ) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default api;