import Axios from "axios";
import { data } from "react-router-dom";

// =========================
// AXIOS INSTANCE
// =========================
const axiosClient = Axios.create({

  baseURL: "http://localhost:8069",

  withCredentials: true,

  headers: {
    "Content-Type":
      "application/json",
  },

  timeout: 15000,
});



// =========================
// FETCH EMPLOYEES
// =========================

export async function fetchEmployees() {
  try {
    const response = await Axios.get("/api/v1/employees");

    console.log("✅ API RESPONSE:", response);

    return response.data; // ✅ RETURN FULL RESPONSE
  } catch (error) {
    console.error("❌ API ERROR:", error);
    return [];
  }
}

export async function fetchEmployeeById(id) {
  try {

    const response = await Axios.get(`/api/v1/employees/${id}`)
        
          withCredentials: true,
       

    console.log("✅ API RESPONSE:", response);

    return response; // ✅ RETURN FULL RESPONSE


  } catch (error) {
    console.error("❌ API ERROR:", error);
    return [];
  }
}


export async function fetchDepartments() {
  try {
    const response = await Axios.get("/api/v1/departments");



    console.log("✅ API RESPONSE:", response.data);

    return response.data; // ✅ RETURN FULL RESPONSE
  } catch (error) {
    console.error("❌ API ERROR:", error);
    return [];
  }
}


// export const fetchEmployees =
//   async () => {

//     try {

//       const response = await Axios.get(

//       "/api/v1/employees"

//     );

//     console.log(response)
     
//     return response.data.records || [];

//     } catch (error) {

//       console.log(
//         "FETCH EMPLOYEES ERROR:",
//         error.response?.data ||
//         error.message
//       );

//       return [];
//     }
//   };

// =========================
// RESPONSE INTERCEPTOR
// =========================
axiosClient.interceptors.response.use(

  (response) => response,

  (error) => {

    console.log(
      "AXIOS ERROR:",
      error.response?.data ||
      error.message
    );

    return Promise.reject(error);
  }
);

export default axiosClient;