function AppointmentHistory({ appointments, onCancelAppointment, onRescheduleAppointment }) {
  return (
    <section className="page-shell">
      <div className="section-heading wide-heading">
        <p className="eyebrow">Appointments</p>
        <h1>Appointment History</h1>
        <p>Review booking details, token numbers, and appointment status.</p>
      </div>

      <div className="history-list">
        {appointments.map((appointment) => (
          <article className="history-card" key={appointment.id}>
            <div>
              <p className="status-pill">{appointment.status}</p>
              <h3>{appointment.doctorName}</h3>
              <p>{appointment.hospital}</p>
            </div>

            <div className="history-details">
              <p>
                <strong>Date:</strong> {appointment.date}
              </p>
              <p>
                <strong>Time:</strong> {appointment.time}
              </p>
              <p>
                <strong>Token Number:</strong> {appointment.tokenNumber}
              </p>
            </div>

            <div className="history-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onRescheduleAppointment(appointment.id)}
                disabled={appointment.status === "Cancelled"}
              >
                Reschedule Appointment
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onCancelAppointment(appointment.id)}
                disabled={appointment.status === "Cancelled"}
              >
                Cancel Appointment
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AppointmentHistory;
