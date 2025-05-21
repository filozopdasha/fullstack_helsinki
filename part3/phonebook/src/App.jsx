import { useEffect, useState } from 'react'
import people from './services/persons'
import Notification from './Notification.jsx'
import { Filter, PersonForm, Persons } from './Components.jsx'



const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        people.getAll().then((initialPersons) => {
            setPersons(initialPersons)
        })
    }, [])

    const showNotification = (text, type = 'success') => {
        setNotification({ text, type })
        setTimeout(() => setNotification(null), 5000)
    }

    const nameChanger = (event) => setNewName(event.target.value)
    const numChanger = (event) => setNewNumber(event.target.value)
    const filterChanger = (event) => setFilter(event.target.value)

    const submitment = (event) => {
        event.preventDefault()
        const existingPerson = persons.find((p) => p.name === newName)

        if (existingPerson) {
            const confirmUpdate = window.confirm(
                `${newName} is already added to phonebook, replace the old number with a new one?`
            )
            if (confirmUpdate) {
                const updatedPerson = { ...existingPerson, number: newNumber }
                people.update(existingPerson.id, updatedPerson).then((returnedPerson) => {
                    const updatedPersons = persons.map((p) => {
                        if (p.id !== existingPerson.id) {
                            return p
                        } else {
                            return returnedPerson
                        }
                    })
                    setPersons(updatedPersons)
                    setNewName('')
                    setNewNumber('')
                    showNotification(`Updated ${returnedPerson.name}'s number`)
                })
            }
            return
        }

        const newPerson = { name: newName, number: newNumber }
        people.create(newPerson).then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            showNotification(`Added ${returnedPerson.name}`)
        })
    }

    const handleDelete = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            people.deleteUser(id).then(() => {
                setPersons(persons.filter((person) => person.id !== id))
                showNotification(`Deleted ${name}`)
            })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification} />
            <Filter filter={filter} handleFilterChange={filterChanger} />
            <h3>Add a new</h3>
            <PersonForm
                onSubmit={submitment}
                newName={newName}
                newNumber={newNumber}
                handleNameChange={nameChanger}
                handleNumberChange={numChanger}
            />
            <h3>Numbers</h3>
            <Persons persons={persons} filter={filter} onDelete={handleDelete} />
        </div>
    )
}

export default App