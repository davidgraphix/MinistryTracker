import { useContext, useState } from "react";
import { AppContext } from "../context/AppProvider";

interface AddDepartmentModalProps {
  closeModal: () => void;
}

const AddDepartmentModal: React.FC<AddDepartmentModalProps> = ({ closeModal }) => {
  const { setDepartments, departments } = useContext(AppContext);
  const [newDept, setNewDept] = useState("");

  const addDepartment = () => {
    if (newDept && !departments.includes(newDept)) {
      setDepartments([...departments, newDept]);
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold mb-3">Add Department</h3>
        <input
          type="text"
          placeholder="Department Name"
          value={newDept}
          onChange={(e) => setNewDept(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <div className="flex justify-between">
          <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={closeModal}>
            Cancel
          </button>
          <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={addDepartment}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDepartmentModal;
