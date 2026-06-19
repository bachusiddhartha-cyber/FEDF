import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import QueueStatus from "../components/QueueStatus";

function Dashboard({ doctors, appointments, queueStats }) {
  const [searchText, setSearchText] = useState("");
  const [matchedDoctors, setMatchedDoctors] = useState(doctors);

  const upcomingAppointment = appointments.find(
    (appointment) =>
      appointment.status !== "Cancelled" && appointment.status !== "Completed"
  );

  // Filters doctors when the search value changes.
  useEffect(() => {
    const searchValue = searchText.toLowerCase();
    const filteredDoctors = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchValue) ||
        doctor.specialization.toLowerCase().includes(searchValue) ||
        doctor.hospital.toLowerCase().includes(searchValue)
    );

    setMatchedDoctors(filteredDoctors);
  }, [searchText, doctors]);

  return (
    <section className="page-shell">
      <div className="dashboard-hero">
        <div>
          <p className="eyebrow">Patient Dashboard</p>
          <h1>Welcome to your smart healthcare desk</h1>
          <p>
            Search doctors, check your queue position, and manage upcoming
            appointments from one modern dashboard.
          </p>
        </div>

        <Link className="btn btn-primary" to="/book">
          Book Appointment
        </Link>
      </div>

      <div className="quick-card-grid">
        <Link className="quick-card" to="/doctors">
          <span>01</span>
          <h3>Find Doctors</h3>
          <p>View specialists and available timings.</p>
        </Link>
        <Link className="quick-card" to="/book">
          <span>02</span>
          <h3>Book Visit</h3>
          <p>Choose hospital, date, and time slot.</p>
        </Link>
        <Link className="quick-card" to="/queue">
          <span>03</span>
          <h3>Queue Status</h3>
          <p>Track token and waiting time live.</p>
        </Link>
        <Link className="quick-card" to="/appointments">
          <span>04</span>
          <h3>History</h3>
          <p>Cancel or reschedule appointments.</p>
        </Link>
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="section-heading">
            <p className="eyebrow">Search Doctors</p>
            <h2>Find care faster</h2>
          </div>
          <input
            className="search-input"
            type="search"
            placeholder="Search by doctor, specialization, or hospital"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />

          <div className="mini-list">
            {matchedDoctors.slice(0, 3).map((doctor) => (
              <Link to={`/book?doctorId=${doctor.id}`} key={doctor.id}>
                <strong>{doctor.name}</strong>
                <span>
                  {doctor.specialization} - {doctor.hospital}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="section-heading">
            <p className="eyebrow">Upcoming Appointment</p>
            <h2>Appointment Summary</h2>
          </div>

          {upcomingAppointment ? (
            <div className="summary-list">
              <p>
                <strong>Doctor:</strong> {upcomingAppointment.doctorName}
              </p>
              <p>
                <strong>Hospital:</strong> {upcomingAppointment.hospital}
              </p>
              <p>
                <strong>Date:</strong> {upcomingAppointment.date}
              </p>
              <p>
                <strong>Time:</strong> {upcomingAppointment.time}
              </p>
              <p>
                <strong>Token No:</strong> {upcomingAppointment.tokenNumber}
              </p>
            </div>
          ) : (
            <p className="muted-text">No upcoming appointment found.</p>
          )}
        </div>
      </div>

      <QueueStatus queueStats={queueStats} compact />
    </section>
  );
}

export default Dashboard;
