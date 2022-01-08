import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Menu = ({ handleLogout }) => {
  const user = useSelector(state => state.user)

  return (
    <div>
      <Link to='/'>blogs</Link>&nbsp;
      <Link to='/users'>users</Link>&nbsp;
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Menu