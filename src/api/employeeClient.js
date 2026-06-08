import axiosClient  from "./axiosClient";
// =========================
// EMPLOYEES
// =========================
export async function fetchEmployees() {
  try {
    const response = await axiosClient.get("/v1/employees");
    
    // Normalize: always return the array
    return response.data?.data || response.data?.result || [];
  } catch (error) {
    console.error("❌ Error fetching employees:", error.message);
    return [];
  }
}

export async function fetchEmployeeById(id) {
  try {
    const response = await axiosClient.get(`/v1/employees/${id}`);
    const data = response.data?.data || response.data?.result || [];
    return Array.isArray(data) ? data[0] || null : data;
  } catch (error) {
    console.error(`❌ Error fetching employee ${id}:`, error.message);
    return null;
  }
}

export async function updateEmployee(payload) {
  try {

    // console.log(payload)

    const response = await axiosClient.post(`/v1/employees/update`, {
      jsonrpc: "2.0",
      method: "call",
      params: payload,
    });
    console.log(response)
    return response.data?.result || response.data;
    
  } catch (error) {
    console.error(`❌ Error updating employee ${id}:`, error.message);
    throw error;
  }
}

export async function createEmployee(payload) {
  try {
    console.log("Submitting payload:", payload);

    const response = await axiosClient.post("/v1/employees/create", {
      jsonrpc: "2.0",
      method: "call",
      params: payload,
    });

    console.log("Create response:", response);

    // Directly return the backend JSON
    return response.data; // { success: true, id: 6 }
    
  } catch (error) {
    console.error("❌ Error creating employee:", error.message);
    throw error;
  }
}



export async function fetchDepartments() {
  try {
    const response = await axiosClient.get("/v1/departments");
    return response.data?.result || response.data;
  } catch (error) {
    console.error("❌ Error fetching departments:", error.message);
    return [];
  }
}

export async function fetchJobs() {
  try {
    const response = await axiosClient.get("/v1/jobs");
    return response.data?.result || response.data;
  } catch (error) {
    console.error("❌ Error fetching jobs:", error.message);
    return [];
  }
}

export async function fetchManagers() {
  try {
    const response = await axiosClient.get("/v1/managers");
    return response.data?.result || response.data;
  } catch (error) {
    console.error("❌ Error fetching managers:", error.message);
    return [];
  }
}

export async function fetchCompanies() {
  const response = await axiosClient.get("/v1/companies");
  console.log(response)
  return response.data.companies; // array of {id, name}
}

export async function validateEmployeeForm(formData) {
    
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = "Employee name is required";
  }
  if (!formData.company_id) {
    errors.company_id = "Company is required";
  }
  if (formData.work_email && !/\S+@\S+\.\S+/.test(formData.work_email)) {
    errors.work_email = "Invalid email format";
  }
  if (
  formData.work_phone &&
  !/^\+?\d+(?:[ -]?\d+)*$/.test(formData.work_phone)
) {
  errors.work_phone = "Phone must contain digits with optional +, spaces, or - separators";
}

 

  return errors;
}


