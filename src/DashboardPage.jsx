function DashboardPage({ participants }) {
  const paidCount = participants.filter((participant) => participant.paid).length
  const unpaidCount = participants.length - paidCount
  const attentionParticipants = participants.filter(
    (participant) => participant.needsAttention
  )
  const paymentPercent =
    participants.length === 0
      ? 0
      : Math.round((paidCount / participants.length) * 100)

  const patrolSummary = [
    ...new Set(participants.map((participant) => participant.patrol)),
  ].map((patrol) => {
    const patrolMembers = participants.filter(
      (participant) => participant.patrol === patrol
    )

    return {
      patrol,
      total: patrolMembers.length,
      paid: patrolMembers.filter((participant) => participant.paid).length,
      attention: patrolMembers.filter((participant) => participant.needsAttention)
        .length,
    }
  })

  return (
    <section className="dashboard-page">
      <section className="dashboard-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Overview</p>
            <h2>Camp Dashboard</h2>
          </div>
          <span className="count-pill">{paymentPercent}% paid</span>
        </div>

        <div className="dashboard-grid">
          <article className="dashboard-metric">
            <span>Total roster</span>
            <strong>{participants.length}</strong>
          </article>

          <article className="dashboard-metric">
            <span>Paid</span>
            <strong>{paidCount}</strong>
          </article>

          <article className="dashboard-metric">
            <span>Unpaid</span>
            <strong>{unpaidCount}</strong>
          </article>

          <article className="dashboard-metric warning-metric">
            <span>Needs attention</span>
            <strong>{attentionParticipants.length}</strong>
          </article>
        </div>
      </section>

      <section className="dashboard-two-column">
        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Patrols</p>
              <h2>Patrol Summary</h2>
            </div>
          </div>

          {patrolSummary.length === 0 ? (
            <p className="empty-state">No patrols yet.</p>
          ) : (
            <ul className="summary-list">
              {patrolSummary.map((summary) => (
                <li className="summary-item" key={summary.patrol}>
                  <div>
                    <h3>{summary.patrol}</h3>
                    <p>
                      {summary.total} participants - {summary.paid} paid -{' '}
                      {summary.attention} attention
                    </p>
                  </div>
                  <span className="count-pill">{summary.total}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Safety</p>
              <h2>Attention List</h2>
            </div>
          </div>

          {attentionParticipants.length === 0 ? (
            <p className="empty-state">No attention notes yet.</p>
          ) : (
            <ul className="summary-list">
              {attentionParticipants.map((participant) => (
                <li className="summary-item attention-summary" key={participant.id}>
                  <div>
                    <h3>{participant.name}</h3>
                    <p>
                      {participant.attentionNotes ||
                        'Check medicine, food, or allergy details.'}
                    </p>
                  </div>
                  <span className="warning-badge">!</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </section>
  )
}

export default DashboardPage
