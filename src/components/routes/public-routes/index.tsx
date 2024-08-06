import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = Boolean(localStorage.getItem("authenticated"));
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

export default PublicRoute;
