// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboards/Dashboard";
import AdminDashboard from "../Dashboards/AdminDashboard";
import AttendancePage from "../pages/AttendancePage";
import DepartmentsPage from "../pages/DepartmentsPage";
import { AppProvider } from "../context/AppProvider";
import Layout from "../components/Routes/Layout";
import LoginPage from "../Login/LoginPage";

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workers" element={<AdminDashboard />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
