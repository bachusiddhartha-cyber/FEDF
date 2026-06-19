import { NavLink } from "react-router-dom";

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar">
      <NavLink to="/" className="brand">
        <span className="brand-icon">+</span>
        <span>Doctor Appointment System</span>
      </NavLink>

      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/doctors">Doctors</NavLink>
        <NavLink to="/appointments">Appointments</NavLink>
        <NavLink to="/queue">Queue Status</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <button type="button" className="nav-button" onClick={onLogout}>
          {isLoggedIn ? "Logout" : "Logout"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
