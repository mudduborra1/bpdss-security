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

import { useNavigate } from "react-router-dom";

import Layout from "../components/layout/Layout";

import { fetchEmployees } from "../api/axiosClient";
import EmployeeListView from "../components/employee/EmployeeListView";
import EmployeeKanbanView from "../components/employee/EmployeeKanbanView";

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
    const response = await fetchEmployees();

    console.log("👉 FULL RESPONSE:", response);

    const records = response?.data || [];

    console.log("✅ FINAL EMPLOYEE ARRAY:", records);

    setEmployees(records);

  } catch (error) {
    console.error("❌ Fetch employees error:", error);
    setEmployees([]);
  } finally {
    setLoading(false);
  }
};


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
        <div className="flex justify-between items-center mb-4 p-2 bg-gray-100 rounded">
          <h2 className="text-xl font-bold capitalize">{view} View</h2>
          
          {/* View Switcher Buttons */}
          <div className="flex gap-2 bg-white p-1 rounded border">
            <button
              type="button"
              onClick={() => setView("list")}
              className={`px-3 py-1 rounded transition-colors ${
                view === "list" ? "bg-blue-600 text-white font-medium" : "hover:bg-gray-100"
              }`}
            >
              List
            </button>
            <button
              type="button"
              onClick={() => setView("kanban")}
              className={`px-3 py-1 rounded transition-colors ${
                view === "kanban" ? "bg-blue-600 text-white font-medium" : "hover:bg-gray-100"
              }`}
            >
              Kanban
            </button>
          </div>
        </div>
  
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