import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.js";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { loggedInUser } = useAuth();

  if (!loggedInUser) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(loggedInUser.userTypeID)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
