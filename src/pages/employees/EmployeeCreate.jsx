import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import EmployeeFormView from "../../components/employee/EmployeeFormView";
import {
  fetchEmployees,
  fetchDepartments,
  fetchJobs,
  fetchCompanies,
  createEmployee,
  validateEmployeeForm,
} from "../../api/employeeClient";
import CommonHeader from "../../components/layout/CommonHeader";

export default function EmployeeCreate() {
   // INITIAL FORM DATA
  const initialFormData = {
  name: "",
  job_title: "",
  work_email: "",
  work_phone: "",
  department_id: "",
  manager: "",
  company_id: "",   // renamed to match Odoo field
  location: "",
  private_email: "",
  private_phone: "",
  home_address: "",
  emergency_contact: "",
  badge_id: "",
  pin_code: "",
  attendance_mode: "",
  kiosk_pin: "",
  notes: "",
  gender: "",
  joining_date: "",
  image_1920: null, // renamed to match Odoo field
};

  

  const [departments, setDepartments] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [managers, setManagers] = useState([]);
  const [errors, setErrors] = useState([]);
  const [companies, setCompanies] = useState([]);  
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState(initialFormData);


  // =========================
  // LOAD ALL EMPLOYEES
  // =========================
  const loadEmployees = async () => {
    try {
      setLoading(true);

      const res = await fetchEmployees();

      const records = res?.result || res?.data || res;

      console.log("👉 FULL RESPONSE:", records);
      
      setManagers(records);
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
  // LOAD ALL COMPANIES
  // =========================
  const loadCompanies = async () => {
    try {
      setLoading(true);

      const res = await fetchCompanies();

      console.log("👉 FULL RESPONSE:", res);
      
      setCompanies(res);
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
  // HANDLE DISCARD
  // =========================

  const handleDiscard = () => {
    setFormData(initialFormData);
    setImagePreview(null);
  };

  // =========================
  // SAVE ACTION
  // =========================

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

      console.log("Image base64:", formData.image_1920?.substring(0, 50));

  
        if (formData.image_1920) {
      cleanData.image_1920 = formData.image_1920;
    }

    console.log("Submitting payload:", cleanData);

    console.log(cleanData)
  
      const response = await createEmployee(cleanData);
      const success = response.success? response.success : false
  
      if (success) {
        alert("Employee Create Successfully");
      } else {
        alert("Failed to create employee");
      }
  
      } catch (err) {
        console.error("SUBMIT ACTION ERROR:", err);
        alert("Create Failed");
      }
    };


return (
  <Layout>
   <CommonHeader
        mode="create"
        onSave={handleSubmit}
        onDiscard={() => window.history.back()}
      />


    <EmployeeFormView
      mode="create"
      formData={formData}
      title="Create Employee"
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
