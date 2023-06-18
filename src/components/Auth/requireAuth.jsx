import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { authState } = useContext(AuthContext);
  const location = useLocation();
  return authState.token ? (
    <Outlet />
  ) : (
    <Navigate to="/register" state={{ from: location }} replace />
  );
};

export default RequireAuth;
