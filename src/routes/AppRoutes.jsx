import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Guards from "../pages/Guards";
import Home  from "../pages/Home";
import Attendance from "../pages/Attendance";
import Incidents from "../pages/Incidents";
import Sites from "../pages/Sites";
import Login from "../pages/login/Login";
import Shifts from "../pages/Shifts";

import ProtectedRoute from "../components/protectedroute/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

         {/* ✅ Public Route */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* ✅ Public Route */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* ✅ Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ Guards */}
        <Route
          path="/guards"
          element={
            <ProtectedRoute>
              <Guards />
            </ProtectedRoute>
          }
        />

        {/* ✅ Attendance */}
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />

        {/* ✅ Shifts */}
        <Route
          path="/shifts"
          element={
            <ProtectedRoute>
              <Shifts />
            </ProtectedRoute>
          }
        />

        {/* ✅ Incidents */}
        <Route
          path="/incidents"
          element={
            <ProtectedRoute>
              <Incidents />
            </ProtectedRoute>
          }
        />

        {/* ✅ Sites */}
        <Route
          path="/sites"
          element={
            <ProtectedRoute>
              <Sites />
            </ProtectedRoute>
          }
        />

        {/* ✅ Fallback */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;