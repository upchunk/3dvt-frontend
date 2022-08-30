import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateWrapper = () => {
  const isAuthenticated = useSelector(
    (state) => state.userConfig.isAuthenticated
  );
  return isAuthenticated ? <Outlet /> : <Navigate to="/masuk" />;
};

export default PrivateWrapper;
