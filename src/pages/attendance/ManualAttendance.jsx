import { useState } from "react";

export default function ManualAttendance() {
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "present",
    remarks: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log({
      ...form,
      source: "manual",
    });
  };

  return (
    <div className="p-4">
      <h2>Manual Attendance</h2>

      <input
        name="employee_id"
        placeholder="Employee ID"
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        onChange={handleChange}
      />

      <select
        name="status"
        onChange={handleChange}
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

      <textarea
        name="remarks"
        placeholder="Remarks"
        onChange={handleChange}
      />

      <button
        onClick={handleSave}
        className="border px-4 py-2"
      >
        Save
      </button>
    </div>
  );
}