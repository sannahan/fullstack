import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_BLOGS':
      return action.blogs
    case 'ADD_BLOG':
      return state.concat(action.blog)
    case 'UPDATE_BLOG':
      return state.map(blog => blog.id === action.blog.id ? action.blog : blog)
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data)
    case 'ADD_COMMENT': {
      return state.map(blog => blog.id === action.data.id ? action.data : blog)
    }
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE_BLOGS',
      blogs
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.addBlog(blog)
    dispatch({
      type: 'ADD_BLOG',
      blog: newBlog
    })
  }
}

export const updateBlog = (id, blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.updateBlog(id, blog)
    dispatch({
      type: 'UPDATE_BLOG',
      blog: updatedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.addComment(id, comment)
    dispatch({
      type: 'ADD_COMMENT',
      data: updatedBlog
    })
  }
}

export default blogReducer