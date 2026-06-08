import { useEffect, useState } from "react";

export default function AttendanceDashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    present: 0,
    absent: 0,
    leave: 0,
  });

  useEffect(() => {
    setStats({
      employees: 120,
      present: 110,
      absent: 5,
      leave: 5,
    });
  }, []);

  return (
    <div className="p-6">
      <h2>Attendance Dashboard</h2>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="border p-4">
          Employees
          <h3>{stats.employees}</h3>
        </div>

        <div className="border p-4">
          Present
          <h3>{stats.present}</h3>
        </div>

        <div className="border p-4">
          Absent
          <h3>{stats.absent}</h3>
        </div>

        <div className="border p-4">
          Leave
          <h3>{stats.leave}</h3>
        </div>
      </div>
    </div>
  );
}