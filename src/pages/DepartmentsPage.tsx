// src/pages/DepartmentsPage.tsx
import { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import DepartmentDetailModal from "../components/DetailsModal/DepartmentDetailModal";
import AddDepartmentModal from "../components/Add/AddDepartmentModal";

const DepartmentsPage = () => {
  const { departments, workers } = useContext(AppContext);
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
  const [selectedDept, setSelectedDept] = useState<{
    id: string;
    name: string;
    description: string;
  } | null>(null);

  const getWorkerCountForDept = (deptName: string) => {
    return workers.filter((worker) => worker.department === deptName).length;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-5 overflow-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Departments</h2>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded transition-all duration-300 hover:scale-105"
            onClick={() => setShowAddDeptModal(true)}
          >
            Add Department
          </button>
        </div>
        <ul className="space-y-2">
          {departments.map((dept) => (
            <li
              key={dept.id}
              className="p-2 border rounded flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setSelectedDept(dept)}
            >
              <div>
                <p className="font-medium">{dept.name}</p>
                <p className="text-sm text-gray-600">{dept.description}</p>
              </div>
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                {getWorkerCountForDept(dept.name)}
              </span>
            </li>
          ))}
        </ul>
      </main>
      {showAddDeptModal && (
        <AddDepartmentModal closeModal={() => setShowAddDeptModal(false)} />
      )}
      {selectedDept && (
        <DepartmentDetailModal
          department={selectedDept}
          onClose={() => setSelectedDept(null)}
        />
      )}
    </div>
  );
};

export default DepartmentsPage;
