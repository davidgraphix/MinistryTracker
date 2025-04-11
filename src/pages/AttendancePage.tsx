// src/pages/AttendancePage.tsx
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import AttendanceDetailsModal from "../components/DetailsModal/AttendanceDetailsModal";
import { AppContext, Worker } from "../context/AppProvider";

const AttendancePage = () => {
  const { workers } = useContext(AppContext);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  const getAttendanceStatusForDate = (worker: Worker, date: string) => {
    if (!date) return "N/A";
    const record = worker.attendanceRecords.find((rec) => rec.date === date);
    return record ? record.status : "N/A";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-5 overflow-auto">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">DC Attendance Records</h2>
          <div className="mt-2 flex items-center">
            <label htmlFor="serviceDate" className="mr-2">
              Filter by Service Date:
            </label>
            <input
              id="serviceDate"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm md:text-base">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Attendance on {selectedDate || "N/A"}</th>
                <th className="p-3 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((worker) => (
                <motion.tr
                  key={worker.id}
                  className="border-b"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td className="p-3">{worker.id}</td>
                  <td className="p-3">{worker.firstName} {" "} {worker.lastName}</td>
                  <td className="p-3">{worker.department}</td>
                  <td className="p-3">{worker.phone}</td>
                  <td className="p-3">{worker.status}</td>
                  <td
                    className={`p-3 font-bold ${
                      getAttendanceStatusForDate(worker, selectedDate) === "Present"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {getAttendanceStatusForDate(worker, selectedDate)}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedWorker(worker)}
                      className="bg-blue-500 text-white px-3 py-1 rounded transition-all duration-300 hover:scale-105"
                    >
                      View Details
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      {selectedWorker && (
        <AttendanceDetailsModal
          worker={selectedWorker}
          closeModal={() => setSelectedWorker(null)}
        />
      )}
    </div>
  );
};

export default AttendancePage;
