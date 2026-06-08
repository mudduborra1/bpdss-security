// src/api/axiosClient.js
import axios from "axios";
import { isTokenValid, logout, getToken } from "../utils/auth"; // ✅ correct relative path

// =========================
// AXIOS INSTANCE
// =========================
const axiosClient = axios.create({
  baseURL: "/api", // ✅ use proxy prefix instead of hardcoded localhost
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// =========================
// REQUEST INTERCEPTOR
// =========================
axiosClient.interceptors.request.use((config) => {
  if (!isTokenValid()) {
    logout();
    return Promise.reject("Token expired");
  }
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =========================
// RESPONSE INTERCEPTOR
// =========================
axiosClient.interceptors.response.use(
  (response) => {
    if (response.data && response.data.error) {
      const errDetail =
        response.data.error.data?.message ||
        response.data.error.message ||
        response.data.error;
      const rpcError = new Error(errDetail);
      rpcError.rpcData = response.data.error;
      return Promise.reject(rpcError);
    }
    return response;
  },
  (error) => {
    console.error("AXIOS ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
