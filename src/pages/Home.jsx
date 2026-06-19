import { Link } from "react-router-dom";

function Home() {
  const features = [
    {
      title: "Find Trusted Doctors",
      text: "Browse care options and choose the right specialist for your needs."
    },
    {
      title: "Simple Booking Flow",
      text: "A clean interface helps patients move from search to booking quickly."
    },
    {
      title: "Hospital Friendly",
      text: "Designed for clinics and hospitals that need organized patient access."
    },
    {
      title: "Smart Queue Updates",
      text: "Track token progress and estimated waiting time with live queue details."
    }
  ];

  return (
    <section className="home-page">
      <div className="hero">
        <div className="hero-content">
          <p className="eyebrow">Modern healthcare access</p>
          <h1>Doctor Appointment System</h1>
          <p className="hero-text">
            Book appointments, connect with hospitals, and manage patient visits
            through a clean and responsive medical web interface.
          </p>

          <div className="hero-actions">
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
            <Link className="btn btn-secondary" to="/signup">
              Sign Up
            </Link>
            <Link className="btn btn-secondary" to="/dashboard">
              Dashboard
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="doctor-avatar">Dr</div>
          <h2>Care made easier</h2>
          <p>Quick access to doctors, hospitals, and appointment tools.</p>
          <div className="stats-row">
            <div>
              <strong>24/7</strong>
              <span>Access</span>
            </div>
            <div>
              <strong>100+</strong>
              <span>Doctors</span>
            </div>
          </div>
        </div>
      </div>

      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-icon">+</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default Home;
