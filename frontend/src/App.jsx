import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductPage from "./pages/ProductPage";
import Sales from "./pages/Sales";
import Logs from "./pages/Logs";
import IncidentPage from "./pages/IncidentPage";

import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <ProtectedRoute>
              <Sales />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logs"
          element={
            <ProtectedRoute>
              <Logs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incidents"
          element={
            <ProtectedRoute>
              <IncidentPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
