import { Navigate } from "react-router";
import { LOGIN } from "../routes";
import { useAuth } from "./useAuth";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={LOGIN} replace />;
  }

  return children;
}
