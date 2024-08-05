import { Container } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container fluid className="text-center mt-5">
      <h1 className="display-1 text-danger">404</h1>
      <h2 className="text-danger">Page Not Found</h2>
      <p>The page you're looking for does not exist.</p>
    </Container>
  );
};

export default NotFound;
