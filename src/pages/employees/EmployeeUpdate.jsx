import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import EmployeeFormView from "../../components/employee/EmployeeFormView";
import {
  fetchEmployees,
  fetchEmployeeById,
  fetchDepartments,
  fetchJobs,
  fetchCompanies,
  updateEmployee,
  validateEmployeeForm,
} from "../../api/employeeClient";
import CommonHeader from "../../components/layout/CommonHeader";

export default function EmployeeUpdate() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    job_id: "",
    company_id: "",
    parent_id: "",
    work_email: "",
    work_phone: "",
    gender: "",
    joining_date: "",
    department_id: "",
  });

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);  
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});


  // =========================
  // LOAD ALL EMPLOYEES
  // =========================
  const loadEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetchEmployees();
      // const records = response?.result || response?.data || [];

      setEmployees(response);
      setManagers(response);
    } catch (err) {
      console.error(err);
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // =========================
  // LOAD SINGLE EMPLOYEE
  // =========================
  const loadEmployeeById = async (empId) => {
    if (!empId) return;
    try {
      setLoading(true);
      const empData = await fetchEmployeeById(empId);
      // const empData = res?.result || res?.data || res;
      if (!empData) {
        setError("Employee not found");
        return;
      }

      const emp = Array.isArray(empData) ? empData[0] : empData;

      const normalizedEmp = {
        ...emp,
        name: emp.name || "",
        department_id: Array.isArray(emp.department_id)
          ? emp.department_id[0]
          : emp.department_id || "",
        parent_id: Array.isArray(emp.parent_id)
          ? emp.parent_id[0]
          : emp.parent_id || "",
        job_id: Array.isArray(emp.job_id)
          ? emp.job_id[0]
          : emp.job_id || "",
      };

      setFormData(normalizedEmp);
      setImagePreview(emp.image_1920 || null);
      setError("");
    } catch (err) {
      console.error("Fetch profile reload crash:", err);
      setError("Failed to load employee");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadEmployeeById(id);
    }
  }, [id]);

  // =========================
    // LOAD ALL COMPANIES
    // =========================
    const loadCompanies = async () => {
      try {
        setLoading(true);
  
        const res = await fetchCompanies();
  
        console.log("👉 FULL RESPONSE:", res);

        // Companies normalization
        setCompanies(res || []);
        
      } catch (err) {
        console.error(err);
        setError("Failed to load companies");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      loadCompanies();
    }, []);

  // =========================
  // LOAD DEPARTMENTS & JOBS
  // =========================
  const loadDepartments = async () => {
    try {
      const response = await fetchDepartments();
      setDepartments(response?.result || response?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadJobs = async () => {
    try {
      const response = await fetchJobs();
      setJobs(response?.result || response?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadDropdownData = async () => {
      try {
        await Promise.all([loadDepartments(), loadJobs()]);
      } catch (err) {
        console.error(err);
      }
    };
    loadDropdownData();
  }, []);

  // =========================
  // INPUT HANDLERS
  // =========================
  const handleChange = (e) => {
    const name = e.target.name || e.target.id;
    const { value } = e.target;

    setFormData((prev) => {
      const isRelationalField = ["department_id", "job_id", "parent_id"].includes(name);
      let finalValue = value;
      if (isRelationalField && value) {
        finalValue = Array.isArray(value) ? Number(value[0]) : Number(value);
      }
      return { ...prev, [name]: finalValue };
    });
  };

 // File change handler
const handleFileChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    const base64 = reader.result.split(",")[1];
    setFormData((prev) => ({
      ...prev,
      image_1920: base64,
    }));
  };
  reader.readAsDataURL(file);

  if (imagePreview && imagePreview.startsWith("blob:")) {
    URL.revokeObjectURL(imagePreview);
  }
  setImagePreview(URL.createObjectURL(file));
};

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // =========================
  // SAVE ACTION
  // =========================
  const handleSubmit = async (e) => {
    e?.preventDefault();
    try {
      const cleanData = {};
      const errors = (await validateEmployeeForm(formData)) || {};
      setErrors(errors);
      if (Object.keys(errors).length > 0) return;


      Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (value !== null && value !== undefined && value !== "") {
        if (["department_id", "job_id", "parent_id", "company_id"].includes(key)) {
          cleanData[key] = Number(Array.isArray(value) ? value[0] : value);
        } else {
          cleanData[key] = value; // includes image_1920 as base64 string
        }
      }
    });

      

    const response = await updateEmployee(cleanData);
    const success = response.success? response.success : false

    if (success) {
      alert("Employee Updated Successfully");
    } else {
      alert("Failed to update employee");
    }

    } catch (err) {
      console.error("SUBMIT ACTION ERROR:", err);
      alert("Update Failed");
    }
  };

// Guarded navigation
if (loading) {
  return (
    <Layout>
      <div className="p-10">Loading employees...</div>
    </Layout>
  );
}

const currentIndex = employees.findIndex((emp) => String(emp.id) === String(id));
const prevEmployee = currentIndex > 0 ? employees[currentIndex - 1] : null;
const nextEmployee =
  currentIndex >= 0 && currentIndex < employees.length - 1
    ? employees[currentIndex + 1]
    : null;
const totalCount = employees.length;

if (error) {
  return (
    <Layout>
      <div className="p-10 text-red-500">{error}</div>
    </Layout>
  );
}

return (
  <Layout>
    <CommonHeader
  mode="update"
  onSave={handleSubmit}
  onDiscard={() => window.history.back()}
  total={totalCount}
  prevId={prevEmployee?.id}
  nextId={nextEmployee?.id}
  disablePrevious={!prevEmployee}
  disableNext={!nextEmployee}
  currentIndex={currentIndex >= 0 ? currentIndex : 0}
/>


    <EmployeeFormView
      mode="update"
      formData={formData}
      title="Edit Employee"
      imagePreview={imagePreview}
      handleChange={handleChange}
      handleFileChange={handleFileChange}
      departments={departments}
      jobs={jobs}
      managers={managers}
      companies={companies}
      errors={errors}
      loading={loading}
    />
  </Layout>
);
};
