import NotificationButton from "../components/NotificationButton";
import QueueStatus from "../components/QueueStatus";

function QueuePage({
  queueStats,
  onUpdateQueue,
  notificationsEnabled,
  onEnableNotifications
}) {
  return (
    <section className="page-shell">
      <div className="section-heading wide-heading">
        <p className="eyebrow">Smart Queue Management</p>
        <h1>Track your live hospital queue</h1>
        <p>
          Queue tokens update automatically, and the system estimates waiting
          time using average consultation time.
        </p>
      </div>

      <div className="dashboard-grid">
        <QueueStatus queueStats={queueStats} onUpdateQueue={onUpdateQueue} />
        <NotificationButton
          notificationsEnabled={notificationsEnabled}
          onEnableNotifications={onEnableNotifications}
        />
      </div>
    </section>
  );
}

export default QueuePage;
