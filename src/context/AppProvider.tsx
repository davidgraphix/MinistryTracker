//This file is the "brain" of the application. It manages the workers and departments.

// Importing React hooks and Context API
import React, { createContext, useState, useEffect } from "react";




// Define the shape of attendance records
export interface AttendanceRecord {
  date: string;
  status: "Present" | "Absent";
}

// Define the structure of a worker
export interface Worker {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  phone: string;
  status: string;
  attendanceRecords: AttendanceRecord[];
  createdAt: string; // For new workers calculation
}

// Define the structure of a department
export interface Department {
  id: string;
  name: string;
  description: string;
}

// Define the global state structure
interface AppContextProps {
  workers: Worker[];
  setWorkers: React.Dispatch<React.SetStateAction<Worker[]>>;
  departments: Department[];
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
}

// Create the context with default empty values
export const AppContext = createContext<AppContextProps>({
  workers: [],
  setWorkers: () => {},
  departments: [],
  setDepartments: () => {},
});

// Create the provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Manage workers with state
  const [workers, setWorkers] = useState<Worker[]>([
    // {
    //   id: 1,
    //   firstName: "Jeremiah",
    //   lastName: "Ayeni",
    //   email: "Ayenijerry@gmail.com",
    //   department: "Media",
    //   phone: "123-456-7890",
    //   status: "Active",
    //   attendanceRecords: [
    //     { date: "2023-02-20", status: "Present" },
    //     { date: "2023-02-21", status: "Absent" },
    //     { date: "2023-02-22", status: "Present" },
    //   ],
    //   createdAt: "2025-02-20T00:00:00.000Z",
    // },
    // {
    //   id: 2,
    //   firstName: "Ononobi",
    //   lastName: "Praise",

    //   email: "praise@gmail.com",
    //   department: "Ushering",
    //   phone: "987-654-3210",
    //   status: "Suspended",
    //   attendanceRecords: [
    //     { date: "2023-02-20", status: "Absent" },
    //     { date: "2023-02-21", status: "Present" },
    //     { date: "2023-02-22", status: "Present" },
    //   ],
    //   createdAt: "2025-02-22T00:00:00.000Z",
    // },
  ]);

  // Manage departments with state
  const [departments, setDepartments] = useState<Department[]>([
    // { id: "1", name: "Engineering", description: "Handles all technical tasks" },
    // { id: "2", name: "HR", description: "Manages employee relations" },
  ]);


  // Fetch departments from backend on load
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch("https://missing-britta-ayenijeremiaho-cb384dc8.koyeb.app/departments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to load departments");

        const data = await res.json();
        setDepartments(data.data); // Assuming real data is in data.data
        console.log("Fetched departments:", data.data);
      } catch (err) {
        console.error("Department fetch error:", err);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <AppContext.Provider
      value={{ workers, setWorkers, departments, setDepartments }}
    >
      {children}
    </AppContext.Provider>
  );
};
