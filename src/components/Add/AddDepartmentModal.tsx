import { useContext, useState } from "react";
import { AppContext } from "../../context/AppProvider";

interface AddDepartmentModalProps {
  closeModal: () => void;
}

const AddDepartmentModal: React.FC<AddDepartmentModalProps> = ({ closeModal }) => {
  const { setDepartments, departments } = useContext(AppContext);
  const [newDeptName, setNewDeptName] = useState("");
  const [newDeptDescription, setNewDeptDescription] = useState("");

  const addDepartment = async () => {
    if (
      newDeptName &&
      newDeptDescription &&
      !departments.some((dept) => dept.name === newDeptName)
    ) {
      try {
        const token = localStorage.getItem("admin_token");
  
        const res = await fetch("https://missing-britta-ayenijeremiaho-cb384dc8.koyeb.app/departments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: newDeptName,
            description: newDeptDescription,
          }),
        });
  
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to create department");
        }
  
        const createdDept = await res.json();
        console.log("Created department:", createdDept);
        setDepartments([...departments, createdDept.data]);
  
        closeModal();
      } catch (error: any) {
        alert(error.message || "Something went wrong");
        console.error("Add department error:", error);
      }
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold mb-3">Add Department</h3>
        <input
          type="text"
          placeholder="Department Name"
          value={newDeptName}
          onChange={(e) => setNewDeptName(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          placeholder="Department Description"
          value={newDeptDescription}
          onChange={(e) => setNewDeptDescription(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={addDepartment}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDepartmentModal;
