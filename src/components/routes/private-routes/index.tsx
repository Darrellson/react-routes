import Layout from "components/layout";
import PublicRoute from "components/routes/public-routes";
import NotFound from "not-found/index";
import Dashboard from "pages/dashboard";
import Login from "pages/login";
import MapPage from "pages/map";
import Register from "pages/registration";
import Users from "pages/users";
import UserDetails from "pages/users/user-details";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

type PrivateRouteProps = {
  element: JSX.Element;
};

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const isAuthenticated = Boolean(localStorage.getItem("authenticated"));
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const Main = () => <Layout />;

const RoutesConfig: RouteObject[] = [
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Navigate to="/login" /> },
      { path: "login", element: <PublicRoute element={<Login />} /> },
      { path: "register", element: <PublicRoute element={<Register />} /> },
      { path: "dashboard", element: <PrivateRoute element={<Dashboard />} /> },
      { path: "map", element: <PrivateRoute element={<MapPage />} /> },
      { path: "users", element: <PrivateRoute element={<Users />} /> },
      {
        path: "user/:userId",
        element: <PrivateRoute element={<UserDetails />} />,
      },
    ],
  },
  { path: "*", element: <NotFound /> },
];

const AppRoutes = () => useRoutes(RoutesConfig);

export { AppRoutes, PrivateRoute };

