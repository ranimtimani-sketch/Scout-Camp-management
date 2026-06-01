import { useState } from 'react'
import Participation from './Participation.jsx'

function CampApp() {
  const [participants, setParticipants] = useState([])

  function addParticipant(newParticipant) {
    setParticipants([...participants, newParticipant])
  }

  function deleteParticipant(id) {
    setParticipants(
      participants.filter((participant) => participant.id !== id)
    )
  }

  return (
    <>
      <h1>Scout Camp Management System</h1>

      <p>Total participants: {participants.length}</p>

      <Participation addParticipant={addParticipant} />

      <ul>
        {participants.map((participant) => (
          <li key={participant.id}>
            {participant.name} - Age {participant.age} - {participant.patrol}

            <button
              type="button"
              onClick={() => deleteParticipant(participant.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default CampApp
