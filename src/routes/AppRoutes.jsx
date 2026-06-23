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


import ProtectedRoute from "../components/common/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<PortalSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />

        {/* Protected Layout */}

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/departments"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Departments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contractors"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Contractors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Employees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/zone-status"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <ZoneStatus />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mechanical-works"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Department1"]}>
                <MechanicalWorks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/electrical-works"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Department1"]}>
                <ElectricalWorks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-request"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Subcontractor", "Department", "Department1"]}>
                <NewRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Department", "Department1"]}>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/activity"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Activity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings/safety/precaution"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <SafetyPrecaution />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logs-reports"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <LogsReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/log-history"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Department", "Department1"]}>
                <LogHistory />
              </ProtectedRoute>
            }
          />
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