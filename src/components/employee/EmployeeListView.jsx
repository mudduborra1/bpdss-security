import { useNavigate } from "react-router-dom";
export default function EmployeeListView({
  employees,
}) {

    const navigate = useNavigate();  

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Employee</th>
            <th className="p-3">Job Position</th>
            <th className="p-3">Department</th>
            <th className="p-3">Manager</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr
              key={emp.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/employees/${emp.id}`)
              
            }
            >
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <img
                    src={`http://localhost:8069${emp.image}`}
                    alt={emp.name}
                    className="w-10 h-10 rounded-full"
                  />
                  {/* <span>{emp.name}</span> */}
                </div>
              </td>

              <td className="p-3">
                {emp.job_title}
              </td>

              <td className="p-3">
                {emp.department}
              </td>

              <td className="p-3">
                {emp.manager}
              </td>

              <td className="p-3">
                {emp.work_email}
              </td>

              <td className="p-3">
                {emp.work_phone}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}