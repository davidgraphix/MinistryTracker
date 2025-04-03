import { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppProvider";
import {
  FaUserPlus,
  FaCheckCircle,
  FaTimesCircle,
  FaChartPie,
  FaUsers,
  FaUser,
} from "react-icons/fa";
import dayjs from "dayjs";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { workers } = useContext(AppContext);
  const [filterDays, setFilterDays] = useState(30); // Default to 30 days

  const totalWorkers = workers.length;

  const newWorkersLast7Days = useMemo(() => {
    const sevenDaysAgo = dayjs().subtract(7, "day");
    return workers.filter((worker) =>
      dayjs(worker.createdAt).isAfter(sevenDaysAgo)
    ).length;
  }, [workers]);

  const activeWorkers = workers.filter((w) => w.status === "Active").length;
  const blockedWorkers = workers.filter((w) => w.status === "Blocked").length;
  const suspendedWorkers = workers.filter(
    (w) => w.status === "Suspended"
  ).length;

  const { presentCount, totalCount } = workers.reduce(
    (acc, worker) => {
      acc.presentCount += worker.attendanceRecords.filter(
        (rec) => rec.status === "Present"
      ).length;
      acc.totalCount += worker.attendanceRecords.length;
      return acc;
    },
    { presentCount: 0, totalCount: 0 }
  );
  const overallAttendance =
    totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  const filteredWorkers = useMemo(() => {
    const filterDate = dayjs().subtract(filterDays, "day");
    return workers.map((worker) => {
      const filteredRecords = worker.attendanceRecords.filter((rec) =>
        dayjs(rec.date).isAfter(filterDate)
      );
      return { ...worker, attendanceRecords: filteredRecords };
    });
  }, [workers, filterDays]);

  const sortedByAttendance = [...filteredWorkers].sort((a, b) => {
    const aPresents = a.attendanceRecords.filter(
      (rec) => rec.status === "Present"
    ).length;
    const bPresents = b.attendanceRecords.filter(
      (rec) => rec.status === "Present"
    ).length;
    return bPresents - aPresents;
  });
  const topThirty = sortedByAttendance.slice(0, 30);

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-5 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">DC Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <motion.div className="bg-white rounded shadow p-4 flex items-center transition-all duration-300 hover:scale-105">
            <div className="text-blue-500 text-3xl mr-4">
              <FaUsers />
            </div>
            <div>
              <h2 className="text-xl font-bold">Total Workers</h2>
              <p className="text-2xl">{totalWorkers}</p>
            </div>
          </motion.div>
          <motion.div className="bg-white rounded shadow p-4 flex items-center transition-all duration-300 hover:scale-105">
            <div className="text-green-500 text-3xl mr-4">
              <FaUserPlus />
            </div>
            <div>
              <h2 className="text-xl font-bold">New Workers (Last 7 days)</h2>
              <p className="text-2xl">{newWorkersLast7Days}</p>
            </div>
          </motion.div>
          <motion.div className="bg-white rounded shadow p-4 flex items-center transition-all duration-300 hover:scale-105">
            <div className="text-yellow-500 text-3xl mr-4">
              <FaChartPie />
            </div>
            <div>
              <h2 className="text-xl font-bold">Attendance %</h2>
              <p className="text-2xl">{overallAttendance}%</p>
            </div>
          </motion.div>
          <motion.div className="bg-white rounded shadow p-4 flex items-center transition-all duration-300 hover:scale-105">
            <div className="text-green-600 text-3xl mr-4">
              <FaCheckCircle />
            </div>
            <div>
              <h2 className="text-xl font-bold">Active</h2>
              <p className="text-2xl">{activeWorkers}</p>
            </div>
          </motion.div>
          <motion.div className="bg-white rounded shadow p-4 flex items-center transition-all duration-300 hover:scale-105">
            <div className="text-red-600 text-3xl mr-4">
              <FaTimesCircle />
            </div>
            <div>
              <h2 className="text-xl font-bold">Blocked</h2>
              <p className="text-2xl">{blockedWorkers}</p>
            </div>
          </motion.div>
          <motion.div className="bg-white rounded shadow p-4 flex items-center transition-all duration-300 hover:scale-105">
            <div className="text-orange-600 text-3xl mr-4">
              <FaUser />
            </div>
            <div>
              <h2 className="text-xl font-bold">Suspended</h2>
              <p className="text-2xl">{suspendedWorkers}</p>
            </div>
          </motion.div>
        </div>
        <div className="bg-white rounded shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              Attendance Leadership Board (Last {filterDays} Days)
            </h2>
            <select
              className="border rounded px-3 py-2"
              value={filterDays}
              onChange={(e) => setFilterDays(Number(e.target.value))}
            >
              <option value={7}>Last 7 Days</option>
              <option value={30}>Last 30 Days</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr>
                  <th className="py-2 px-4">Rank</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Department</th>
                  <th className="py-2 px-4">Presents</th>
                  <th className="py-2 px-4">Absents</th>
                </tr>
              </thead>
              <tbody>
                {topThirty.map((worker, index) => {
                  const presents = worker.attendanceRecords.filter(
                    (rec) => rec.status === "Present"
                  ).length;
                  const absents = worker.attendanceRecords.filter(
                    (rec) => rec.status === "Absent"
                  ).length;
                  return (
                    <tr key={worker.id} className="border-b">
                      <td className="py-2 px-4">{index + 1}</td>
                      <td className="py-2 px-4">
                        {worker.firstName}
                        {" "}
                        {worker.lastName}
                      </td>
                      <td className="py-2 px-4">{worker.department}</td>
                      <td className="py-2 px-4">{presents}</td>
                      <td className="py-2 px-4">{absents}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
