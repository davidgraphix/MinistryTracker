// src/pages/DepartmentsPage.tsx
import { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";
import DepartmentDetailModal from "../components/DepartmentDetailModal";

const DepartmentsPage = () => {
  const { departments, setDepartments, workers } = useContext(AppContext);
  const [showAddDeptForm, setShowAddDeptForm] = useState(false);
  const [newDept, setNewDept] = useState("");
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const addDepartment = () => {
    if (newDept && !departments.includes(newDept)) {
      setDepartments([...departments, newDept]);
      setNewDept("");
      setShowAddDeptForm(false);
    }
  };

  const getWorkerCountForDept = (dept: string) => {
    return workers.filter((worker) => worker.department === dept).length;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-5 overflow-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Departments</h2>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded transition-all duration-300 hover:scale-105"
            onClick={() => setShowAddDeptForm((prev) => !prev)}
          >
            Add Department
          </button>
        </div>
        {showAddDeptForm && (
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              placeholder="Department Name"
              className="w-full p-2 border rounded"
              value={newDept}
              onChange={(e) => setNewDept(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={addDepartment}
            >
              Add
            </button>
          </div>
        )}
        <ul className="space-y-2">
          {departments.map((dept, index) => (
            <li
              key={index}
              className="p-2 border rounded flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setSelectedDept(dept)}
            >
              <span className="font-medium">{dept}</span>
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                {getWorkerCountForDept(dept)}
              </span>
            </li>
          ))}
        </ul>
      </main>
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
