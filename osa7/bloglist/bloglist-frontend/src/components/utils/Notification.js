import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const message = useSelector(state => state.notification)

  if (message === null) {
    return null
  }

  const variant = message.match(/wrong|not/) ? 'danger' : 'success'

  return (
    <div id='message'>
      <Alert variant={variant}>{message}</Alert>
    </div>
  )
}

export default Notification