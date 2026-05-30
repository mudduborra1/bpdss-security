import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Guards from "../pages/Guards";

import Home  from "../pages/Home";
import Incidents from "../pages/Incidents";
import Sites from "../pages/Sites";
import Login from "../pages/Login";
import Shifts from "../pages/Shifts";

import ProtectedRoute from "../components/protectedroute/ProtectedRoute";
import AttendanceSheet from "../components/attendance/AttendanceSheet";


import EmployeeDetails from "../pages/EmployeeDetails ";
import EmployeeCreate from "../pages/EmployeeCreate";
import EmployeeUpdate from "../pages/EmployeeUpdate";

import DepartmentDetails from "../pages/DepartmentDetails";




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
          path="/employees"
          element={
            <ProtectedRoute>
              <EmployeeDetails />
            </ProtectedRoute>
          }
        />

        <Route path="/employees/new" element={<ProtectedRoute><EmployeeCreate /></ProtectedRoute>} />

        <Route path="/employees/:id" element={<ProtectedRoute><EmployeeUpdate /></ProtectedRoute>} />


         {/* ✅ Guards */}
        <Route
          path="/departments"
          element={
            <ProtectedRoute>
              <DepartmentDetails />
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
              <AttendanceSheet />
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