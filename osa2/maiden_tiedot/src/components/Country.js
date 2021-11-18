import React from 'react'

const Language = ({ language }) => {
  return (
    <li> {language} </li>
  )
}

const Languages = ({ languages }) => {
  return (
    <ul>
      {Object.values(languages).map(language => <Language key={language} language={language} />)}
    </ul>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h1>{ country.name.common }</h1>
      capital { country.capital }<br />
      region { country.region }<br />
      <h2>languages</h2>
      <Languages languages={ country.languages } />
      <img src={ country.flags.png } alt="flag" width="100" /> 
    </div>
  )
}

export default Country