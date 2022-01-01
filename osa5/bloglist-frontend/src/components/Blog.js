import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, handleUpdate, handleDelete }) => {
  const [open, setOpen] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClick = () => {
    setOpen(!open)
  }

  const updateBlog = () => {
    handleUpdate(
      blog.id,
      {
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }
    )
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleDelete(blog.id)
    }
  }

  const showWhenOpen = { display: open ? '' : 'none' }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}&nbsp;
      <button onClick={handleClick}>{open ? 'hide' : 'view'}</button>
      <div style={showWhenOpen} className='togglableContent'>
        {blog.url}<br/>
        likes {blog.likes}&nbsp;
        <button onClick={updateBlog}>like</button><br/>
        {blog.user.name}<br/>
        {window.localStorage.getItem('loggedInUser') && JSON.parse(window.localStorage.getItem('loggedInUser')).username === blog.user.username
          && <button onClick={deleteBlog}>remove</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog