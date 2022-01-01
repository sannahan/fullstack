import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('blog is rendered', () => {
  let component
  const testblog = {
    id: '5a43fde2cbd20b12a2c34e91',
    user: {
      id: '5a43e6b6c37f3d065eaaa581',
      username: 'testusername',
      name: 'testname'
    },
    likes: 0,
    author: 'testauthor',
    title: 'testtitle',
    url: 'testurl'
  }
  const mockHandleUpdate = jest.fn()
  const mockHandleDelete = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={testblog} handleUpdate={mockHandleUpdate} handleDelete={mockHandleDelete} />
    )
  })

  test('only blog title and author are rendered as default', () => {
    expect(component.container).toHaveTextContent('testtitle', 'testauthor')
    expect(
      component.container.querySelector('.togglableContent')
    ).toHaveStyle({ display: 'none' })
  })

  test('blog url and likes are rendered when user clicks on view', () => {
    fireEvent.click(component.getByText('view'))
    expect(
      component.container.querySelector('.togglableContent')
    ).not.toHaveStyle({ display: 'none' })
  })

  test('mockHandleUpdate called twice when like button clicked twice', () => {
    fireEvent.click(component.getByText('like'))
    fireEvent.click(component.getByText('like'))
    expect(mockHandleUpdate.mock.calls).toHaveLength(2)
  })
})

