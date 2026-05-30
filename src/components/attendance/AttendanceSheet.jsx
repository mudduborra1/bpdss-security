import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Layout from "../layout/Layout";

export default function AttendanceSheet() {

  // =========================
  // States
  // =========================

  const [date, setDate] = useState("");

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

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
        (student) => ({
          ...student,
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

  // =========================
  // Pagination
  // =========================

  const totalPages = Math.ceil(
    students.length / studentsPerPage
  );

  const indexOfLastStudent =
    currentPage * studentsPerPage;

  const indexOfFirstStudent =
    indexOfLastStudent - studentsPerPage;

  const currentStudents = students.slice(
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

    return students.filter(
      (student) => student.status === "absent"
    );

  }, [students]);

  // =========================
  // Leave Students
  // =========================

  const leaveStudents = useMemo(() => {

    return students.filter(
      (student) => student.status === "leave"
    );

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
            Employees Attendance Sheet
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

        {!loading && (

          <div className="overflow-x-auto">

            <table className="w-full border border-gray-300">

              <thead className="bg-gray-200">

                <tr>

                  <th className="border p-3 text-left">
                    ID
                  </th>

                  <th className="border p-3 text-left">
                    Student Name
                  </th>

                  <th className="border p-3 text-center">
                    Present
                  </th>

                  <th className="border p-3 text-center">
                    Absent
                  </th>

                  <th className="border p-3 text-center">
                    Leave
                  </th>

                </tr>

              </thead>

              <tbody>

                {currentStudents.map((student) => (

                  <tr
                    key={student.id}
                    className="hover:bg-gray-50"
                  >

                    <td className="border p-3">
                      {student.id}
                    </td>

                    <td className="border p-3">
                      {student.name}
                    </td>

                    {/* Present */}

                    <td className="border text-center">

                      <input
                        type="radio"
                        name={`status-${student.id}`}
                        checked={
                          student.status === "present"
                        }
                        onChange={() =>
                          handleStatusChange(
                            student.id,
                            "present"
                          )
                        }
                      />

                    </td>

                    {/* Absent */}

                    <td className="border text-center">

                      <input
                        type="radio"
                        name={`status-${student.id}`}
                        checked={
                          student.status === "absent"
                        }
                        onChange={() =>
                          handleStatusChange(
                            student.id,
                            "absent"
                          )
                        }
                      />

                    </td>

                    {/* Leave */}

                    <td className="border text-center">

                      <input
                        type="radio"
                        name={`status-${student.id}`}
                        checked={
                          student.status === "leave"
                        }
                        onChange={() =>
                          handleStatusChange(
                            student.id,
                            "leave"
                          )
                        }
                      />

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
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

        <div className="mt-10 bg-red-50 border border-red-200 rounded-xl p-5">

          <h2 className="text-2xl font-bold text-red-700 mb-4">
            Absent Students
          </h2>

          {absentStudents.length === 0 ? (

            <p className="text-gray-600">
              No absent students
            </p>

          ) : (

            <div className="space-y-2">

              {absentStudents.map((student) => (

                <div
                  key={student.id}
                  className="bg-white border rounded-lg p-3 flex justify-between"
                >

                  <span>
                    ID: {student.id}
                  </span>

                  <span>
                    {student.name}
                  </span>

                </div>

              ))}

            </div>
          )}

        </div>

        {/* Leave Students */}

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-5">

          <h2 className="text-2xl font-bold text-yellow-700 mb-4">
            Leave Students
          </h2>

          {leaveStudents.length === 0 ? (

            <p className="text-gray-600">
              No students on leave
            </p>

          ) : (

            <div className="space-y-2">

              {leaveStudents.map((student) => (

                <div
                  key={student.id}
                  className="bg-white border rounded-lg p-3 flex justify-between"
                >

                  <span>
                    ID: {student.id}
                  </span>

                  <span>
                    {student.name}
                  </span>

                </div>

              ))}

            </div>
          )}

        </div>

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