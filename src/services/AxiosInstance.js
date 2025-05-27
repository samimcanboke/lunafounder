import axios from "axios";
import { store } from "../store/store";

const axiosInstance = axios.create({
  baseURL: "https://api.lunafounder.io/api",
});

// detect ?dev=true in the current window URL
const isDev = new URLSearchParams(window.location.search).get("dev") === "true";

// inject dev flag into every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (isDev) {
    config.params = { ...(config.params || {}), dev: true };
  }
  return config;
});

export default axiosInstance;
