import axios from "axios";

const axiosClient = axios.create({
  // ✅ FIXED: Keeps the prefix for Vite proxy to intercept
  baseURL: '/api', 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// ========================= // RESPONSE INTERCEPTOR // ========================= 
axiosClient.interceptors.response.use(
  (response) => {
    // ✅ FIXED: Extracts string messages from nested Odoo JSON-RPC error objects
    if (response.data && response.data.error) {
      console.log("ODOO RPC ERROR DETECTED:", response.data.error);
      
      const errorMessage = response.data.error.message || response.data.error;
      return Promise.reject(new Error(errorMessage));
    }
    return response;
  },
  (error) => {
    console.log("AXIOS ERROR:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ========================= // LOGIN // ========================= 
export async function loginConnect(db, usernameOrEmail, password) {
  try {
    console.log("👉 [STEP 1: login_connect] Sending clean JSON payload...");

    // ✅ FIXED: Sending standard JSON object structured with a 'params' block
    const response = await axiosClient.post("/v1/auth/login", {
      jsonrpc: "2.0",
      method: "call",
      params: { 
        db: db, 
        login: usernameOrEmail, 
        password: password 
      }
    });

    console.log("👉 [STEP 2: login_connect] Server payload arrived:", response.data);
    return response.data; 

  } catch (error) {
    console.error("❌ [STEP 2e: login_connect] Request failed:", error.message || error);
    throw error; 
  }
}


// ========================= // LOGOUT // ========================= 
export async function logout_disconnect() {
  try {
    // ✅ FIXED: Verified path matches standard structure combined with /api prefix
    await axiosClient.post("/v1/auth/logout");
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    localStorage.clear(); 
    window.location.href = "/login";
  }
}

// async function fetchEmployees() {

//   try {

//     const response = await axios.get(
//       "/api/v1/employees"
//     );

//     console.log(response.data);

//     return response.data;

//   } catch (error) {

//     console.log(error);

//   }
// }

// ✅ FIXED: Changed 'axios' to your custom configured 'axiosClient' instance
// export async function fetchEmployees() {
//   try {
//     const response = await axiosClient.get("/v1/employees"); // Combines with /api base URL -> /api/v1/employees
//     console.log("👉 RAW EMPLOYEE API RESPONSE:", response.data);
//     return response.data; 
//   } catch (error) {
//     // Left empty here so the component's catch block can catch network or auth drops
//     throw error; 
//   }
// }


// fetchEmployees();

export default axiosClient;
