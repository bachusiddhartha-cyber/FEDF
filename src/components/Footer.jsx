function Footer() {
  return (
    <footer className="footer">
      <div>
        <h3>Doctor Appointment System</h3>
        <p>Smart hospital booking, queue tracking, and patient support.</p>
      </div>

      <div>
        <h4>Contact</h4>
        <p>Email: support@doctorcare.com</p>
        <p>Phone: +91 98765 43210</p>
      </div>

      <div>
        <h4>Hospital Support</h4>
        <p>Emergency desk and queue assistance available every day.</p>
        <div className="social-icons" aria-label="Social links">
          <span>f</span>
          <span>x</span>
          <span>in</span>
        </div>
      </div>

      <p className="copyright">
        Copyright 2026 Doctor Appointment System. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
