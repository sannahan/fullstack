let timeout

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      clearTimeout(timeout)
      return action.notification
    case 'SET_NULL':
      return null
    default:
      return state
  }
}

export const setNotification = (message, seconds) => {  
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: message
    })
    timeout = setTimeout(() => {
      dispatch(setNull(message))
    }, seconds * 1000)
  }
}

export const setNull = (message) => {
  return {
    type: 'SET_NULL',
    notification: message
  }
}

export default notificationReducer