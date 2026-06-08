function PaymentsPage({ participants, togglePaid }) {
  const paidCount = participants.filter((participant) => participant.paid).length

  return (
    <section className="payments-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Payment tracking</p>
          <h2>Participant Payments</h2>
        </div>
        <span className="count-pill">
          {paidCount}/{participants.length} paid
        </span>
      </div>

      {participants.length === 0 ? (
        <p className="empty-state">
          Add participants first, then track payments here.
        </p>
      ) : (
        <ul className="payment-list">
          {participants.map((participant) => (
            <li
              className={`payment-item ${
                participant.paid ? 'is-paid' : 'is-unpaid'
              }`}
              key={participant.id}
            >
              <div>
                <div className="participant-name-row">
                  <h3>{participant.name}</h3>
                  <span
                    className={
                      participant.paid ? 'paid-badge' : 'unpaid-badge'
                    }
                  >
                    {participant.paid ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
                <p>
                  Age {participant.age} - {participant.patrol} Patrol
                </p>
              </div>

              <label className="payment-toggle">
                <input
                  type="checkbox"
                  checked={Boolean(participant.paid)}
                  onChange={() => togglePaid(participant.id)}
                />
                <span>Payment received</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default PaymentsPage
