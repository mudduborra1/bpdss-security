import { useEffect, useState } from "react";

export default function BiometricLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs([
      {
        id: 1,
        employee: "John",
        check_in: "09:00",
        check_out: "18:00",
      },
      {
        id: 2,
        employee: "Ravi",
        check_in: "09:15",
        check_out: "18:10",
      },
    ]);
  }, []);

  return (
    <div className="p-4">
      <h2>Biometric Logs</h2>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Check In</th>
            <th>Check Out</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.employee}</td>
              <td>{log.check_in}</td>
              <td>{log.check_out}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}