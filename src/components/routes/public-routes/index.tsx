import { Navigate } from "react-router-dom";

type PublicRouteProps = {
  element: JSX.Element;
};

const PublicRoute = ({ element }: PublicRouteProps) => {
  const isAuthenticated = Boolean(localStorage.getItem("authenticated"));
  return isAuthenticated ? <Navigate to="/dashboard" /> : element;
};

export default PublicRoute;
