import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../components/layout/Layout";

import { fetchEmployees } from "../../api/employeeClient";
import EmployeeListView from "../../components/employee/EmployeeListView";
import EmployeeKanbanView from "../../components/employee/EmployeeKanbanView";

import EmployeeControlPanel from "../../components/layout/EmployeeControlPanel";

import CommonHeader from "../../components/layout/CommonHeader";





export default function EmployeeDetails() {

  // =========================
  // STATES
  // =========================
  const [employees, setEmployees] =
    useState([]);

  const [view, setView] = useState("kanban");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

//   const currentIndex = employees.findIndex(
//   (emp) => String(emp.id) === String(id)
// );


  // Pagination
  const [currentPage, setCurrentPage] =
    useState(1);

  const recordsPerPage = 10;

  // Sorting
  const [sortField, setSortField] =
    useState("name");

  const [
    sortDirection,
    setSortDirection,
  ] = useState("asc");

  // =========================
  // LOAD EMPLOYEES
  // =========================
  useEffect(() => {

    loadEmployees();

  }, []);

const loadEmployees = async () => {
  setLoading(true);

  try {
    const employees = await fetchEmployees();
    const records = Array.isArray(employees) ? employees : [];


    // const records = Array.isArray(response) ? response : [];

    console.log("👉 FULL RESPONSE:", records);

    setEmployees(records);

  } catch (error) {
    console.error("❌ Fetch employees error:", error);
    setEmployees([]);
  } finally {
    setLoading(false);
  }
};


// const currentIndex = employees.findIndex(
//   (emp) => emp.id === employee.id
// );

// const prevEmployee =
//   currentIndex > 0
//     ? employees[currentIndex - 1]
//     : null;

// const nextEmployee =
//   currentIndex < employees.length - 1
//     ? employees[currentIndex + 1]
//     : null;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////


// const handlePrevious = () => {
//   if (currentIndex > 0) {
//     navigate(`/employees/${employees[currentIndex - 1].id}`);
//   }
// };

// const handleNext = () => {
//   if (currentIndex < employees.length - 1) {
//     navigate(`/employees/${employees[currentIndex + 1].id}`);
//   }
// };



  // =========================
  // SORT
  // =========================
  const handleSort = (field) => {

    if (sortField === field) {

      setSortDirection((prev) =>
        prev === "asc"
          ? "desc"
          : "asc"
      );

    } else {

      setSortField(field);

      setSortDirection("asc");
    }
  };

  // =========================
  // SORTED EMPLOYEES
  // =========================
  // const filteredEmployees =
  //   useMemo(() => {

  //     let data = [...employees];

  //     data.sort((a, b) => {

  //       const aValue =
  //         a?.[sortField]
  //           ?.toString()
  //           .toLowerCase() || "";

  //       const bValue =
  //         b?.[sortField]
  //           ?.toString()
  //           .toLowerCase() || "";

  //       return sortDirection === "asc"
  //         ? aValue.localeCompare(bValue)
  //         : bValue.localeCompare(aValue);
  //     });

  //     return data;

  //   }, [
  //     employees,
  //     sortField,
  //     sortDirection,
  //   ]);

  // =========================
  // PAGINATION
  // =========================
  // const totalPages = Math.max(
  //   1,
  //   Math.ceil(
  //     filteredEmployees.length /
  //     recordsPerPage
  //   )
  // );

  // const paginatedEmployees =
  //   filteredEmployees.slice(
  //     (currentPage - 1) *
  //       recordsPerPage,

  //     currentPage *
  //       recordsPerPage
  //   );

  // =========================
  // UI
  // =========================
  if (loading) return <Layout><div className="p-4">Loading...</div></Layout>;
    if (error) return <Layout><div className="p-4 text-red-500">{error}</div></Layout>;
  
    return (
      <Layout>





        {/* Control Bar */}
        <CommonHeader
          title="Employees"
          mode="details"
          view={view}
          onViewChange={setView}
          onCreate={() => navigate("/employees/new")}
          onSearch={() => setSearchOpen(true)}
          // onViewChange={setView}
        />
          
        {/* Main Content Area */}
        <div className="mt-4">
          {view === "list" ? (
            <EmployeeListView employees={employees} />
          ) : (
            <EmployeeKanbanView employees={employees} />
          )}
        </div>
      </Layout>
    );
}