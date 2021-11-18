import React from 'react'

const Search = ({ note, newSearch, handleSearchChange }) => {
  return (
    <div>
      { note } 
      <input value={ newSearch } onChange={ handleSearchChange } />
    </div>
  )
}

export default Search