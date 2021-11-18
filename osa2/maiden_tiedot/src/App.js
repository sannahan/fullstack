import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import List from './components/List'
import Country from './components/Country'
import axios from 'axios'

const View = ({  countriesToShow, message, handleClick, showCountry, id }) => {
  if (showCountry || countriesToShow.length === 1) {
    console.log(id)
    return (
      <Country country={countriesToShow[id]} />
    )
  }
  return (
    <List list={countriesToShow} errormessage={message} handleClick={handleClick} />
  )
}

const App = () => {
  const [ newSearch, setNewSearch ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ showCountry, setShowCountry ] = useState(false)
  const [ countryId, setCountryId ] = useState(-1)

  const handleClick = (name) => {
    const handler = () => {
      setShowCountry(true)
      setCountryId(countriesToShow.findIndex(country => country.name.common === name ))
    }
    return handler
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    setShowCountry(false)
    setCountryId(0)
  }

  const countriesToShow = newSearch === '' ? countries : countries.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()))
  const message = countriesToShow.length <= 10 ? '' : 'Too many matches, specify another filter'
  
  return (
    <div>
      <Search note="find countries" newSearch={ newSearch } handleSearchChange={ handleSearchChange } /> 
      <View countriesToShow={countriesToShow} message={message} handleClick={ handleClick } showCountry={showCountry} id={countryId} />
    </div>
  )
}

export default App