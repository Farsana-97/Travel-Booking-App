import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  let role = null;
  try {
    const stored = localStorage.getItem("role");
    role = stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error("Error parsing role from localStorage", err);
    role = null;
  }

  if (role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
