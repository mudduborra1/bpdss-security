import { useState } from "react";

export default function AttendanceRegister() {
  const [rows] = useState([
    {
      employee: "John",
      d1: "P",
      d2: "P",
      d3: "L",
    },
    {
      employee: "Ravi",
      d1: "P",
      d2: "A",
      d3: "P",
    },
  ]);

  return (
    <div className="p-4 overflow-auto">
      <h2>Monthly Register</h2>

      <table className="border">
        <thead>
          <tr>
            <th>Employee</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.employee}</td>
              <td>{row.d1}</td>
              <td>{row.d2}</td>
              <td>{row.d3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}