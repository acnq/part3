import PersonsService from '../services/person'

const Person = ({ person, setPersons }) => {
  return (
    <p key={person.id}>{person.name} {person.number}
      <button onClick={() => {
        if (window.confirm(`Delete ${person.name}?`)) {
          PersonsService.deletePerson(person.id)
          setPersons(persons.filter(p => p.id !== person.id))
          console.log(`setPersons ${persons}`)
        }
      }}>delete</button>
    </p>
  )
}

export default Person
