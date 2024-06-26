import { useEffect, useState } from 'react'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsService from './services/person'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    PersonsService
      .getAll()
      .then(initials => {
        setPersons(initials)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }


  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ... person, number: newNumber }
        PersonsService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(
              `Changed number of ${person.name}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(() => {
            setErrorMessage(
              `${person.name} has been removed`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== person.id))
          })
      }
      return
    }
    const PersonObject = {
      name: newName,
      number: newNumber,
    }

    PersonsService
      .create(PersonObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setErrorMessage(null)
        setMessage(
          `Added ${response.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessage(null)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      })
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorMessage={errorMessage}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
        addPerson={addPerson} 
      />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} filter={filter} />
    </div>
    
  )
}

export default App