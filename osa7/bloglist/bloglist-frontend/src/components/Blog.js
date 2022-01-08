import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addComment } from '../reducers/blogReducer'

const Blog = ({ handleUpdate, handleDelete }) => {
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs.find(blog => blog.id === useParams().id))

  if (!blog) {
    return null
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

  const onSubmit = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    dispatch(addComment(blog.id, { comment }))
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a><br/>
      {blog.likes} likes &nbsp;
      <button onClick={updateBlog}>like</button><br/>
      added by {blog.user.name}<br/>
      {window.localStorage.getItem('loggedInUser') && JSON.parse(window.localStorage.getItem('loggedInUser')).username === blog.user.username
        && <button onClick={deleteBlog}>remove</button>}
      <h3>comments</h3>
      <form onSubmit={onSubmit}>
        <input type='text' name='comment'/>
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
      </ul>
    </div>
  )
}

Blog.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog