import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote: changedAnecdote)
    case 'ADD':
      return state.concat(action.data)
    case 'INITIALIZE':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.updateAnecdote({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch({
      type: 'VOTE',
      data: { id: anecdote.id }
    })
  }
}

export const addAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes
    })
  }
}

export default reducer