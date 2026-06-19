import { useEffect, useState } from "react";

function Profile({ user, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(user);

  // Keeps the edit form in sync with the latest patient profile.
  useEffect(() => {
    setProfileData(user);
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;

    setProfileData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateProfile(profileData);
    setIsEditing(false);
  }

  return (
    <section className="auth-page">
      <div className="auth-card profile-card">
        <p className="eyebrow">Patient Profile</p>
        <h1>{user.name}</h1>

        {!isEditing ? (
          <>
            <div className="profile-info">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary full-width"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Patient Name</label>
            <input
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleChange}
            />

            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
            />

            <button type="submit" className="btn btn-primary full-width">
              Save Profile
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default Profile;
