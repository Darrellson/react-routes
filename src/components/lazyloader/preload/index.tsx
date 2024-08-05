import { Dashboard, Login, MapPage, Register, Users, UserDetails } from 'components/routes/private-routes';

export const preloadComponents = async () => {
  await Promise.all([
    Dashboard.preload(),
    Login.preload(),
    MapPage.preload(),
    Register.preload(),
    Users.preload(),
    UserDetails.preload(),
  ]);
};
