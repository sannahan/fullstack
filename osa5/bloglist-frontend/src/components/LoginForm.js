import React, { useState } from 'react'
import Notification from './Notification'

const LoginForm = ({
  handleLogin, message
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
      <Notification message={message} />
      <form onSubmit={tryLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            id='username'
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            id='password'
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm