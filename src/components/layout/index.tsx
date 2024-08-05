import NavMenu from 'components/nav-menu/index';
import { useTheme } from 'components/theme/index';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import 'styles/drak-mode/index.css';

const Layout = () => {
  const { theme } = useTheme();
  const isAuthenticated = Boolean(localStorage.getItem("authenticated"));

  return (
    <div className="app-container">
      {isAuthenticated && <NavMenu />}
      <Container
        fluid
        className={`content mt-4 ${theme === "dark" ? "dark-mode" : ""}`}
      >
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
