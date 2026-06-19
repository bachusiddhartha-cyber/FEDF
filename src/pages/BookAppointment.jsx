import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

function BookAppointment({ doctors, hospitals, onBookAppointment }) {
  const [searchParams] = useSearchParams();
  const selectedDoctorId = searchParams.get("doctorId");

  const [formData, setFormData] = useState({
    patientName: "",
    doctorId: selectedDoctorId || "",
    hospital: "",
    date: "",
    time: ""
  });
  const [bookedToken, setBookedToken] = useState(null);

  const selectedDoctor = doctors.find(
    (doctor) => String(doctor.id) === String(formData.doctorId)
  );

  // Automatically fills hospital and first time slot after doctor selection.
  useEffect(() => {
    if (selectedDoctor) {
      setFormData((currentData) => ({
        ...currentData,
        hospital: selectedDoctor.hospital,
        time: currentData.time || selectedDoctor.timings[0]
      }));
    }
  }, [selectedDoctor]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.patientName ||
      !formData.doctorId ||
      !formData.hospital ||
      !formData.date ||
      !formData.time ||
      !selectedDoctor
    ) {
      return;
    }

    const newAppointment = onBookAppointment({
      ...formData,
      doctorName: selectedDoctor.name
    });

    setBookedToken(newAppointment.tokenNumber);
  }

  return (
    <section className="auth-page">
      <div className="auth-card wide-card">
        <p className="eyebrow">Appointment Booking</p>
        <h1>Book Appointment</h1>
        <p className="auth-intro">
          Fill patient details and receive an automatic token number after booking.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="patientName">Patient Name</label>
          <input
            id="patientName"
            name="patientName"
            type="text"
            placeholder="Enter patient name"
            value={formData.patientName}
            onChange={handleChange}
            required
          />

          <label htmlFor="doctorId">Doctor Selection</label>
          <select
            id="doctorId"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
          >
            <option value="">Choose doctor</option>
            {doctors.map((doctor) => (
              <option value={doctor.id} key={doctor.id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>

          <label htmlFor="hospital">Hospital Selection</label>
          <select
            id="hospital"
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            required
          >
            <option value="">Choose hospital</option>
            {hospitals.map((hospital) => (
              <option value={hospital} key={hospital}>
                {hospital}
              </option>
            ))}
          </select>

          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label htmlFor="time">Time Slot</label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option value="">Choose time</option>
            {(selectedDoctor
              ? selectedDoctor.timings
              : ["09:00 AM", "11:00 AM", "04:00 PM"]
            ).map((time) => (
              <option value={time} key={time}>
                {time}
              </option>
            ))}
          </select>

          <button type="submit" className="btn btn-primary full-width">
            Submit Booking
          </button>
        </form>

        {bookedToken && (
          <div className="success-token">
            <p>Booking Successful</p>
            <h2>Token No: {bookedToken}</h2>
            <div className="hero-actions">
              <Link className="btn btn-secondary" to="/queue">
                Track Queue
              </Link>
              <Link className="btn btn-secondary" to="/appointments">
                View History
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default BookAppointment;
