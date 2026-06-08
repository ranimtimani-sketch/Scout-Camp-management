import { useEffect, useState } from 'react'
import Participation from './Participation.jsx'
import PaymentsPage from './PaymentsPage.jsx'

function CampApp() {
  const [activePage, setActivePage] = useState('participants')
  const [participants, setParticipants] = useState(() => {
    const savedParticipants = localStorage.getItem('participants')

    if (savedParticipants) {
      return JSON.parse(savedParticipants)
    }

    return []
  })

  useEffect(() => {
    localStorage.setItem('participants', JSON.stringify(participants))
  }, [participants])

  function addParticipant(newParticipant) {
    setParticipants([...participants, newParticipant])
  }

  function deleteParticipant(id) {
    setParticipants(
      participants.filter((participant) => participant.id !== id)
    )
  }

  function togglePaid(id) {
    setParticipants(
      participants.map((participant) =>
        participant.id === id
          ? { ...participant, paid: !participant.paid }
          : participant
      )
    )
  }

  const patrolCount = new Set(
    participants.map((participant) => participant.patrol)
  ).size
  const attentionCount = participants.filter(
    (participant) => participant.needsAttention
  ).length
  const paidCount = participants.filter((participant) => participant.paid).length
  const unpaidCount = participants.length - paidCount

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Camp operations</p>
          <h1>Scout Camp Management System</h1>
          <p className="header-copy">
            Register participants, track patrols, and keep the camp list tidy.
          </p>
        </div>
      </header>

      <nav className="page-tabs" aria-label="Camp sections">
        <button
          type="button"
          className={activePage === 'participants' ? 'active-tab' : ''}
          onClick={() => setActivePage('participants')}
        >
          Participants
        </button>
        <button
          type="button"
          className={activePage === 'payments' ? 'active-tab' : ''}
          onClick={() => setActivePage('payments')}
        >
          Payments
        </button>
      </nav>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Total participants</span>
          <strong>{participants.length}</strong>
        </article>

        <article className="stat-card">
          <span>Active patrols</span>
          <strong>{patrolCount}</strong>
        </article>

        <article className="stat-card attention-stat">
          <span>Attention notes</span>
          <strong>{attentionCount}</strong>
        </article>

        <article className="stat-card paid-stat">
          <span>Paid</span>
          <strong>{paidCount}</strong>
        </article>

        <article className="stat-card unpaid-stat">
          <span>Unpaid</span>
          <strong>{unpaidCount}</strong>
        </article>
      </section>

      {activePage === 'participants' ? (
        <section className="content-grid">
          <Participation addParticipant={addParticipant} />

          <section className="list-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Roster</p>
                <h2>Participants</h2>
              </div>
              <span className="count-pill">{participants.length}</span>
            </div>

            {participants.length === 0 ? (
              <p className="empty-state">No participants registered yet.</p>
            ) : (
              <ul className="participant-list">
                {participants.map((participant) => (
                  <li className="participant-item" key={participant.id}>
                    <div>
                      <div className="participant-name-row">
                        <h3>{participant.name}</h3>
                        {participant.paid && (
                          <span className="paid-badge">Paid</span>
                        )}
                        {participant.needsAttention && (
                          <span className="warning-badge">! Attention</span>
                        )}
                      </div>
                      <p>
                        Age {participant.age} - {participant.patrol} Patrol
                      </p>
                      {participant.needsAttention && (
                        <p className="attention-note">
                          {participant.attentionNotes ||
                            'Check medicine, food, or allergy details.'}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => deleteParticipant(participant.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </section>
      ) : (
        <PaymentsPage participants={participants} togglePaid={togglePaid} />
      )}
    </main>
  )
}

export default CampApp
