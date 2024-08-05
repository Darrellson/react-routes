import 'bootstrap/dist/css/bootstrap.min.css';

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-1 text-danger">404</h1>
      <h2 className="display-4">Page Not Found</h2>
      <p className="lead">Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
