import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import EmployeeFormView from "../components/employee/EmployeeFormView";
import axios from "../api/axios";
import { fetchEmployees, fetchEmployeeById, fetchDepartments } from "../api/axiosClient";

export default function EmployeeUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  // FORM STATE - Initial state strings safely matching underlying components
  const [formData, setFormData] = useState({
    name: "",
    job_title: "",
    work_email: "",
    work_phone: "",
    gender: "",
    joining_date: "",
    department_id: "",
    image: null,
  });

  const [employeeIds, setEmployeeIds] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const totalCount = employeeIds.length;

  // =========================
  // LOAD ALL EMPLOYEES
  // =========================
  const loadEmployees = async () => {
    try {
      const response = await fetchEmployees();
      const records = response?.data || [];
      const ids = records.map((emp) => String(emp.id));
      setEmployeeIds(ids);
    } catch (err) {
      console.error(err);
      setError("Failed to load employees");
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
      const res = await fetchEmployeeById(empId);
      const empData = res?.data?.data || res?.data;
      console.log("Employee Loaded", empData);

      if (!empData) {
        setError("Employee not found");
        return;
      }

      // Handle both raw object or array wrap returns securely
      const emp = Array.isArray(empData) ? empData[0] : empData;
      setFormData(emp);
      
      // Track preview URL separate from structural form state
      setImagePreview(emp.image_1920 || null);
      setError("");
    } catch (err) {
      console.error(err);
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
  // LOAD DEPARTMENTS
  // =========================
  const loadDepartments = async () => {
    try {
      setLoading(true);
      const response = await fetchDepartments();
      const dept = response?.data || [];
      console.log("test", dept);
      setDepartments(dept);
    } catch (err) {
      console.error(err);
      setError("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  // =========================
  // NAVIGATION INDEX CALCULATIONS
  // =========================
  const currentIndex = employeeIds.indexOf(String(id));
  const handleNext = () => {
    if (currentIndex !== -1 && currentIndex < employeeIds.length - 1) {
      const nextId = employeeIds[currentIndex + 1];
      navigate(`/employees/${nextId}`);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevId = employeeIds[currentIndex - 1];
      navigate(`/employees/${prevId}`);
    }
  };

  // =========================
  // INPUT HANDLERS
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      // FIXED: Packages the selected value into an Odoo many2one database reference structure
      [name]: name === "department_id" ? (value ? [Number(value), ""] : "") : value,
    }));
  };

  const handleFileChange = (name, file) => {
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
    if (file) {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // =========================
  // SAVE
  // =========================
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      // FIXED: Capitalized to call native FormData constructor class API
      const payload = new FormData();
      
      Object.keys(formData).forEach((key) => {
        if (key === "image" && !formData[key]) return;
        
        if (formData[key] !== null && formData[key] !== undefined) {
          // Send only the integer ID part of relational arrays back to the backend endpoint payload
          if (key === "department_id") {
            const outValue = Array.isArray(formData[key]) ? formData[key][0] : formData[key];
            if (outValue) payload.append(key, outValue);
          } else {
            payload.append(key, formData[key]);
          }
        }
      });

      console.log("payload", payload)

      await axios.post(`/api/v1/employees/${id}/update`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Employee Updated");
    } catch (err) {
      console.error(err);
      alert("Update Failed");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-10">Loading...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-10 text-red-500">{error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <EmployeeFormView
        mode="update"
        formData={formData}
        imagePreview={imagePreview}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        handleSave={handleSubmit}
        handleDiscard={() => window.history.back()}
        isEditing={true}
        onNext={handleNext}
        onPrevious={handlePrevious}
        disableNext={currentIndex >= employeeIds.length - 1 || currentIndex === -1}
        disablePrevious={currentIndex <= 0}
        currentIndex={currentIndex}
        total={totalCount}
        departments={departments}
        loading={loading}
      />
    </Layout>
  );
}
