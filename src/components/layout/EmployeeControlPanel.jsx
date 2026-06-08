import {
  ChevronLeft,
  ChevronRight,
  Search,
  LayoutGrid,
  List,
  Plus,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function EmployeeControlPanel({
  view = "kanban",
  onViewChange,
  onCreate,
  onSearch,
  prevEmployee,
  nextEmployee,
}) {
  return (
    <div
      className="
        bg-white
        border-b
        px-4
        py-3
        flex
        flex-wrap
        justify-between
        items-center
        gap-3
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-2">
        <button
          onClick={onCreate}
          className="
            bg-[#714B67]
            text-white
            px-4
            py-2
            rounded
            text-sm
            font-medium
            flex
            items-center
            gap-1
          "
        >
          <Plus size={16} />
          <span>New</span>
        </button>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">

        {/* Previous / Next */}
        <div className="flex border rounded overflow-hidden">
          {prevEmployee ? (
            <Link
              to={`/employees/${prevEmployee.id}`}
              className="px-3 py-2 border-r hover:bg-gray-100"
            >
              <ChevronLeft size={16} />
            </Link>
          ) : (
            <Link
              disabled
              className="px-3 py-2 border-r text-gray-400 cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </Link>
          )}

          {nextEmployee ? (
            <Link
              to={`/employees/${nextEmployee.id}`}
              className="px-3 py-2 hover:bg-gray-100"
            >
              <ChevronRight size={16} />
            </Link>
          ) : (
            <Link
              disabled
              className="px-3 py-2 text-gray-400 cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </Link>
          )}
        </div>

        {/* View Switcher */}
        <div className="flex border rounded overflow-hidden">
          <button
            onClick={() => onViewChange("kanban")}
            className={`px-3 py-2 ${
              view === "kanban"
                ? "bg-[#714B67] text-white"
                : ""
            }`}
          >
            <LayoutGrid size={16} />
          </button>

          <button
            onClick={() => onViewChange("list")}
            className={`px-3 py-2 ${
              view === "list"
                ? "bg-[#714B67] text-white"
                : ""
            }`}
          >
            <List size={16} />
          </button>
        </div>

        {/* Search */}
        <button
          onClick={onSearch}
          className="
            border
            rounded
            p-2
            hover:bg-gray-100
          "
        >
          <Search size={16} />
        </button>
      </div>
    </div>
  );
}