import { useEffect, useMemo, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import BookAppointment from "./pages/BookAppointment";
import AppointmentHistory from "./pages/AppointmentHistory";
import QueuePage from "./pages/QueuePage";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import doctorsData from "./data/doctorsData";

const averageConsultationTime = 5;

const sampleAppointments = [
  {
    id: 1,
    patientName: "Rohan Das",
    doctorName: "Dr. Ananya Mehta",
    hospital: "City Care Hospital",
    date: "2026-05-15",
    time: "09:00 AM",
    tokenNumber: 16,
    status: "Completed"
  },
  {
    id: 2,
    patientName: "Nisha Roy",
    doctorName: "Dr. Priya Nair",
    hospital: "Green Valley Clinic",
    date: "2026-05-20",
    time: "02:00 PM",
    tokenNumber: 19,
    status: "Cancelled"
  }
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "Patient User",
    email: "patient@example.com",
    phone: "+91 98765 43210"
  });
  const [appointments, setAppointments] = useState(sampleAppointments);
  const [queue, setQueue] = useState({
    currentToken: 18,
    averageConsultationTime
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [soonNotificationTokens, setSoonNotificationTokens] = useState([]);
  const firstQueueUpdate = useRef(true);

  const hospitals = useMemo(
    () => [...new Set(doctorsData.map((doctor) => doctor.hospital))],
    []
  );

  const activeAppointment = useMemo(() => {
    return appointments
      .filter(
        (appointment) =>
          appointment.status !== "Cancelled" && appointment.status !== "Completed"
      )
      .sort((first, second) => first.tokenNumber - second.tokenNumber)[0];
  }, [appointments]);

  const queueStats = useMemo(() => {
    if (!activeAppointment) {
      return null;
    }

    const remainingPatients = Math.max(
      activeAppointment.tokenNumber - queue.currentToken,
      0
    );

    return {
      currentToken: queue.currentToken,
      userToken: activeAppointment.tokenNumber,
      remainingPatients,
      averageConsultationTime: queue.averageConsultationTime,
      waitingTime: remainingPatients * queue.averageConsultationTime
    };
  }, [activeAppointment, queue]);

  function addToast(message, type = "success") {
    const toastId = Date.now() + Math.random();

    setToasts((currentToasts) => [
      ...currentToasts,
      { id: toastId, message, type }
    ]);

    setTimeout(() => {
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== toastId)
      );
    }, 3500);
  }

  function sendBrowserNotification(title, body) {
    if (
      notificationsEnabled &&
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      new Notification(title, { body });
    }
  }

  function handleLogin(loginData) {
    setIsLoggedIn(true);
    setUser((currentUser) => ({
      ...currentUser,
      email: loginData.email || currentUser.email
    }));
    addToast("Login successful. Welcome to your dashboard.");
  }

  function handleSignup(signupData) {
    setIsLoggedIn(true);
    setUser({
      name: signupData.name,
      email: signupData.email,
      phone: signupData.phone
    });
    addToast("Sign-up successful. Profile created.");
  }

  function handleLogout() {
    setIsLoggedIn(false);
    addToast("You have been logged out.", "info");
  }

  function handleBookAppointment(appointmentData) {
    const highestToken = Math.max(
      23,
      queue.currentToken,
      ...appointments.map((appointment) => appointment.tokenNumber)
    );

    const newAppointment = {
      id: Date.now(),
      ...appointmentData,
      tokenNumber: highestToken + 1,
      status: "Confirmed"
    };

    setAppointments((currentAppointments) => [
      newAppointment,
      ...currentAppointments
    ]);
    addToast(`Booking successful. Token No: ${newAppointment.tokenNumber}`);
    sendBrowserNotification(
      "Appointment confirmed",
      `Your token number is ${newAppointment.tokenNumber}.`
    );

    return newAppointment;
  }

  function handleCancelAppointment(appointmentId) {
    setAppointments((currentAppointments) =>
      currentAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: "Cancelled" }
          : appointment
      )
    );
    addToast("Appointment cancelled.", "error");
  }

  function handleRescheduleAppointment(appointmentId) {
    setAppointments((currentAppointments) =>
      currentAppointments.map((appointment) => {
        if (appointment.id !== appointmentId) {
          return appointment;
        }

        const currentDate = new Date(appointment.date);
        currentDate.setDate(currentDate.getDate() + 1);

        return {
          ...appointment,
          date: currentDate.toISOString().slice(0, 10),
          status: "Rescheduled"
        };
      })
    );
    addToast("Appointment rescheduled to the next day.", "info");
  }

  function handleUpdateQueue() {
    setQueue((currentQueue) => ({
      ...currentQueue,
      currentToken: currentQueue.currentToken + 1
    }));
  }

  async function handleEnableNotifications() {
    if (!("Notification" in window)) {
      addToast("Notifications are not supported in this browser.", "error");
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      setNotificationsEnabled(true);
      addToast("Notifications enabled.", "success");
      new Notification("Notifications enabled", {
        body: "You will receive appointment and smart queue updates."
      });
    } else {
      addToast("Notification permission was not granted.", "error");
    }
  }

  function handleUpdateProfile(profileData) {
    setUser(profileData);
    addToast("Profile updated successfully.");
  }

  // Simulates live queue movement while the user has an active token.
  useEffect(() => {
    if (!activeAppointment) {
      return undefined;
    }

    const queueTimer = setInterval(() => {
      setQueue((currentQueue) => {
        if (currentQueue.currentToken >= activeAppointment.tokenNumber) {
          return currentQueue;
        }

        return {
          ...currentQueue,
          currentToken: currentQueue.currentToken + 1
        };
      });
    }, 30000);

    return () => clearInterval(queueTimer);
  }, [activeAppointment]);

  // Shows a toast and browser notification whenever the queue advances.
  useEffect(() => {
    if (firstQueueUpdate.current) {
      firstQueueUpdate.current = false;
      return;
    }

    addToast(`Queue updated. Now serving token ${queue.currentToken}.`, "info");
    sendBrowserNotification(
      "Queue updated",
      `Now serving token ${queue.currentToken}.`
    );
  }, [queue.currentToken]);

  // Sends a special reminder when the appointment is expected soon.
  useEffect(() => {
    if (
      queueStats &&
      queueStats.waitingTime <= 10 &&
      queueStats.remainingPatients > 0 &&
      !soonNotificationTokens.includes(queueStats.userToken)
    ) {
      setSoonNotificationTokens((tokens) => [...tokens, queueStats.userToken]);
      addToast(
        "Your appointment is expected in approximately 10 minutes.",
        "info"
      );
      sendBrowserNotification(
        "Appointment reminder",
        "Your appointment is expected in approximately 10 minutes."
      );
    }
  }, [queueStats, soonNotificationTokens]);

  return (
    <div className="app">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                doctors={doctorsData}
                appointments={appointments}
                queueStats={queueStats}
              />
            }
          />
          <Route path="/doctors" element={<Doctors doctors={doctorsData} />} />
          <Route
            path="/book"
            element={
              <BookAppointment
                doctors={doctorsData}
                hospitals={hospitals}
                onBookAppointment={handleBookAppointment}
              />
            }
          />
          <Route
            path="/appointments"
            element={
              <AppointmentHistory
                appointments={appointments}
                onCancelAppointment={handleCancelAppointment}
                onRescheduleAppointment={handleRescheduleAppointment}
              />
            }
          />
          <Route
            path="/queue"
            element={
              <QueuePage
                queueStats={queueStats}
                onUpdateQueue={handleUpdateQueue}
                notificationsEnabled={notificationsEnabled}
                onEnableNotifications={handleEnableNotifications}
              />
            }
          />
          <Route
            path="/profile"
            element={<Profile user={user} onUpdateProfile={handleUpdateProfile} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      <div className="toast-stack" aria-live="polite">
        {toasts.map((toast) => (
          <div className={`toast toast-${toast.type}`} key={toast.id}>
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
