import React from "react";
import { Navigate } from "react-router-dom";

export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token || typeof token !== "string" || token.trim() === "") {
    return false;
  }

  try {
    const parts = token.split(".");
    if (parts.length === 3) {
      const payloadBase64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(payloadBase64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const decoded = JSON.parse(jsonPayload);
      if (decoded && decoded.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp <= currentTime) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("tempUser");
          return false;
        }
      }
    }
  } catch (err) {
    // If not a standard JWT or parsing fails, presence of non-empty token string is valid
  }

  return true;
};

const PublicRoute = ({ children }) => {
  if (isTokenValid()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
