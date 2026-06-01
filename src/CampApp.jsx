import { useEffect, useState } from 'react'
import Participation from './Participation.jsx'

function CampApp() {
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

  const patrolCount = new Set(
    participants.map((participant) => participant.patrol)
  ).size

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

      <section className="stats-grid">
        <article className="stat-card">
          <span>Total participants</span>
          <strong>{participants.length}</strong>
        </article>

        <article className="stat-card">
          <span>Active patrols</span>
          <strong>{patrolCount}</strong>
        </article>
      </section>

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
                    <h3>{participant.name}</h3>
                    <p>
                      Age {participant.age} - {participant.patrol} Patrol
                    </p>
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
    </main>
  )
}

export default CampApp
