import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddBlogForm from './AddBlogForm'

describe('adding a blog', () => {
  let component
  const mockHandleAdd = jest.fn()

  beforeEach(() => {
    component = render(
      <AddBlogForm handleAdd={mockHandleAdd} />
    )
  })

  test('mockFunction called with correct inputs', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'titleinput' }
    })
    fireEvent.change(author, {
      target: { value: 'authorinput' }
    })
    fireEvent.change(url, {
      target: { value: 'urlinput' }
    })
    fireEvent.submit(form)

    expect(mockHandleAdd.mock.calls).toHaveLength(1)
    expect(mockHandleAdd.mock.calls[0][0].title).toBe('titleinput')
    expect(mockHandleAdd.mock.calls[0][0].author).toBe('authorinput')
    expect(mockHandleAdd.mock.calls[0][0].url).toBe('urlinput')
  })
})