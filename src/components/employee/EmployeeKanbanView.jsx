import { useNavigate } from "react-router-dom";
export default function EmployeeKanbanView({
  employees,
}) {

    const navigate = useNavigate();  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {employees.map((emp) => (
        <div
          key={emp.id}
          className="bg-white p-4 rounded shadow cursor-pointer"
          onClick={() =>
            navigate(`/employees/${emp.id}`)
          }
        >
          <div className="flex flex-col items-center">

            
           <img
                    src={`http://localhost:8069${emp.image}`}
                    alt={emp.name}
                    className="w-20 h-20 rounded-full"
                  />
             
            <h3 className="mt-3 font-semibold">
              {emp.name}
            </h3>

            <p className="text-gray-500 text-sm">
              {emp.job_title}
            </p>

            <div className="mt-4 text-sm w-full">
              <p>
                <strong>Department:</strong>
                {" "}
                {emp.department_id[1]}
              </p>

              <p>
                <strong>Manager:</strong>
                {" "}
                {emp.parent_id[1]}
              </p>

              <p>
                <strong>Email:</strong>
                {" "}
                {emp.work_email}
              </p>

              <p>
                <strong>Phone:</strong>
                {" "}
                {emp.work_phone}
              </p>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}