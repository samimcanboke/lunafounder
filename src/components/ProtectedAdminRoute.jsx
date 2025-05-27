import React from "react";
import { Navigate } from "react-router-dom";

// JWT parse helper
const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

const ProtectedAdminRoute = ({ element: Element }) => {
  const token = localStorage.getItem("token");
  const decoded = token && parseJwt(token);
  if (decoded?.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <Element />;
};

export default ProtectedAdminRoute;
