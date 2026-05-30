import { odooColors } from "./DepartmentColors";
export default function DepartmentList({
  departments,
}) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">
              Department Name
            </th>

            <th className="p-3 text-left">
              Manager
            </th>

            <th className="p-3 text-center">
              Employees
            </th>

            <th className="p-3 text-left">
              Parent Department
            </th>

            <th className="p-3 text-center">
              Color
            </th>
          </tr>
        </thead>

        <tbody>
          {departments.map((dept) => (
            <tr
              key={dept.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-3">
                {dept.name}
              </td>

              <td className="p-3">
                <div className="flex items-center gap-2">
                  <img
                    src={`http://localhost:8069${dept.image}`}
                    alt=""
                    className="w-10 h-10 rounded-full"
              />
                 
                  <span>
                    {dept.manager}
                  </span>
                </div>
              </td>

              <td className="p-3 text-center">
                {dept.employees_count}
              </td>

              <td className="p-3">
                {dept.complete_name}
              </td>

              <td className="p-3">
                <div
                  className="w-5 h-5 rounded-full mx-auto"
                  style={{
                    backgroundColor:
                     odooColors[dept.color] || "#D1D5DB"
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}