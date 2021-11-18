import React from 'react'

const ErrorNotification = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return (
    <div className='errormessage'>
      {errorMessage}
    </div>
  )
}

export default ErrorNotification