import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: `${baseUrl}/api`,
});

// Tambahkan interceptor untuk menyertakan token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
