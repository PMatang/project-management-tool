import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (!token) return <Navigate to="/" />;

  // 🔥 DO NOT REDIRECT PROFILE PAGE
  if (location.pathname.startsWith("/profile")) {
    return children;
  }

  // Admin-only route protection
  if (adminOnly && role !== "admin") {
    return <Navigate to="/member" />;
  }

  return children;
};

export default ProtectedRoute;
