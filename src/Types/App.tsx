// src/App.tsx
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Dashboard from "../Dashboards/Dashboard";
import AdminDashboard from "../Dashboards/AdminDashboard";
import AttendancePage from "../pages/AttendancePage";
import DepartmentsPage from "../pages/DepartmentsPage";
import { AppProvider } from "../context/AppProvider";
import Layout from "../components/Routes/Layout";
import LoginPage from "../Login/LoginPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppProvider>
      <Router>
        {isLoggedIn ? (
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/workers" element={<AdminDashboard />} />
              <Route path="/attendance" element={<AttendancePage />} />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={<LoginPage onLogin={() => setIsLoggedIn(true)} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </Router>
    </AppProvider>
  );
}

export default App;
