import { useState } from "react";

import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function DepartmentSearchModal({
  open,
  onClose,
  departments = [],
  onSelect,
}) {
  const [search, setSearch] = useState("");

  if (!open) return null;

  // Filter departments
  const filteredDepartments =
    departments.filter((item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
    >
      {/* Modal */}
      <div
        className="
          bg-white
          w-full
          max-w-6xl
          rounded-lg
          shadow-2xl
          overflow-hidden
        "
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            px-5
            py-4
            border-b
          "
        >
          <h2 className="text-lg font-semibold">
            Search: Department
          </h2>

          <button
            onClick={onClose}
            className="
              p-1
              rounded
              hover:bg-gray-100
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Toolbar */}
        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            px-4
            py-3
            border-b
            bg-gray-50
          "
        >
          {/* Search */}
          <div className="relative w-80">
            <Search
              size={16}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                border
                border-gray-300
                rounded-md
                pl-9
                pr-3
                py-2
                text-sm
                outline-none
                focus:border-blue-500
              "
            />
          </div>

          {/* Pager */}
          <div className="flex items-center gap-1">
            <button
              className="
                border
                rounded
                p-2
                bg-white
                hover:bg-gray-100
              "
            >
              <ChevronLeft size={16} />
            </button>

            <button
              className="
                border
                rounded
                p-2
                bg-white
                hover:bg-gray-100
              "
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div
          className="
            overflow-auto
            max-h-[500px]
          "
        >
          <table
            className="
              w-full
              text-sm
              border-collapse
            "
          >
            <thead
              className="
                sticky
                top-0
                bg-white
                border-b
                z-10
              "
            >
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">
                  Department Name
                </th>

                <th className="px-4 py-3 font-medium">
                  Manager
                </th>

                <th className="px-4 py-3 font-medium">
                  Employees
                </th>

                <th className="px-4 py-3 font-medium">
                  Parent Department
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredDepartments.map(
                (dept) => (
                  <tr
                    key={dept.id}
                    onClick={() => {
                      onSelect(dept);
                      onClose();
                    }}
                    className="
                      border-b
                      hover:bg-gray-50
                      cursor-pointer
                    "
                  >
                    <td className="px-4 py-3">
                      {dept.name}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={
                           `http://localhost:8069${dept.image}`
                          }
                          alt=""
                          className="
                            w-7
                            h-7
                            rounded
                            object-cover
                          "
                        />

                        <span>
                          {dept.manager}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      {
                        dept.employees_count
                      }
                    </td>

                    <td className="px-4 py-3">
                      {dept.complete_name}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div
          className="
            flex
            items-center
            gap-2
            px-4
            py-3
            border-t
            bg-gray-50
          "
        >
          <button
            className="
              px-4
              py-2
              bg-blue-600
              text-white
              rounded-md
              hover:bg-blue-700
              text-sm
            "
          >
            New
          </button>

          <button
            onClick={onClose}
            className="
              px-4
              py-2
              border
              rounded-md
              hover:bg-gray-100
              text-sm
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}