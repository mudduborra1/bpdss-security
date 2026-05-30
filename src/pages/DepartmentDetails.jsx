import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../api/axiosClient";
import Layout from "../components/layout/Layout";
import DepartmentListView from "../components/departments/DepartmentListView";
import DepartmentKanbanView from "../components/departments/DepartmentKanbanView";

export default function DepartmentDetails() {
  const [view, setView] = useState("kanban");
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      const response = await fetchDepartments();
      setDepartments(response?.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

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
          <DepartmentListView departments={departments} />
        ) : (
          <DepartmentKanbanView departments={departments} />
        )}
      </div>
    </Layout>
  );
}
