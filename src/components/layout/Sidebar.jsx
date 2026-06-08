import { cn } from "../../lib/utils";
import "bootstrap-icons/font/bootstrap-icons.css";

import {
  LayoutDashboard,
  ShieldUser,
  ClipboardCheck,
  GitBranch,
  CalendarCheck,
  LogOutIcon,
  LogInIcon,
  Home,
  Users,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/auth/useAuth";

axios.defaults.withCredentials = true;

export default function Sidebar({ collapsed }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();

  // Menu
  const menu = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Guards", path: "/guards", icon: ShieldUser },
    { name: "Employees", path: "/employees", icon: Users },
    { name: "Departments", path: "/departments", icon: GitBranch },
    { name: "Attendance", path: "/attendance", icon: ClipboardCheck },
    { name: "Shifts", path: "/shifts", icon: CalendarCheck },
  ];

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8069/api/v1/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.clear();
      sessionStorage.clear();

      setAuth(null);

      delete axios.defaults.headers.common["Authorization"];

      navigate("/", { replace: true });
    }
  };

  return (
    <aside
      className={cn(
        `
        h-full
        bg-[#714B67]
        border-r border-white/10
        flex flex-col
        overflow-hidden
        transition-all duration-300
        `,
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">

        {menu.map((item) => {
          const Icon = item.icon;

          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                `
                h-11
                rounded-lg
                text-sm font-medium
                transition-all duration-200
                flex items-center
                active:scale-[0.98]
                `,
                collapsed
                  ? "justify-center px-0"
                  : "gap-3 px-3",

                active
                  ? `
                    bg-white
                    text-[#714B67]
                    shadow-sm
                  `
                  : `
                    text-white/90
                    hover:bg-white/10
                    hover:text-white
                  `
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  "flex items-center justify-center",
                  collapsed ? "w-full" : "min-w-[20px]"
                )}
              >
                <Icon size={20} />
              </div>

              {/* Text */}
              {!collapsed && (
                <span className="truncate">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-2">

        {auth ? (
          <button
            onClick={handleLogout}
            className={cn(
              `
              w-full
              h-11
              rounded-lg
              text-sm font-medium
              text-white/90
              transition-all duration-200
              hover:bg-red-500/20
              hover:text-white
              active:scale-[0.98]
              flex items-center
              `,
              collapsed
                ? "justify-center px-0"
                : "gap-3 px-3"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center",
                collapsed ? "w-full" : "min-w-[20px]"
              )}
            >
              <LogOutIcon size={20} />
            </div>

            {!collapsed && (
              <span className="truncate">
                Logout
              </span>
            )}
          </button>
        ) : (
          <Link
            to="/login"
            className={cn(
              `
              w-full
              h-11
              rounded-lg
              text-sm font-medium
              text-white/90
              transition-all duration-200
              hover:bg-white/10
              hover:text-white
              active:scale-[0.98]
              flex items-center
              `,
              collapsed
                ? "justify-center px-0"
                : "gap-3 px-3"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center",
                collapsed ? "w-full" : "min-w-[20px]"
              )}
            >
              <LogInIcon size={20} />
            </div>

            {!collapsed && (
              <span className="truncate">
                Login
              </span>
            )}
          </Link>
        )}

      </div>
    </aside>
  );
}