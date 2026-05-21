import { useState } from "react";
import {
  Menu,
  Home,
  User,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      title: "Home",
      icon: <Home size={20} />,
    },
    {
      title: "Profile",
      icon: <User size={20} />,
    },
    {
      title: "Settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`
          bg-slate-900 text-white h-screen p-3
          transition-all duration-300
          ${collapsed ? "w-14" : "w-64"}
        `}
      >
        {/* Top Section */}
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold">
              My App
            </h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-slate-800"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="mt-8 flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="
                flex items-center gap-3
                p-3 rounded-lg
                hover:bg-slate-800
                transition
              "
            >
              {item.icon}

              {!collapsed && (
                <span>{item.title}</span>
              )}
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="absolute bottom-5 left-0 w-full px-3">
          <button
            className="
              flex items-center gap-3
              w-full p-3 rounded-lg
              hover:bg-red-600
              transition
            "
          >
            <LogOut size={20} />

            {!collapsed && (
              <span>Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-slate-100 min-h-screen">
        <h1 className="text-2xl font-bold">
          Main Content
        </h1>
      </div>
    </div>
  );
}