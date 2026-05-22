import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Welcome back</p>
        <h1>Login</h1>
        <p className="auth-intro">
          Access your hospital appointment dashboard with your email and password.
        </p>

        <form className="auth-form">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="Enter your email" />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Enter your password" />

          <label htmlFor="hospital">Select Hospital</label>
          <select id="hospital" defaultValue="">
            <option value="" disabled>
              Choose hospital
            </option>
            <option>City Care Hospital</option>
            <option>Green Valley Clinic</option>
            <option>Sunrise Medical Center</option>
          </select>

          <button type="button" className="btn btn-primary full-width">
            Login
          </button>
        </form>

        <div className="auth-links">
          <Link to="/signup">Create a new account</Link>
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
