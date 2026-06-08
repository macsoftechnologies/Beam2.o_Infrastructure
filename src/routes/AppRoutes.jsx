import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "../components/adminlayout/Layout";

import PortalSelection from "../pages/PortalSelection/PortalSelection";

import Login from "../pages/Auth/Login/Login";
import Otp from "../pages/Auth/OTP/OTP";

import Dashboard from "../pages/Dashboard/Dashboard";
import Departments from "../pages/Departments/Departments";
import Contractors from "../pages/Contractors/Contractors";
import Employees from "../pages/Employees/Employees";
import ZoneStatus from "../pages/ZoneStatus/ZoneStatus";
import MechanicalWorks from "../pages/MechanicalWorks/MechanicalWorks";
import ElectricalWorks from "../pages/ElectricalWorks/ElectricalWorks";
import NewRequest from "../pages/Request/NewRequest/NewRequest";
import Reports from "../pages/Reports/Reports";
import Activity from "../pages/Settings/Activity/Activity";
import SafetyPrecaution from "../pages/Settings/SafetyPrecaution/SafetyPrecaution";
import LogsReports from "../pages/LogsReports/LogsReports";
import LogHistory from "../pages/LogHistroy/LogHistroy";


// import ProtectedRoute from "../components/common/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<PortalSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />

        {/* Protected Layout */}

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/contractors" element={<Contractors />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/zone-status" element={<ZoneStatus />} />
          <Route path="/mechanical-works" element={<MechanicalWorks />} />
          <Route path="/electrical-works" element={<ElectricalWorks />} />
          <Route path="/new-request" element={<NewRequest />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings/activity" element={<Activity />} />
          <Route path="/settings/safety/precaution" element={<SafetyPrecaution />} />
          <Route path="/logs-reports" element={<LogsReports />} />
          <Route path="/log-history" element={<LogHistory />} />
        </Route>

        {/* <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route> */}

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;