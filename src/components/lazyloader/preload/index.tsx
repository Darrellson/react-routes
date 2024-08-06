import {
  Dashboard,
  Login,
  MapPage,
  Register,
  Users,
  UserDetails,
} from "components/routes/private-routes";

export const preloadComponents = async () => {
  await Promise.all([
    (Dashboard as any).preload(),
    (Login as any).preload(),
    (MapPage as any).preload(),
    (Register as any).preload(),
    (Users as any).preload(),
    (UserDetails as any).preload(),
  ]);
};
