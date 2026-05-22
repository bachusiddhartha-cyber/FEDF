import { Link } from "react-router-dom";

function Signup() {
  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Start your journey</p>
        <h1>Sign Up</h1>
        <p className="auth-intro">
          Create an account to begin using the doctor appointment system.
        </p>

        <form className="auth-form">
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" type="text" placeholder="Enter your full name" />

          <label htmlFor="signupEmail">Email</label>
          <input id="signupEmail" type="email" placeholder="Enter your email" />

          <label htmlFor="signupPassword">Password</label>
          <input
            id="signupPassword"
            type="password"
            placeholder="Create a password"
          />

          <label htmlFor="phone">Phone Number</label>
          <input id="phone" type="tel" placeholder="Enter your phone number" />

          <button type="button" className="btn btn-primary full-width">
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
