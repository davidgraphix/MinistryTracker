// src/components/DepartmentDetailModal.tsx
import { useContext } from "react";
import { motion } from "framer-motion";
import { AppContext, Worker } from "../../context/AppProvider";

interface Department {
  id: string;
  name: string;
}

interface DepartmentDetailModalProps {
  department: Department; // Updated to accept an object with id and name
  onClose: () => void;
}

const DepartmentDetailModal: React.FC<DepartmentDetailModalProps> = ({ department, onClose }) => {
  const { workers, setWorkers } = useContext(AppContext);

  // Filter workers based on the department name
  const deptWorkers = workers.filter(worker => worker.department === department.name);

  const removeWorkerFromDepartment = (workerId: number) => {
    setWorkers(prevWorkers =>
      prevWorkers.map(worker =>
        worker.id === workerId ? { ...worker, department: "" } : worker
      )
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white p-5 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2"
      >
        <h3 className="text-xl font-bold mb-3">Workers in {department.name}</h3>
        {deptWorkers.length === 0 ? (
          <p>No workers in this department.</p>
        ) : (
          <ul className="space-y-2">
            {deptWorkers.map((worker: Worker) => (
              <li key={worker.id} className="p-2 border rounded flex justify-between items-center">
                <div>
                  <p className="font-medium">{worker.firstName} {worker.lastName}</p>
                  <p className="text-sm text-gray-600">{worker.email}</p>
                </div>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => removeWorkerFromDepartment(worker.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white px-3 py-1 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DepartmentDetailModal;
