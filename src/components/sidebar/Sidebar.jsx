import { cn } from "@/lib/utils";

import {
  LayoutDashboard,
  ShieldUser,
  ClipboardCheck,
  CalendarCheck,
  Menu,
  LogOutIcon,
  LogInIcon,
  Home,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

import useAuth from "../hooks/auth/useAuth";
import useLogout from "../hooks/auth/useLogout";

export default function Sidebar({ collapsed, onToggle }) {

  const menu = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Guards", path: "/guards", icon: ShieldUser },
    { name: "Attendance", path: "/attendance", icon: ClipboardCheck },
    { name: "Shifts", path: "/shifts", icon: CalendarCheck },
  ];

  const { auth } = useAuth();
  const logout = useLogout();
  const location = useLocation();
  

  return (
    <aside
      className={cn(
        "h-screen flex flex-col border-r bg-white dark:bg-gray-900 transition-all duration-300",
        collapsed ? "w-14" : "w-56"
      )}
    >

      {/* Toggle */}
      <button
        onClick={onToggle}
        className="h-16 flex items-center justify-center border-b"
      >
        <Menu size={20} />
      </button>

      {/* Menu */}
      <nav className="flex flex-col flex-1 p-2 gap-1">

        {menu.map((item) => {

          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                "hover:bg-gray-100 dark:hover:bg-gray-800",
                location.pathname === item.path &&
                  "bg-gray-200 dark:bg-gray-800"
              )}
            >
              <Icon size={18} />

              {!collapsed && (
                <span>{item.name}</span>
              )}

            </Link>
          );
        })}

      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-gray-200 dark:border-gray-700">

       
        {auth?.username ? (

          <button
            onClick={logout}
            className="
              flex items-center gap-3
              px-3 py-2
              rounded-xl
              text-sm font-medium
              text-red-500
              hover:bg-red-50
              dark:hover:bg-red-900/20
              transition-all duration-200
              w-full
            "
          >
            <LogOutIcon size={18} />

            {!collapsed && (
              <span>Logout</span>
            )}

          </button>

        ) : (

          <Link
            to="/login"
            className="
              flex items-center gap-3
              px-3 py-2
              rounded-xl
              text-sm font-medium
              text-blue-500
              hover:bg-blue-50
              transition-all
              w-full
            "
          >
            <LogInIcon size={18} />

            {!collapsed && (
              <span>Login</span>
            )}

          </Link>

        )}

      </div>

    </aside>
  );
}