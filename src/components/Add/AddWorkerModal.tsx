// src/components/AddWorkerModal.tsx
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppProvider";

interface AddWorkerModalProps {
  closeModal: () => void;
}

const AddWorkerModal: React.FC<AddWorkerModalProps> = ({ closeModal }) => {
  const { workers, setWorkers, departments } = useContext(AppContext);
  const [newWorker, setNewWorker] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    phone: "",
  });
  const [selectedDeptDescription, setSelectedDeptDescription] = useState("");

  const handleDepartmentChange = (deptId: string) => {
    const selectedDept = departments.find((dept) => dept.id === deptId);
    setSelectedDeptDescription(selectedDept?.description || "");
    setNewWorker({ ...newWorker, department: deptId });
  };

  const addWorker = async () => {
    if (
      newWorker.firstName &&
      newWorker.lastName &&
      newWorker.email &&
      newWorker.department &&
      newWorker.phone
    ) {
      try {
        const token = localStorage.getItem("admin_token");
  
        if (!token) {
          alert("You are not logged in. Please log in again.");
          return;
        }
  
        console.log("Using token:", token);
  
        const payload = {
          firstname: newWorker.firstName,
          lastname: newWorker.lastName,
          email: newWorker.email,
          phoneNumber: newWorker.phone,
          departmentId: newWorker.department,
        };
  
        console.log("Payload to send:", payload);
  
        const response = await fetch(
          "https://missing-britta-ayenijeremiaho-cb384dc8.koyeb.app/workers",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create worker");
        }
  
        const createdWorker = await response.json();
  
        console.log("Created worker:", createdWorker);
  
        // Update the workers state with the new worker
        setWorkers([
          ...workers,
          {
            id: createdWorker.data.id, // Ensure this matches the API response
            firstName: createdWorker.data.firstname,
            lastName: createdWorker.data.lastname,
            email: createdWorker.data.email,
            phone: createdWorker.data.phoneNumber,
            department: createdWorker.data.departmentId,
            status: "Active", // Default status
            createdAt: new Date().toISOString(), // Add created date
            attendanceRecords: [], // Initialize with empty attendance records
          },
        ]);
  
        closeModal();
      } catch (error: any) {
        alert("Error creating worker. Please try again.");
        console.error("Error:", error);
      }
    } else {
      alert("Please fill in all fields before adding a worker.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
      <div className="bg-white p-5 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 transition-all duration-300">
        <h3 className="text-xl font-bold mb-3">Add Worker</h3>
        <input
          type="text"
          placeholder="First Name"
          className="w-full p-2 border rounded mb-2"
          onChange={(e) =>
            setNewWorker({ ...newWorker, firstName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full p-2 border rounded mb-2"
          onChange={(e) =>
            setNewWorker({ ...newWorker, lastName: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
          onChange={(e) =>
            setNewWorker({ ...newWorker, email: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Phone"
          className="w-full p-2 border rounded mb-2"
          onChange={(e) =>
            setNewWorker({ ...newWorker, phone: e.target.value })
          }
        />
          <select
            className="w-full p-2 border rounded mb-2"
            value={newWorker.department}
            onChange={(e) => handleDepartmentChange(e.target.value)}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
          {selectedDeptDescription && (
            <p className="text-sm text-gray-600 mb-2">
              Description: {selectedDeptDescription}
            </p>
          )}
        <div className="flex justify-between mt-4">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={addWorker}
          >
            Add Worker
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWorkerModal;
