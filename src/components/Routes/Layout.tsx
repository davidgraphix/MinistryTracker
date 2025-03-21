// src/components/Layout.tsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Mobile Hamburger */}
      <div className="md:hidden p-3">
        <button onClick={() => setSidebarOpen(true)}>
          <FaBars className="text-2xl" />
        </button>
      </div>
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="bg-white p-5 shadow-md h-full w-64">
            <button onClick={() => setSidebarOpen(false)} className="mb-4">
              Close
            </button>
            <Sidebar />
          </div>
        </div>
      )}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default Layout;
