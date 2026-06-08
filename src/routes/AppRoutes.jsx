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

import AttendanceSheet from "../pages/attendance/AttendanceSheet";
import BatchAttendance from "../pages/attendance/AttendanceBatch";
import BiometricLogs from "../pages/attendance/BiometricLogs";
import ManualAttendance from "../pages/attendance/ManualAttendance";
import AttendanceRegister from "../pages/attendance/AttendanceRegister";
import AttendanceDashboard from "../pages/attendance/AttendanceDashboard";
import AttendanceBatchList from "../pages/attendance/AttendanceBatchList";
import Attendance_Qr from "../pages/attendance/Attendance_Qr";










import EmployeeDetails from "../pages/employees/EmployeeDetails ";
import EmployeeCreate from "../pages/employees/EmployeeCreate";
import EmployeeUpdate from "../pages/employees/EmployeeUpdate";

import DepartmentDetails from "../pages/departments/DepartmentDetails";
import { setPageTitle } from "../utils/setPageTitle";
import { useEffect } from "react";




function AppRoutes() {

  useEffect(() => {
    setPageTitle("My App");
  }, []);

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

         {/* ✅ Attendance QR SCAN*/}
         <Route
          path="/attendance/scan"
          element={
            <ProtectedRoute>
              <Attendance_Qr/>
            </ProtectedRoute>
          }
        />

             {/* ✅ Attendance Batch*/}
        <Route
          path="/attendance/batch"
          element={
            <ProtectedRoute>
              <BatchAttendance />
            </ProtectedRoute>
          }
        />

               {/* ✅ Attendance Biometric*/}
        <Route
          path="/attendance/biometric"
          element={
            <ProtectedRoute>
              <BiometricLogs />
            </ProtectedRoute>
          }
        />

           {/* ✅ Attendance Manual*/}
        <Route
          path="/attendance/manual"
          element={
            <ProtectedRoute>
              <ManualAttendance />
            </ProtectedRoute>
          }
        />

           {/* ✅ Attendance Register*/}
        <Route
          path="/attendance/register"
          element={
            <ProtectedRoute>
              <AttendanceRegister />
            </ProtectedRoute>
          }
        />

           {/* ✅ Attendance BatchList*/}

         <Route
          path="/attendance/batchlist"
          element={
            <ProtectedRoute>
              <AttendanceBatchList />
            </ProtectedRoute>
          }
        />

         

         {/* ✅ Attendance Dashboard*/}
        <Route
          path="/attendance/dashboard"
          element={
            <ProtectedRoute>
              <AttendanceDashboard />
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