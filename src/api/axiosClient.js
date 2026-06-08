// axios.js
import axios from "axios";
import { isTokenValid, logout, getToken } from "../utils/auth";

// =========================
// AXIOS INSTANCE
// =========================
const axiosClient = axios.create({
  baseURL: "/api", 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// =========================
// RESPONSE INTERCEPTOR
// =========================
axiosClient.interceptors.response.use(
  (response) => {
    if (response.data && response.data.error) {
      console.log("ODOO RPC ERROR DETECTED:", response.data.error);
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
    console.log("AXIOS HARDWARE/NETWORK ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// =========================
// AUTH
// =========================
export async function loginConnect(db, usernameOrEmail, password) {
  try {
    const response = await axiosClient.post("/v1/auth/login", {
      jsonrpc: "2.0",
      method: "call",
      params: { db, login: usernameOrEmail, password },
    });
    return response.data?.result || response.data;
  } catch (error) {
    console.error("❌ [loginConnect] Exception:", error.message || error);
    throw error;
  }
}

export async function logout_disconnect() {
  try {
    await axiosClient.post("/v1/auth/logout");
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    localStorage.clear();
    window.location.href = "/login";
  }
}


export async function fetchEmployeeQrById(id) {
  try {
    const response = await axiosClient.get(`/v1/employees/${id}/qr_image`);
    return response.data?.result || response.data;
  } catch (error) {
    console.error("❌ Error fetching employee QR:", error.message);
    return null;
  }
}

// =========================
// OTHER RESOURCES
// =========================


// =========================
// ATTENDANCE
// =========================
export async function saveAttendance(payload) {
  try {
    const response = await axiosClient.post("/v1/attendance/save", {
      jsonrpc: "2.0",
      method: "call",
      params: payload,
    });
    return response.data?.result || response.data;
  } catch (error) {
    console.error("❌ Error saving attendance:", error.message);
    throw error;
  }
}

export async function fetchAttendanceBatchesList() {
  try {
    const response = await axiosClient.get("/v1/attendance/batchlist");
    return response.data?.result || response.data;
  } catch (error) {
    console.error("❌ Error fetching attendance batches:", error.message);
    throw error;
  }
}

export default axiosClient;
