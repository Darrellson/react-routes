import Layout from "components/layout";
import PublicRoute from "components/routes/public-routes";
import NotFound from "not-found/index";
import { lazy, Suspense } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

export const Dashboard = lazy(() => import("pages/dashboard"));
export const Login = lazy(() => import("pages/login"));
export const MapPage = lazy(() => import("pages/map"));
export const Register = lazy(() => import("pages/registration"));
export const Users = lazy(() => import("pages/users"));
export const UserDetails = lazy(() => import("pages/users/user-details"));

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = Boolean(localStorage.getItem("authenticated"));
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const Main = () => <Layout />;

const RoutesConfig: RouteObject[] = [
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Navigate to="/login" /> },
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "map",
        element: (
          <PrivateRoute>
            <MapPage />
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
      },
      {
        path: "user/:userId",
        element: (
          <PrivateRoute>
            <UserDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "*", element: <NotFound /> },
];

const AppRoutes = () => {
  const routes = useRoutes(RoutesConfig);

  return <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>;
};

export { AppRoutes, PrivateRoute };
