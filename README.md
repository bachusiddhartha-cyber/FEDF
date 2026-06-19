# DoctorAppointmentSystem_V1

A modern Doctor Appointment Booking System with Smart Queue Management and browser notifications.

## Tech Stack

- React.js
- React Router DOM
- CSS
- Functional Components
- useState and useEffect

## Package Installation Commands

```bash
npm install
npm install react-router-dom
```

## Run Command

```bash
npm start
```

If PowerShell blocks npm scripts, run:

```bash
npm.cmd start
```

The app opens at:

```text
http://localhost:3000
```

## Folder Structure

```text
DoctorAppointmentSystem_V1/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── DoctorCard.jsx
│   │   ├── QueueStatus.jsx
│   │   └── NotificationButton.jsx
│   ├── data/
│   │   └── doctorsData.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Doctors.jsx
│   │   ├── BookAppointment.jsx
│   │   ├── AppointmentHistory.jsx
│   │   ├── QueuePage.jsx
│   │   ├── Profile.jsx
│   │   └── NotFound.jsx
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## Implemented Routes

- `/` opens Home.
- `/login` opens Login.
- `/signup` opens Sign-Up.
- `/dashboard` opens Dashboard.
- `/doctors` opens Doctors.
- `/book` opens Appointment Booking.
- `/appointments` opens Appointment History.
- `/queue` opens Smart Queue Status.
- `/profile` opens Patient Profile.
- Any unknown route opens the 404 Page Not Found screen.

## Main Features

- Search doctors by name, hospital, or specialization.
- Book appointments with automatic token generation.
- Track current token, user token, remaining patients, and waiting time.
- Queue waiting time formula: remaining patients multiplied by average consultation time.
- Enable browser notifications for appointment and queue alerts.
- Cancel and reschedule appointments.
- Edit patient profile.
- Responsive healthcare UI for mobile, tablet, and desktop.
