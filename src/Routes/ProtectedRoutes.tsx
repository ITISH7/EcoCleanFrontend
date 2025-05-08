import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = cookies.get("token");
  const role = cookies.get("role");

  if (!token) {
    return <Navigate to="/loginandsignup/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    console.log("Role: ", role);
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;