// src/components/AttendanceDetailsModal.tsx
import { motion } from "framer-motion";
import React from "react";
import { Worker } from "../context/AppProvider";

interface AttendanceDetailsModalProps {
  worker: Worker;
  closeModal: () => void;
}

const AttendanceDetailsModal: React.FC<AttendanceDetailsModalProps> = ({ worker, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white p-5 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2"
      >
        <h3 className="text-xl font-bold mb-3">Attendance Details for {worker.name}</h3>
        <p>
          <strong>Department:</strong> {worker.department}
        </p>
        <p>
          <strong>Phone:</strong> {worker.phone}
        </p>
        <p>
          <strong>Status:</strong> {worker.status}
        </p>
        <h4 className="mt-4 font-bold">Attendance Records:</h4>
        <div className="max-h-60 overflow-y-auto mt-2">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-1 border-b">Date</th>
                <th className="text-left p-1 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {worker.attendanceRecords.map((record, index) => (
                <tr key={index}>
                  <td className="p-1 border-b">{record.date}</td>
                  <td className={`p-1 border-b ${record.status === "Present" ? "text-green-600" : "text-red-600"}`}>
                    {record.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={closeModal}>
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AttendanceDetailsModal;
