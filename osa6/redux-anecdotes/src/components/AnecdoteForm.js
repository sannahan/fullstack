import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const add = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addAnecdote(anecdote)
    props.setNotification(`you added '${anecdote}'`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const ConnectedAnecdoteForm = connect(
  null,
  { addAnecdote, setNotification }
)(AnecdoteForm)

export default ConnectedAnecdoteForm