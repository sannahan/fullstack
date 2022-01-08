import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const AddBlogForm = ({ handleAdd }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    handleAdd({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            type='text'
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>author</Form.Label>
          <Form.Control
            type='text'
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>url</Form.Label>
          <Form.Control
            type='text'
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button id='createButton' type='submit'>create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default AddBlogForm