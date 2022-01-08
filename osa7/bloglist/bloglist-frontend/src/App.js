import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import LoginForm from './components/login/LoginForm'
import Blog from './components/blogs/Blog'
import Users from './components/users/Users'
import User from './components/users/User'
import Menu from './components/utils/Menu'
import BlogList from './components/blogs/BlogList'
import Notification from './components/utils/Notification'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, updateBlog, deleteBlog } from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const handleLogin = async (credentials) => {
    try {
      await dispatch(loginUser(credentials))
    } catch (exception) {
      dispatch(setNotification('wrong credentials'))
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const handleUpdate = async (id, blogObject) => {
    dispatch(updateBlog(id, blogObject))
  }

  const handleDelete = async (id) => {
    await dispatch(deleteBlog(id))
  }

  if (!user) {
    return (
      <div className='container'>
        <LoginForm
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div className='container'>
      <Menu handleLogout={handleLogout} />
      <h2>blog app</h2>
      <Notification />

      <Switch>
        <Route path='/blogs/:id'>
          <Blog handleUpdate={handleUpdate} handleDelete={handleDelete} />
        </Route>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <BlogList />
        </Route>
      </Switch>

    </div>
  )
}

export default App