import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import Notification from '../utils/Notification'

const LoginForm = ({
  handleLogin
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const tryLogin = (event) => {
    event.preventDefault()
    handleLogin({
      username, password,
    })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <Form onSubmit={tryLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type='text'
            value={username}
            id='username'
            onChange={handleUsernameChange}
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            id='password'
            onChange={handlePasswordChange}
          />
          <Button type='submit'>login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm