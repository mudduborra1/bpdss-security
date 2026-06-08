import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Layout from "../../components/layout/Layout";

import { Search } from "lucide-react";

export default function AttendanceSheet() {

  // =========================
  // States
  // =========================

  const [date, setDate] = useState("");

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");

  const studentsPerPage = 10;

  // =========================
  // Fetch Students
  // =========================

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {

    setLoading(true);

    try {

      const response = await axios.get(
        "/api/v1/employees",
      );

     

      // Sort alphabetically
      const sortedStudents = response.data.data.sort(
        (a, b) => a.name.localeCompare(b.name)
      );

      // Default status
      const formattedStudents = sortedStudents.map(
        (student,index) => ({
          ...student,
          s_no: index + 1,
          status: "present",
        })
      );

      setStudents(formattedStudents);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const filteredStudents = students.filter((student) =>
  student.name
    ?.toLowerCase()
    .includes(searchTerm.toLowerCase()) ||
  String(student.id)
    .includes(searchTerm)
);

  // =========================
  // Pagination
  // =========================

 const totalPages = Math.ceil(
  filteredStudents.length / studentsPerPage
);

  const indexOfLastStudent =
    currentPage * studentsPerPage;

  const indexOfFirstStudent =
    indexOfLastStudent - studentsPerPage;

 const currentStudents = filteredStudents.slice(
  indexOfFirstStudent,
  indexOfLastStudent
);

  // =========================
  // Change Attendance
  // =========================

  const handleStatusChange = (id, status) => {

    const updatedStudents = students.map((student) => {

      if (student.id === id) {

        return {
          ...student,
          status,
        };
      }

      return student;
    });

    setStudents(updatedStudents);
  };

  // =========================
  // Counts
  // =========================

  const counts = useMemo(() => {

    let present = 0;
    let absent = 0;
    let leave = 0;

    students.forEach((student) => {

      if (student.status === "present") {
        present++;
      }

      if (student.status === "absent") {
        absent++;
      }

      if (student.status === "leave") {
        leave++;
      }
    });

    return {
      total: students.length,
      present,
      absent,
      leave,
    };

  }, [students]);

  // =========================
  // Absent Students
  // =========================

  const absentStudents = useMemo(() => {
  return students
    .filter((student) => student.status === "absent")
    .map((student, index) => ({
      ...student,
    }));
}, [students]);
  // =========================
  // Leave Students
  // =========================

  const leaveStudents = useMemo(() => {
  return students
    .filter((student) => student.status === "leave")
    .map((student, index) => ({
      ...student,
      }));
}, [students]);



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
      students: students.map((student) => ({
        id: student.id,
        name: student.name,
        status: student.status,
      })),
    };

    try {

      const response = await axios.post(
        "http://localhost:8069/api/attendance/save",
        payload
      );

      console.log(response.data);

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
            Loading students...
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
        {filteredStudents.length} Employees
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

          {currentStudents.map((student, index) => (

            <tr
              key={student.id}
              className="hover:bg-gray-50"
            >

              <td className="border p-3">
                {student.s_no}
              </td>

              <td className="border p-3">
                {student.id}
              </td>

              <td className="border p-3">
                {student.name}
              </td>

              <td className="border p-3 text-center">

                <select
                  value={student.status}
                  onChange={(e) =>
                    handleStatusChange(
                      student.id,
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
              Total Students
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

        {/* Absent Students */}

        <table className="w-full border border-collapse">

  <thead>

    <tr>
      <th
        colSpan={3}
        className="border p-4 text-center bg-yellow-100 text-xl font-bold"
      >
        Absent Students
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

    {absentStudents.length === 0 ? (

      <tr>
        <td
          colSpan={3}
          className="border p-4 text-center text-gray-500"
        >
          No employees on Absent
        </td>
      </tr>

    ) : (

      absentStudents.map((student) => (

        <tr
          key={student.id}
          className="hover:bg-gray-50"
        >

          <td className="border p-2 text-center">
            {student.s_no}
          </td>

          <td className="border p-2 text-center">
            {student.id}
          </td>

          <td className="border p-2">
            {student.name}
          </td>

        </tr>

      ))

    )}

  </tbody>

</table>

         {/* leave Students */}

       <table className="w-full border border-collapse">

  <thead>

    <tr>
      <th
        colSpan={3}
        className="border p-4 text-center bg-yellow-100 text-xl font-bold"
      >
        Leave Students
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

    {leaveStudents.length === 0 ? (

      <tr>
        <td
          colSpan={3}
          className="border p-4 text-center text-gray-500"
        >
          No employees on leave
        </td>
      </tr>

    ) : (

      leaveStudents.map((student, index) => (

        <tr
          key={student.id}
          className="hover:bg-gray-50"
        >

          <td className="border p-2 text-center">
            {student.s_no}
          </td>

          <td className="border p-2 text-center">
            {student.id}
          </td>

          <td className="border p-2">
            {student.name}
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