import React from "react";
import { useAuth } from "../hooks/auth";
import { Navigate, useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useIsAdmin } from "../hooks/isAdmin";

const PrivateRoute = ({ children }) => {
  const { isAdmin, isAdminLoading } = useIsAdmin();
  const location = useLocation();

  if (isAdminLoading) {
    return <div>loading</div>;
  }

  if (isAdmin) {
    return children;
  }

  return <Navigate to="/login" replace state={{ from: location }} />;
};

export default PrivateRoute;
