import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from '../utils/Togglable'
import AddBlogForm from './AddBlogForm'
import { setNotification } from '../../reducers/notificationReducer'
import { addBlog } from '../../reducers/blogReducer'

const BlogList = () => {
  const addBlogRef = useRef()
  const dispatch = useDispatch()

  const sortFunction = (previous, next) => next.likes - previous.likes
  const blogs = useSelector(state => state.blogs.sort(sortFunction))

  const handleAdd = async (blogObject) => {
    try {
      addBlogRef.current.handleClick()
      await dispatch(addBlog(blogObject))
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`))
    } catch (exception) {
      dispatch(setNotification('could not add blog'))
    }
  }

  return (
    <div>
      <Togglable buttonLabel='create new blog' ref={addBlogRef}>
        <AddBlogForm handleAdd={handleAdd} />
      </Togglable>
      <div id='blogs'>
        <ul className='list-group'>
          {blogs.map(blog => <li key={blog.id} className='list-group-item'><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>)}
        </ul>
      </div>
    </div>
  )
}

export default BlogList