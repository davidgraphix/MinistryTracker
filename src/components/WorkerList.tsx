import { useContext, useState } from "react";
import { AppContext, Worker } from "../context/AppProvider";
import { FaChevronDown } from "react-icons/fa";

interface WorkerListProps {
  workers: Worker[];
  setWorkers: React.Dispatch<React.SetStateAction<Worker[]>>;
}

const WorkerList: React.FC<WorkerListProps> = ({ workers, setWorkers }) => {
  const [activeActionDropdown, setActiveActionDropdown] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [workerToEdit, setWorkerToEdit] = useState<Worker | null>(null);

  const handleAction = (workerId: number, action: string) => {
    setWorkers(prevWorkers =>
      prevWorkers.map(worker => {
        if (worker.id === workerId) {
          switch (action) {
            case "Edit":
              setWorkerToEdit(worker);
              setIsEditModalOpen(true);
              break;
            case "Suspend":
              return { ...worker, status: "Suspended" };
              case "Block":
              return { ...worker, status: "Blocked" };
            case "Active":
              return { ...worker, status: "Active" };
            case "Exited":
              return { ...worker, status: "Exited" };
            default:
              break;
          }
        }
        return worker;
      })
    );
    setActiveActionDropdown(null);
  };

  const EditModal = () => {
    const { departments } = useContext(AppContext);
    if (!workerToEdit) return null;
    const [editedWorker, setEditedWorker] = useState(workerToEdit);

    const saveEdit = () => {
      setWorkers(prev =>
        prev.map(worker =>
          worker.id === editedWorker.id ? editedWorker : worker
        )
      );
      setIsEditModalOpen(false);
      setWorkerToEdit(null);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-5 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2">
          <h3 className="text-xl font-bold mb-3">Edit Worker</h3>
          <input
            type="text"
            placeholder="Name"
            value={editedWorker.name}
            onChange={(e) => setEditedWorker({ ...editedWorker, name: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={editedWorker.email}
            onChange={(e) => setEditedWorker({ ...editedWorker, email: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <select
            value={editedWorker.department}
            onChange={(e) => setEditedWorker({ ...editedWorker, department: e.target.value })}
            className="w-full p-2 border rounded mb-2"
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
            value={editedWorker.phone}
            onChange={(e) => setEditedWorker({ ...editedWorker, phone: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <div className="flex justify-between">
            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </button>
            <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={saveEdit}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Department</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workers.map(worker => (
            <tr key={worker.id} className="border-b">
              <td className="p-3">{worker.id}</td>
              <td className="p-3">{worker.name}</td>
              <td className="p-3">{worker.email}</td>
              <td className="p-3">{worker.department}</td>
              <td className="p-3">{worker.phone}</td>
              <td className="p-3">{worker.status}</td>
              <td className="p-3">
                <button 
                  onClick={() => setActiveActionDropdown(prev => prev === worker.id ? null : worker.id)}
                  className="bg-gray-500 text-white px-3 py-1 rounded flex items-center transition-all duration-300 hover:scale-105"
                >
                  Actions <FaChevronDown className="ml-1" />
                </button>
                {activeActionDropdown === worker.id && (
                  <div className="absolute z-10 mt-2 w-32 bg-white shadow-lg rounded max-h-40 overflow-y-auto">
                    {["Edit", "Suspend", "Block", "Active", "Exited"].map(action => (
                      <button
                        key={action}
                        onClick={() => handleAction(worker.id, action)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditModalOpen && <EditModal />}
    </div>
  );
};

export default WorkerList;
