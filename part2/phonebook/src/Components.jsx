const Filter = ({ filter, handleFilterChange }) => (
    <div>
        filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
)

const PersonForm = ({
                        onSubmit,
                        newName,
                        newNumber,
                        handleNameChange,
                        handleNumberChange
                    }) => (
    <form onSubmit={onSubmit}>
        <div>
            name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
            number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

const Persons = ({ persons, filter, onDelete }) => (
    <ul>
        {persons
            .filter((person) =>
                person.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map((person) => (
                <li key={person.id}>
                    {person.name} {person.number}{' '}
                    <button onClick={() => onDelete(person.id, person.name)}>delete</button>
                </li>
            ))}
    </ul>
)

export { Filter, PersonForm, Persons }