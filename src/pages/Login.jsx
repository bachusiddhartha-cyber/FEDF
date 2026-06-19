import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    hospital: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setLoginData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(loginData);
    navigate("/dashboard");
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Welcome back</p>
        <h1>Login</h1>
        <p className="auth-intro">
          Access your hospital appointment dashboard with your email and password.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={loginData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="hospital">Select Hospital</label>
          <select
            id="hospital"
            name="hospital"
            value={loginData.hospital}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Choose hospital
            </option>
            <option>City Care Hospital</option>
            <option>Green Valley Clinic</option>
            <option>Sunrise Medical Center</option>
          </select>

          <button type="submit" className="btn btn-primary full-width">
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
