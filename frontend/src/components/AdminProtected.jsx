import React from "react";
import { Navigate } from "react-router-dom";

export const AdminProtected = ({ children }) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};
