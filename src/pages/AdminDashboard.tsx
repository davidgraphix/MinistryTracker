// src/pages/AdminDashboard.tsx
import { useContext, useState } from "react";
import WorkerList from "../components/WorkerList";
import AddWorkerModal from "../components/AddWorkerModal";
import { AppContext } from "../context/AppProvider";
import { FaChevronDown } from "react-icons/fa";

const AdminDashboard = () => {
  const { workers, setWorkers } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isWorkerModalOpen, setIsWorkerModalOpen] = useState(false);
  const [addDropdownOpen, setAddDropdownOpen] = useState(false);

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-5 overflow-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">DC Workers List</h2>
          <div className="flex gap-4 items-center mt-2 md:mt-0">
            <input
              type="text"
              placeholder="Search worker..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded"
            />
            <div className="relative">
              <button 
                onClick={() => setAddDropdownOpen(prev => !prev)}
                className="bg-blue-500 text-white px-3 py-1 rounded flex items-center transition-all duration-300 hover:scale-105"
              >
                Add <FaChevronDown className="ml-2" />
              </button>
              {addDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded">
                  <button 
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={() => {
                      setIsWorkerModalOpen(true);
                      setAddDropdownOpen(false);
                    }}
                  >
                    Add Worker
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <WorkerList workers={filteredWorkers} setWorkers={setWorkers} />
        </div>
      </main>
      {isWorkerModalOpen && <AddWorkerModal closeModal={() => setIsWorkerModalOpen(false)} />}
    </div>
  );
};

export default AdminDashboard;
