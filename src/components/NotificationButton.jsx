function NotificationButton({ notificationsEnabled, onEnableNotifications }) {
  const isSupported =
    typeof window !== "undefined" && "Notification" in window;

  return (
    <div className="notification-panel">
      <div>
        <p className="eyebrow">Notifications</p>
        <h3>Smart Alerts</h3>
        <p>
          Get appointment confirmation, queue updates, and a reminder when your
          turn is expected soon.
        </p>
      </div>

      <button
        type="button"
        className="btn btn-primary"
        onClick={onEnableNotifications}
        disabled={!isSupported || notificationsEnabled}
      >
        {notificationsEnabled ? "Notifications Enabled" : "Enable Notifications"}
      </button>

      {!isSupported && (
        <p className="form-help">Browser notifications are not supported here.</p>
      )}
    </div>
  );
}

export default NotificationButton;
