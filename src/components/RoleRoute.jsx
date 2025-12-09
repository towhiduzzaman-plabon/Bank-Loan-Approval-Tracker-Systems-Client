import LoadingSpinner from "./LoadingSpinner";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";


const RoleRoute = ({ allowed, children }) => {
  const { role, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (!allowed.includes(role)) {
    return <Navigate to="/dashboard/profile" replace />;
  }

  return children;
};

export default RoleRoute;
