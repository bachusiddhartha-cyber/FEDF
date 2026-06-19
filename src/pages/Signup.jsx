import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup({ onSignup }) {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setSignupData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSignup(signupData);
    navigate("/dashboard");
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Start your journey</p>
        <h1>Sign Up</h1>
        <p className="auth-intro">
          Create an account to begin using the doctor appointment system.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={signupData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="signupEmail">Email</label>
          <input
            id="signupEmail"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={signupData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="signupPassword">Password</label>
          <input
            id="signupPassword"
            name="password"
            type="password"
            placeholder="Create a password"
            value={signupData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={signupData.phone}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn-primary full-width">
            Sign Up
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login">Already have an account?</Link>
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}

export default Signup;
