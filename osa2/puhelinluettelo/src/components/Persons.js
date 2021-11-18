import React from 'react'

const Person = ({ id, name, number, handleClick }) => {
  return (
    <div>
      {name}&nbsp;
      {number}&nbsp;
      <button onClick={handleClick(id, name)}>delete</button>
    </div>
  )
}

const Persons = ({ persons, handleClick }) => {
  return (
    <div>
      {persons.map(person => <Person key={person.id} id={person.id} name={person.name} number={person.number} handleClick={handleClick}/>)}
    </div>
  )
}

export default Persons