import blogService from '../services/blogs'
import loginService from '../services/login'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'INITIALIZE_USER':
      return action.data
    case 'LOGIN_USER':
      return action.data
    case 'LOGOUT_USER':
      return null
    default:
      return state
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const userObject = JSON.parse(loggedInUser)
      blogService.setToken(userObject.token)
      dispatch({
        type: 'INITIALIZE_USER',
        data: userObject
      })
    }
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem(
      'loggedInUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN_USER',
      data: user
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken('')
    dispatch({
      type: 'LOGOUT_USER'
    })
  }
}

export default userReducer