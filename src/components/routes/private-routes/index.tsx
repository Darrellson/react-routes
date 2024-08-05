// AppRoutes.tsx
import Layout from "components/layout";
import lazyLoader from "components/lazyloader";
import PublicRoute from "components/routes/public-routes";
import NotFound from "not-found/index";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

export const Dashboard = lazyLoader(() => import("pages/dashboard"));
export const Login = lazyLoader(() => import("pages/login"));
export const MapPage = lazyLoader(() => import("pages/map"));
export const Register = lazyLoader(() => import("pages/registration"));
export const Users = lazyLoader(() => import("pages/users"));
export const UserDetails = lazyLoader(() => import("pages/users/user-details"));

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
      { path: "login", element: <PublicRoute element={<Login.Component />} /> },
      {
        path: "register",
        element: <PublicRoute element={<Register.Component />} />,
      },
      {
        path: "dashboard",
        element: <PrivateRoute element={<Dashboard.Component />} />,
      },
      {
        path: "map",
        element: <PrivateRoute element={<MapPage.Component />} />,
      },
      {
        path: "users",
        element: <PrivateRoute element={<Users.Component />} />,
      },
      {
        path: "user/:userId",
        element: <PrivateRoute element={<UserDetails.Component />} />,
      },
    ],
  },
  { path: "*", element: <NotFound /> },
];

const AppRoutes = () => {
  return useRoutes(RoutesConfig);
};

export { AppRoutes, PrivateRoute };
