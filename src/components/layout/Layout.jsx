import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import useAuth from '../hooks/auth/useAuth';

export default function Layout({ children }) {

  const { auth } = useAuth();

  // default collapsed
  const [collapsed, setCollapsed] = useState(true);

  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
  collapsed={collapsed}
  onToggle={() => setCollapsed(!collapsed)}
/>

      <div className="flex flex-col flex-1">
        <Header onToggle={() => setCollapsed(!collapsed)} />

        <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-950">
          {children}
        </main>
      </div>
    </div>
  );
}