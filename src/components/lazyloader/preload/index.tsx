import {
  Dashboard,
  Login,
  MapPage,
  Register,
  UserDetails,
  Users,
} from "components/routes/private-routes";
import { LazyExoticComponent } from "react";

// Define a type for components that can be lazily loaded
type PreloadableComponent = LazyExoticComponent<() => JSX.Element> & {
  preload?: () => Promise<void>;
};

const components: PreloadableComponent[] = [
  Dashboard,
  Login,
  MapPage,
  Register,
  Users,
  UserDetails,
];

export const preloadComponents = async () => {
  await Promise.all(
    components.map((component) =>
      component.preload ? component.preload() : Promise.resolve()
    )
  );
};
