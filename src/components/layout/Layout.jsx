import { useState } from "react";
import Sidebar from "./Sidebar";
// import useAuth from "../hooks/auth/useAuth";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Layout({ children }) {
  // const { auth } = useAuth();

  // Sidebar collapsed state
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-[#f5f6fa]">
      
      {/* Top Navbar */}
      <header
  className="
    h-14
    bg-[#714B67]
    text-white
    flex items-center justify-between
    px-3
    border-b border-white/10
  "
>
  {/* Left */}
  <div className="flex items-center gap-0">

    {/* Apps Button */}
    <button
      onClick={() => setCollapsed(!collapsed)}
      className="
        w-10 h-10
        flex items-center justify-center
        rounded-lg
        text-white
        hover:bg-white/10
        active:bg-white/20
        transition-all duration-200
      "
    >
      <i className="bi bi-grid-3x3-gap text-[20px]"></i>
    </button>

    {/* Title */}
    <span className="truncate">
      Employees
    </span>

  </div>

  {/* Right */}
  <div className="flex items-center gap-3">
    <span className="text-sm">
      User
    </span>
  </div>
</header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">

        

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}