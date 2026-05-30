import { useState, useEffect } from "react";

import Layout from "../components/layout/Layout";
import EmployeeForm from "../components/employee/EmployeeFormView";

import EmployeeDetails from "./EmployeeDetails ";

import axios from "../api/axiosClient";

export default function EmployeeCreate() {

  // INITIAL FORM DATA
  const initialFormData = {
    name: "",
    job_title: "",
    work_email: "",
    work_phone: "",
    department_id: "",
    manager: "",
    company: "",
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
    image: null,
  };

  // STATES
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] =
    useState(initialFormData);

  
  const [employees, setEmployees] =
    useState([]);

  // Receive employees from child
  const handleEmployeesFetched = (
    records
  ) => {

    console.log(
      "Employees from Details.jsx",
      records
    );

    setEmployees(records);
  };

  const [imagePreview, setImagePreview] =
    useState(null);

  const [departments, setDepartments] =
    useState([]);

  // FETCH DEPARTMENTS
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {

    try {

      setLoading(true);

      const response = await axios.post(
        "/api/departments",
        {}
      );

      console.log(
        "DEPARTMENTS:",
        response.data
      );

      setDepartments(response.data || []);

      

    } catch (err) {

      console.error(
        "Error loading departments:",
        err
      );

    } finally {

      setLoading(false);
    }
  };

//   console.log(departments.result)

  const deptData = departments.result;

  console.log(deptData)

//   deptData.map((dept) => (
//   console.log(dept.id, dept.name)
// ));

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HANDLE FILE CHANGE
  const handleFileChange = (
    name,
    file
  ) => {

    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));

    if (file) {

      setImagePreview(
        URL.createObjectURL(file)
      );

    } else {

      setImagePreview(null);
    }
  };

  // HANDLE DISCARD
  const handleDiscard = () => {

    setFormData(initialFormData);

    setImagePreview(null);
  };

  // HANDLE SAVE
  const handleSave = async (e) => {

    e.preventDefault();

    try {

      const payload =
        new FormData();

      // APPEND ALL FIELDS
      Object.entries(formData).forEach(
        ([key, value]) => {

          if (
            value !== null &&
            value !== ""
          ) {
            payload.append(key, value);
          }
        }
      );

      // CREATE EMPLOYEE
      const response = await axios.post(
        "/api/v1/employees/create",
        payload,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      console.log(
        "CREATE RESPONSE:",
        response.data
      );

      alert("Employee Created");

      handleDiscard();

    } catch (err) {

      console.error(
        "CREATE ERROR:",
        err
      );

      if (err.response) {

        console.log(
          "STATUS:",
          err.response.status
        );

        console.log(
          "DATA:",
          err.response.data
        );

      } else if (err.request) {

        console.log(
          "NO SERVER RESPONSE"
        );

      } else {

        console.log(
          "REQUEST ERROR:",
          err.message
        );
      }

      alert("Create Failed");
    }
  };

  return (
    <Layout>

      <EmployeeDetails
        onEmployeesFetched={
          handleEmployeesFetched
        }
      />

      <EmployeeForm
        mode="create"
        formData={formData}
        imagePreview={imagePreview}
        handleChange={handleChange}
        handleFileChange={
          handleFileChange
        }
        handleSave={handleSave}
        handleDiscard={
          handleDiscard
        }
        departments={deptData}
        loading={loading}
      />

    </Layout>
  );
}