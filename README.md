# DoctorAppointmentSystem_V1

Doctor Appointment Booking System built with React.js, functional components, React Router DOM, and CSS.

## Package Installation Commands

```bash
npm install
npm install react-router-dom
```

## Run Command

```bash
npm start
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
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── components/
│   │   └── Navbar.jsx
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## Implemented Routes

- `/` opens the Home page.
- `/login` opens the Login page.
- `/signup` opens the Sign-Up page.
- `/doctors`, `/appointments`, `/hospitals`, and `/contact` redirect back to Home.
