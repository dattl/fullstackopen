import { useState, useEffect } from 'react'
import phonebook from './services/phonebook';

const { getPersons, addPerson, deleteEntry, updatePerson } = phonebook

const Notification = ({ message }) => {
  const notifStyle = {
    color: 'green',
    fontSize: 18,
    borderStyle: 'solid',
    borderRadius: 2,
    backgroundColor: 'lightgrey',
    padding: 10
  };

  if (message.type === "error") {
    notifStyle.color = 'red';
  }

  if (message.content === '') return null;

  return <div style={notifStyle}>
    {message.content}
  </div>
}


const Contact = ({ person, deleteEntry }) => {
  const { name, number } = person;
  return <li>
    {name} {number} <button onClick={deleteEntry}>delete</button>
  </li>
}

const Filter = ({ filter, setFilter }) => {
  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  return (<div>
    filter shown with <input
      value={filter}
      onChange={handleFilter} />
  </div>)
}

const PersonForm = (props) => {
  const { newName, setNewName, newNumber, setNewNumber, persons, setPersons, setNotification } = props;

  const handleNewName = (event) => {
    setNewName(event.target.value);
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const addPersonEvent = (event) => {
    event.preventDefault();

    let update = false;
    const checkPerson = persons.find((person) => person.name === newName);
    if (checkPerson) {
      update = window.confirm(`${newName} is already added to phonebook, replace old number with new one`);
    }

    let newPerson = { name: newName, number: newNumber };

    const notify = (msg, type = 'msg') => {
      setNotification({ content: msg, type: type });
      setTimeout(() => {
        setNotification({ content: '', type: 'msg' });
      }, 5000);
    }

    if (checkPerson && update) {

      updatePerson(newPerson, checkPerson.id)
        .then((updated) => {
          notify(`Updated ${updated.name}`);
          setPersons(persons.map((person) => person.id === checkPerson.id ? updated : person));
        })
        .catch((err) => {
          notify(`Information of ${newPerson.name} has been removed from Server`, 'error');
          setPersons(persons.filter(p => p.name !== newPerson.name));
        })
    }
    else {
      try {
        addPerson(newPerson)
          .then((person) => {
            notify(`Added ${person.name}`)
            setPersons(persons.concat(person));
          })
      }
      catch (err) { }
    }
  }

  return (
    <form>
      <div>
        name: <input
          value={newName}
          onChange={handleNewName} />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit" onClick={addPersonEvent}>add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, filter, deleteEntry }) => {
  console.log(persons);
  let filteredPersons = persons.filter((person) => person.name.startsWith(filter));

  return (
    <ul>
      {filteredPersons.map((person) => <Contact
        key={person.name}
        person={person}
        deleteEntry={() => { deleteEntry(person) }} />)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Dat Le');
  const [newNumber, setNewNumber] = useState('0123456');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({ content: '', type: 'msg' });

  useEffect(() => {
    getPersons()
      .then((data) => setPersons(data))
  }, [])

  const deleteEntryHandle = (person) => {
    if (window.confirm(`Delete ${person.name}`))
      deleteEntry(person.id)
        .then((removed) => {
          console.log(removed)
          setPersons(persons.filter(value => value.id !== removed.id));
        });
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter filter={filter} setFilter={setFilter} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deleteEntry={deleteEntryHandle} />
    </div>
  )
}

export default App