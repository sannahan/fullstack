import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import AddBlogForm from './components/AddBlogForm'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, addBlog, updateBlog, deleteBlog } from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const sortFunction = (previous, next) => next.likes - previous.likes
  const blogs = useSelector(state => state.blogs.sort(sortFunction))
  const user = useSelector(state => state.user)

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

  const addBlogRef = useRef()

  const handleAdd = async (blogObject) => {
    try {
      addBlogRef.current.handleClick()
      await dispatch(addBlog(blogObject))
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`))
    } catch (exception) {
      dispatch(setNotification('could not add blog'))
    }
  }

  const handleUpdate = async (id, blogObject) => {
    dispatch(updateBlog(id, blogObject))
  }

  const handleDelete = async (id) => {
    dispatch(deleteBlog(id))
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    listStyle: 'none'
  }

  if (!user) {
    return (
      <LoginForm
        handleLogin={handleLogin}
      />
    )
  }

  return (
    <div>
      <Menu handleLogout={handleLogout}/>
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
          <Togglable buttonLabel='create new blog' ref={addBlogRef}>
            <AddBlogForm handleAdd={handleAdd} />
          </Togglable>
          <div id='blogs'>
            <ul>
              {blogs.map(blog => <li key={blog.id} style={blogStyle}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>)}
            </ul>
          </div>
        </Route>
      </Switch>

    </div>
  )
}

export default App