import {
  Bell,
  Search,
} from "lucide-react";

import { useLocation } from "react-router-dom";

export default function Header({ user = "Admin" }) {
  const pageTitles = {
    "/": "Home",
    "/dashboard": "Dashboard",
    "/guards": "Guards",
    "/attendance": "Attendance",
    "/shifts": "Shifts",
    "/incidents": "Incidents",
    "/sites": "Sites",
  };

  const location = useLocation();
  const title = pageTitles[location.pathname] || "Dashboard";

  return (
    
    <header className="h-16 flex items-center justify-between border-b px-4 bg-white dark:bg-gray-900">

      {/* LEFT SIDE */}
      <h1 className="text-2xl font-bold text-blue-600">
            {title}
      </h1>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex items-center gap-4 ml-auto">

        {/* Search */}
        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search anything..."
            className="
              w-[320px]
              h-11
              pl-11
              pr-4
              rounded-xl
              border
              border-gray-300
              bg-gray-50
              outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              transition
              dark:bg-gray-800
              dark:border-gray-700
              dark:text-white
            "
          />
        </div>

        {/* Notifications */}
        <button
          className="
            relative
            flex
            items-center
            justify-center
            w-10
            h-10
            rounded-xl
            hover:bg-gray-100
            dark:hover:bg-gray-800
            transition
          "
        >
          <Bell
            size={20}
            className="text-gray-700 dark:text-gray-200"
          />

          {/* Badge */}
          <span
            className="
              absolute
              top-1
              right-1
              flex
              items-center
              justify-center
              min-w-[18px]
              h-[18px]
              px-1
              text-[10px]
              font-semibold
              leading-none
              bg-red-500
              text-white
              rounded-full
            "
          >
            3
          </span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
            {"Krishna".charAt(0).toUpperCase()}
          </div>

          {/* User Info */}
          <div className="text-sm leading-tight">
            <p className="font-medium text-gray-900 dark:text-white">
              {"Krishna"}
            </p>

            <p className="text-xs text-gray-500">
              Admin
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}