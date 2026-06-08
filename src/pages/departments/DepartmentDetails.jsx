import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../api/employeeClient";
import Layout from "../../components/layout/Layout";
import DepartmentListView from "../../components/departments/DepartmentListView";
import DepartmentKanbanView from "../../components/departments/DepartmentKanbanView";

import CommonHeader from "../../components/layout/CommonHeader";

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
              <CommonHeader
                title="Departments"
                mode="departments"
                view={view}
                onViewChange={setView}
                onCreate={() => navigate("/departments/new")}
                onSearch={() => setSearchOpen(true)}
                // onViewChange={setView}
              />

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
