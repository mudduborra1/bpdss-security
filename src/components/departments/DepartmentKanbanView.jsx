import { odooColors } from "./DepartmentColors";

export default function DepartmentKanban({
  departments,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {departments.map((dept) => (
        <div
          key={dept.id}
          className="bg-white rounded-lg shadow border"
        >
          <div
            className="h-2 rounded-t-lg"
            style={{
              backgroundColor:
              odooColors[dept.color] || "#D1D5DB"
            }}
          />

          <div className="p-4">

            <h3 className="font-semibold text-lg">
              {dept.name}
            </h3>

            <p className="text-gray-500 text-sm">
              {dept.complete_name}
            </p>

            <div className="flex items-center gap-2 mt-4">
              <img
                src={`http://localhost:8069${dept.image}`}
                alt=""
                className="w-10 h-10 rounded-full"
              />

              <div>
                <p className="font-medium">
                  {dept.manager}
                </p>

                <p className="text-xs text-gray-500">
                  Manager
                </p>
              </div>
            </div>

            <div className="mt-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {dept.employees_count}
                {" "}
                Employees
              </span>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}