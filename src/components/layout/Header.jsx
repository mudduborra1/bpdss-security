import { cn } from "../../lib/utils";

import {
  LayoutDashboard,
  ShieldUser,
  ClipboardCheck,
  CalendarCheck,
  Home,
  Users,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export default function HeaderMenu() {
  const location = useLocation();

  const menu = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Guards", path: "/guards", icon: ShieldUser },
    { name: "Employees", path: "/employees", icon: Users },
    { name: "Attendance", path: "/attendance", icon: ClipboardCheck },
    { name: "Shifts", path: "/shifts", icon: CalendarCheck },
  ];

  return (
    <nav className="flex items-center gap-1">
      {menu.map((item) => {
        const Icon = item.icon;

        const active = location.pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              `
              h-10
              px-4
              rounded-md
              flex items-center gap-2
              text-sm font-medium
              transition-all duration-200
              `,
              active
                ? "bg-white text-[#714B67]"
                : "text-white/90 hover:bg-white/10 hover:text-white"
            )}
          >
            <Icon size={18} />

            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}