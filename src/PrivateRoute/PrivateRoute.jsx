import React from "react";
import { useAuth } from "../hooks/auth";
import { Navigate, useLocation } from "react-router";
import { useNavigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>loading</div>;
    }
    
  if (user && user?.uid) {
    return children;
  }

  return <Navigate to="/login" replace state={{ from: location }} />;
};

export default PrivateRoute;
