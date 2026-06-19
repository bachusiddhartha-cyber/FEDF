import { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";

function Doctors({ doctors }) {
  const [searchText, setSearchText] = useState("");
  const [specialization, setSpecialization] = useState("All");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  const specializations = [
    "All",
    ...new Set(doctors.map((doctor) => doctor.specialization))
  ];

  // Keeps the doctor cards updated when filters change.
  useEffect(() => {
    const searchValue = searchText.toLowerCase();

    const nextDoctors = doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchValue) ||
        doctor.hospital.toLowerCase().includes(searchValue);
      const matchesSpecialization =
        specialization === "All" || doctor.specialization === specialization;

      return matchesSearch && matchesSpecialization;
    });

    setFilteredDoctors(nextDoctors);
  }, [searchText, specialization, doctors]);

  return (
    <section className="page-shell">
      <div className="section-heading wide-heading">
        <p className="eyebrow">Doctors</p>
        <h1>Choose your specialist</h1>
        <p>
          Browse available doctors and book a visit with responsive doctor cards.
        </p>
      </div>

      <div className="filter-bar">
        <input
          className="search-input"
          type="search"
          placeholder="Search doctor or hospital"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />

        <select
          value={specialization}
          onChange={(event) => setSpecialization(event.target.value)}
        >
          {specializations.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="doctor-grid">
        {filteredDoctors.map((doctor) => (
          <DoctorCard doctor={doctor} key={doctor.id} />
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <p className="empty-state">No doctors matched your search.</p>
      )}
    </section>
  );
}

export default Doctors;
