// src/components/AddWorkerModal.tsx
import { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";

interface AddWorkerModalProps {
  closeModal: () => void;
}

const AddWorkerModal: React.FC<AddWorkerModalProps> = ({ closeModal }) => {
  const { workers, setWorkers, departments } = useContext(AppContext);
  const [newWorker, setNewWorker] = useState({ name: "", email: "", department: "", phone: "" });

  const addWorker = () => {
    if (newWorker.name && newWorker.email && newWorker.department && newWorker.phone) {
      setWorkers([
        ...workers,
        {
          id: workers.length + 1,
          ...newWorker,
          status: "Active",
          createdAt: new Date().toISOString(),
          attendanceRecords: [],
        },
      ]);
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
      <div className="bg-white p-5 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 transition-all duration-300">
        <h3 className="text-xl font-bold mb-3">Add Worker</h3>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded mb-2"
          onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          onChange={(e) => setNewWorker({ ...newWorker, email: e.target.value })}
        />
        <select
          className="w-full p-2 border rounded mb-2"
          value={newWorker.department}
          onChange={(e) => setNewWorker({ ...newWorker, department: e.target.value })}
        >
          <option value="">Select Department</option>
          {departments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Phone"
          className="w-full p-2 border rounded mb-2"
          onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })}
        />
        <div className="flex justify-between mt-4">
          <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={closeModal}>
            Cancel
          </button>
          <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={addWorker}>
            Add Worker
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWorkerModal;
