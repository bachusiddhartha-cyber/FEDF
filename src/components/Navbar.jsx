import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="brand">
        <span className="brand-icon">+</span>
        <span>Doctor Appointment System</span>
      </NavLink>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/doctors">Doctors</NavLink>
        <NavLink to="/appointments">Appointments</NavLink>
        <NavLink to="/hospitals">Hospitals</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
