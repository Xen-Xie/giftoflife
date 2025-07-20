import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../auth/useAuth";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (!user.isAdmin) return <Navigate to="/dashboard" />;

  return children;
};

export default AdminRoute;
