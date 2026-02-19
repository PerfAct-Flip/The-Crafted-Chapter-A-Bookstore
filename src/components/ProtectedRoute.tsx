import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  // If no token → send to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists → allow route
  return <Outlet />;
}
