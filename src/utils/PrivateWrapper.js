import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

const PrivateWrapper = () => {
  const isAuthenticated = useSelector(
    (state) => state.userConfig.isAuthenticated
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/masuk");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/masuk" />;
};

export default PrivateWrapper;
