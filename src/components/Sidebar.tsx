// src/components/Sidebar.tsx
import { Link } from "react-router-dom";
import { FaUsers, FaCalendarCheck, FaSignOutAlt, FaTachometerAlt, FaBuilding } from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white p-5 shadow-md h-full flex flex-col">
      <nav>
        <ul className="space-y-3">
          <li>
            <Link to="/" className="flex items-center gap-2">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/workers" className="flex items-center gap-2">
              <FaUsers /> Workers
            </Link>
          </li>
          <li>
            <Link to="/attendance" className="flex items-center gap-2">
              <FaCalendarCheck /> Attendance
            </Link>
          </li>
          <li>
            <Link to="/departments" className="flex items-center gap-2">
              <FaBuilding /> Departments
            </Link>
          </li>
        </ul>
      </nav>
      <button className="mt-auto flex items-center gap-2 text-red-500">
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;
