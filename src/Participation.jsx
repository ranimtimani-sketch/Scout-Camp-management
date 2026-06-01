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
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Registration</p>
          <h2>Add participant</h2>
        </div>
      </div>

      <label>
        <span>Participant name</span>
        <input
          type="text"
          placeholder="Example: Ranim Timani"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>

      <label>
        <span>Age</span>
        <input
          type="number"
          min="1"
          placeholder="Example: 14"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />
      </label>

      <label>
        <span>Patrol</span>
        <input
          type="text"
          placeholder="Example: Eagles"
          value={patrol}
          onChange={(event) => setPatrol(event.target.value)}
        />
      </label>

      <button type="submit">Add participant</button>
    </form>
  )
}

export default Participation
