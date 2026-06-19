import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found-page">
      <div className="auth-card">
        <p className="eyebrow">404</p>
        <h1>Page Not Found</h1>
        <p className="auth-intro">
          The page you are looking for is not available in this project.
        </p>
        <Link className="btn btn-primary full-width" to="/">
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
