import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.js";

const ProtectedRoute = ({ children }) => {
  const { loggedInUser } = useAuth();

  if (!loggedInUser) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
