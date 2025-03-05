import React, { createContext, useState } from 'react';

export interface AttendanceRecord {
  date: string;
  status: "Present" | "Absent";
}

export interface Worker {
  id: number;
  name: string;
  email: string;
  department: string;
  phone: string;
  status: string;
  attendanceRecords: AttendanceRecord[];
  createdAt: string; // For new workers calculation
}

interface AppContextProps {
  workers: Worker[];
  setWorkers: React.Dispatch<React.SetStateAction<Worker[]>>;
  departments: string[];
  setDepartments: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AppContext = createContext<AppContextProps>({
  workers: [],
  setWorkers: () => {},
  departments: [],
  setDepartments: () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workers, setWorkers] = useState<Worker[]>([
    {
      id: 1,
      name: "David Smart",
      email: "david@example.com",
      department: "Media",
      phone: "123-456-7890",
      status: "Active",
      attendanceRecords: [
        { date: "2023-02-20", status: "Present" },
        { date: "2023-02-21", status: "Absent" },
        { date: "2023-02-22", status: "Present" },
      ],
      createdAt: "2025-02-20T00:00:00.000Z",
    },
    {
      id: 2,
      name: "Smart Smith",
      email: "smart@example.com",
      department: "Ushering",
      phone: "987-654-3210",
      status: "Suspended",
      attendanceRecords: [
        { date: "2023-02-20", status: "Absent" },
        { date: "2023-02-21", status: "Present" },
        { date: "2023-02-22", status: "Present" },
      ],
      createdAt: "2025-02-22T00:00:00.000Z",
    },
  ]);

  const [departments, setDepartments] = useState<string[]>([
    "Choir",
    "Ushering",
    "Technical",
    "Media",
    "Protocol",
    "Children",
    "Welfare",
  ]);

  return (
    <AppContext.Provider value={{ workers, setWorkers, departments, setDepartments }}>
      {children}
    </AppContext.Provider>
  );
};
