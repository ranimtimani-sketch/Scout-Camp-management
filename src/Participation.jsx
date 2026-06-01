import { useState } from 'react'

function Participation({ addParticipant }) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [patrol, setPatrol] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (name.trim() === '' || age.trim() === '' || patrol.trim() === '') {
      return
    }

    const newParticipant = {
      id: Date.now(),
      name: name,
      age: age,
      patrol: patrol,
    }

    addParticipant(newParticipant)

    setName('')
    setAge('')
    setPatrol('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Participant name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(event) => setAge(event.target.value)}
      />

      <input
        type="text"
        placeholder="Patrol"
        value={patrol}
        onChange={(event) => setPatrol(event.target.value)}
      />

      <button type="submit">Add participant</button>
    </form>
  )
}

export default Participation
