import React, { useState } from 'react'

const AddBlogForm = ({ handleAdd, setMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      handleAdd({
        title,
        author,
        url,
      })
      setMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      setMessage('could not add blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='createButton' type='submit'>create</button>
      </form>
    </div>
  )
}

export default AddBlogForm