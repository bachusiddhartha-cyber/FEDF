function QueueStatus({ queueStats, onUpdateQueue, compact = false }) {
  if (!queueStats || !queueStats.userToken) {
    return (
      <div className="queue-card">
        <p className="eyebrow">Live Queue</p>
        <h2>No active token</h2>
        <p className="muted-text">
          Book an appointment to receive a token number and track your waiting time.
        </p>
      </div>
    );
  }

  const progress = Math.min(
    100,
    Math.round((queueStats.currentToken / queueStats.userToken) * 100)
  );

  return (
    <div className="queue-card">
      <div className="section-heading inline-heading">
        <div>
          <p className="eyebrow">Live Queue Status</p>
          <h2>Now Serving: {queueStats.currentToken}</h2>
        </div>

        {onUpdateQueue && (
          <button type="button" className="btn btn-secondary" onClick={onUpdateQueue}>
            Update Queue
          </button>
        )}
      </div>

      <div className="queue-metrics">
        <div>
          <span>Your Token</span>
          <strong>{queueStats.userToken}</strong>
        </div>
        <div>
          <span>Remaining Patients</span>
          <strong>{queueStats.remainingPatients}</strong>
        </div>
        <div>
          <span>Estimated Waiting Time</span>
          <strong>{queueStats.waitingTime} mins</strong>
        </div>
      </div>

      <div className="progress-area">
        <div className="progress-label">
          <span>Queue Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="progress-bar">
          <div style={{ width: `${progress}%` }} />
        </div>
      </div>

      {!compact && (
        <p className="queue-note">
          Waiting time is calculated as remaining patients multiplied by the
          average consultation time of {queueStats.averageConsultationTime} minutes.
        </p>
      )}
    </div>
  );
}

export default QueueStatus;
