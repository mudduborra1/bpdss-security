import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout";

import { Search } from "lucide-react";
import { saveAttendance } from "../../api/axiosClient";

export default function AttendanceSheet() {

  // =========================
  // States
  // =========================

  const [date, setDate] = useState("");

  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");

  // const [attendanceSource, setAttendanceSource] = useState("batch");

  const [attendanceSource] = useState("batch");

  const studentsPerPage = 10;

  // =========================
  // Fetch Employees
  // =========================

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {

    setLoading(true);

    try {

      const response = await axios.get(
        "/api/v1/employees",
      );

     

      // Sort alphabetically
      const sortedEmployees = response.data.data.sort(
        (a, b) => a.name.localeCompare(b.name)
      );

      // Default status
      const formattedEmployees = sortedEmployees.map(
        (employee,index) => ({
          ...employee,
          s_no: index + 1,
          status: "present",
        })
      );

      setEmployees(formattedEmployees);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const filteredEmployees = employees.filter((employee) =>
  employee.name
    ?.toLowerCase()
    .includes(searchTerm.toLowerCase()) ||
  String(employee.id)
    .includes(searchTerm)
);

  // =========================
  // Pagination
  // =========================

 const totalPages = Math.ceil(
  filteredEmployees.length / studentsPerPage
);

  const indexOfLastStudent =
    currentPage * studentsPerPage;

  const indexOfFirstStudent =
    indexOfLastStudent - studentsPerPage;

 const currentEmployees = filteredEmployees.slice(
  indexOfFirstStudent,
  indexOfLastStudent
);

  // =========================
  // Change Attendance
  // =========================

  const handleStatusChange = (id, status) => {

    const updatedEmployees = employees.map((employee) => {

      if (employee.id === id) {

        return {
          ...employee,
          status,
        };
      }

      return employee;
    });

    setEmployees(updatedEmployees);
  };

  // =========================
  // Counts
  // =========================

  const counts = useMemo(() => {

    let present = 0;
    let absent = 0;
    let leave = 0;

    employees.forEach((employee) => {

      if (employee.status === "present") {
        present++;
      }

      if (employee.status === "absent") {
        absent++;
      }

      if (employee.status === "leave") {
        leave++;
      }
    });

    return {
      total: employees.length,
      present,
      absent,
      leave,
    };

  }, [employees]);

  // =========================
  // Absent Employees
  // =========================

  const absentEmployees = useMemo(() => {
  return employees
    .filter((employee) => employee.status === "absent")
    .map((employee, index) => ({
      ...employee,
    }));
}, [employees]);
  // =========================
  // Leave Employees
  // =========================

  const leaveEmployees = useMemo(() => {
  return employees
    .filter((employee) => employee.status === "leave")
    .map((employee, index) => ({
      ...employee,
      }));
}, [employees]);



  // =========================
  // Submit
  // =========================

  const handleSubmit = async () => {

    if (!date) {
      alert("Please select attendance date");
      return;
    }

    const payload = {
      date,     
      attendance_source: attendanceSource,
      employees: employees.map((employee) => ({
        id: employee.id,
        name: employee.name,
        status: employee.status,
      })),
    };

    console.log(employees)

    try {

      const response =  await saveAttendance(payload);       

      console.log(response);

      alert("Attendance Submitted Successfully");

    } catch (error) {

      console.log(error);

      alert("Failed to submit attendance");
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <Layout>
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <h1 className="text-3xl font-bold text-gray-800">
            Batch Attendance
          </h1>

          <select
            value={attendanceSource}
            disabled
            className="border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
          >
            <option value="batch">Batch</option>
            <option value="manual">Manual</option>
            <option value="biometric">Biometric</option>
          </select>

          {/* <select
              value={attendanceSource}
              onChange={(e) =>
                setAttendanceSource(e.target.value)
              }
              className="border rounded-lg px-4 py-2"
            >
              
          </select> */}

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />

        </div>

        {/* Loading */}

        {loading && (
          <div className="text-center py-10 text-lg">
            Loading employees...
          </div>
        )}

        {/* Attendance Table */}

        {/* Attendance Table */}

{!loading && (

  <>
    {/* Search */}

    <div className="mb-4 flex justify-between items-center">

      <div className="relative w-full md:w-96">

        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search Employee..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2"
        />

      </div>

      <span className="hidden md:block text-gray-600">
        {filteredEmployees.length} Employees
      </span>

    </div>

    {/* Table */}

    <div className="overflow-x-auto">

      <table className="w-full border border-gray-300">

        <thead className="bg-gray-200">

          <tr>

            <th className="border p-3 text-left">
              S.No.
            </th>

            <th className="border p-3 text-left">
              ID
            </th>

            <th className="border p-3 text-left">
              Employee Name
            </th>

            <th className="border p-3 text-center">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {currentEmployees.map((employee, index) => (

            <tr
              key={employee.id}
              className="hover:bg-gray-50"
            >

              <td className="border p-3">
                {employee.s_no}
              </td>

              <td className="border p-3">
                {employee.id}
              </td>

              <td className="border p-3">
                {employee.name}
              </td>

              <td className="border p-3 text-center">

                <select
                  value={employee.status}
                  onChange={(e) =>
                    handleStatusChange(
                      employee.id,
                      e.target.value
                    )
                  }
                  className="border rounded px-3 py-1"
                >
                  <option value="present">
                    Present
                  </option>

                  <option value="absent">
                    Absent
                  </option>

                  <option value="leave">
                    Leave
                  </option>

                </select>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </>

)}

        {/* Pagination */}

        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.max(prev - 1, 1)
              )
            }
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (

            <button
              key={index}
              onClick={() =>
                setCurrentPage(index + 1)
              }
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>

          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Next
          </button>

        </div>

        {/* Summary Cards */}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="bg-blue-100 p-4 rounded-xl shadow">

            <h2 className="font-semibold text-lg">
              Total Employees
            </h2>

            <p className="text-3xl font-bold mt-2">
              {counts.total}
            </p>

          </div>

          <div className="bg-green-100 p-4 rounded-xl shadow">

            <h2 className="font-semibold text-lg">
              Present
            </h2>

            <p className="text-3xl font-bold mt-2">
              {counts.present}
            </p>

          </div>

          <div className="bg-red-100 p-4 rounded-xl shadow">

            <h2 className="font-semibold text-lg">
              Absent
            </h2>

            <p className="text-3xl font-bold mt-2">
              {counts.absent}
            </p>

          </div>

          <div className="bg-yellow-100 p-4 rounded-xl shadow">

            <h2 className="font-semibold text-lg">
              Leave
            </h2>

            <p className="text-3xl font-bold mt-2">
              {counts.leave}
            </p>

          </div>

        </div>

        {/* Absent Employees */}

        <table className="w-full border border-collapse">

  <thead>

    <tr>
      <th
        colSpan={3}
        className="border p-4 text-center bg-yellow-100 text-xl font-bold"
      >
        Absent Employees
      </th>
    </tr>

    <tr>
      <th className="border p-2 text-center">
        S.No
      </th>

      <th className="border p-2 text-center">
        ID
      </th>

      <th className="border p-2 text-left">
        Employee Name
      </th>
    </tr>

  </thead>

  <tbody>

    {absentEmployees.length === 0 ? (

      <tr>
        <td
          colSpan={3}
          className="border p-4 text-center text-gray-500"
        >
          No Employees on Absent
        </td>
      </tr>

    ) : (

      absentEmployees.map((employee) => (

        <tr
          key={employee.id}
          className="hover:bg-gray-50"
        >

          <td className="border p-2 text-center">
            {employee.s_no}
          </td>

          <td className="border p-2 text-center">
            {employee.id}
          </td>

          <td className="border p-2">
            {employee.name}
          </td>

        </tr>

      ))

    )}

  </tbody>

</table>

         {/* leave Employees */}

       <table className="w-full border border-collapse">

  <thead>

    <tr>
      <th
        colSpan={3}
        className="border p-4 text-center bg-yellow-100 text-xl font-bold"
      >
        Leave Employees
      </th>
    </tr>

    <tr>
      <th className="border p-2 text-center">
        S.No
      </th>

      <th className="border p-2 text-center">
        ID
      </th>

      <th className="border p-2 text-left">
        Employee Name
      </th>
    </tr>

  </thead>

  <tbody>

    {leaveEmployees.length === 0 ? (

      <tr>
        <td
          colSpan={3}
          className="border p-4 text-center text-gray-500"
        >
          No Employees on leave
        </td>
      </tr>

    ) : (

      leaveEmployees.map((employee, index) => (

        <tr
          key={employee.id}
          className="hover:bg-gray-50"
        >

          <td className="border p-2 text-center">
            {employee.s_no}
          </td>

          <td className="border p-2 text-center">
            {employee.id}
          </td>

          <td className="border p-2">
            {employee.name}
          </td>

        </tr>

      ))

    )}

  </tbody>

</table>

        {/* Submit */}

        <div className="mt-10 text-center">

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl text-lg font-semibold shadow-lg"
          >
            Submit Attendance
          </button>

        </div>

      </div>

    </div>
    </Layout>
  );
}