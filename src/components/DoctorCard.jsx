import { Link } from "react-router-dom";

function DoctorCard({ doctor }) {
  return (
    <article className="doctor-card">
      <img src={doctor.image} alt={doctor.name} className="doctor-image" />

      <div className="doctor-card-body">
        <p className="doctor-specialization">{doctor.specialization}</p>
        <h3>{doctor.name}</h3>
        <p>{doctor.hospital}</p>
        <p>{doctor.experience} experience</p>

        <div className="timing-list">
          {doctor.timings.map((time) => (
            <span key={time}>{time}</span>
          ))}
        </div>

        <Link className="btn btn-primary full-width" to={`/book?doctorId=${doctor.id}`}>
          Book Appointment
        </Link>
      </div>
    </article>
  );
}

export default DoctorCard;
