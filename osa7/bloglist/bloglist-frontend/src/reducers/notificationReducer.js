const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

let notificationId

export const setNotification = (message) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message
    })

    if (notificationId) {
      clearTimeout(notificationId)
    }

    notificationId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, 5000)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer