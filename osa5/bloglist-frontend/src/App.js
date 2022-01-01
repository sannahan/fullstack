import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import AddBlogForm from './components/AddBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  const sortFunction = (previous, next) => next.likes - previous.likes

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(sortFunction))
    )
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const userObject = JSON.parse(loggedInUser)
      blogService.setToken(userObject.token)
      setUser(userObject)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken('')
    setUser(null)
  }

  const addBlogRef = useRef()

  const handleAdd = async (blogObject) => {
    const newBlog = await blogService.addBlog(blogObject)
    setBlogs(blogs.concat(newBlog))
    addBlogRef.current.handleClick()
  }

  const handleUpdate = async (id, blogObject) => {
    const updatedBlog = await blogService.updateBlog(id, blogObject)
    setBlogs(blogs
      .map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
      .sort(sortFunction)
    )
  }

  const handleDelete = async (id) => {
    await blogService.deleteBlog(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  if (!user) {
    return (
      <LoginForm
        handleLogin={handleLogin}
        message={message}
      />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel='create new blog' ref={addBlogRef}>
        <AddBlogForm handleAdd={handleAdd} setMessage={setMessage} />
      </Togglable>
      <div id='blogs'>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate} handleDelete={handleDelete} />
        )}
      </div>
    </div>
  )
}

export default App