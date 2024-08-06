import Layout from "components/layout";
import PublicRoute from "components/routes/public-routes";
import NotFound from "not-found/index";
import { lazy, Suspense } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

// Lazy-loaded pages
const Dashboard = lazy(() => import("pages/dashboard"));
const Login = lazy(() => import("pages/login"));
const MapPage = lazy(() => import("pages/map"));
const Register = lazy(() => import("pages/registration"));
const Users = lazy(() => import("pages/users"));
const UserDetails = lazy(() => import("pages/users/user-details"));

// Private Route component
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = Boolean(localStorage.getItem("authenticated"));
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Layout component
const Main = () => <Layout />;

// Route configuration
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

// Main App Routes component with Suspense
const AppRoutes = () => {
  const routes = useRoutes(RoutesConfig);

  return <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>;
};

export {
  AppRoutes,
  PrivateRoute,
  Dashboard,
  Login,
  MapPage,
  Register,
  UserDetails,
  Users,
};
