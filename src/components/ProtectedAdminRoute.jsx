import React from "react";
import { Navigate, Route } from "react-router-dom";
import useUserStore from "../store/userStore";

const ProtectedAdminRoute = ({ element: Element, ...rest }) => {
  const { user } = useUserStore();

  if (!user?.role === "admin") {
    // Redirect to home if not admin
    return <Navigate to="/" replace />;
  }

  return <Route {...rest} element={<Element />} />;
};

export default ProtectedAdminRoute;
