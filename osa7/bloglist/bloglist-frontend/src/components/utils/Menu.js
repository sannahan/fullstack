import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const Menu = ({ handleLogout }) => {
  const user = useSelector(state => state.user)

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#' as='span'>
            <Link to='/'>blogs</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link to='/users'>users</Link>
          </Nav.Link>
          <span className='navbar-text'>
            {user.name} logged in
          </span>
          <button onClick={handleLogout}>logout</button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu