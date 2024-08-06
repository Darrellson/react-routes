import { Navigate } from 'react-router-dom';

type PublicRouteProps = {
  children: JSX.Element;
};

const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuthenticated = Boolean(localStorage.getItem("authenticated"));
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

export default PublicRoute;
