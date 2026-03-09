import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import EmployeeManagementApp from "./components/EmployeeManagementApp";
import { lazy, Suspense } from "react";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
const EmployeeDetails = lazy(() => import("./components/EmployeeDetails"));
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute role="employee">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute role="admin">
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to={"employee"} />} />
          <Route path="/employee" element={<EmployeeManagementApp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/employee/:id"
            element={
              <Suspense fallback={<h3>loading...</h3>}>
                <EmployeeDetails />
              </Suspense>
            }
          />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </BrowserRouter>
  );
}

export default App;
