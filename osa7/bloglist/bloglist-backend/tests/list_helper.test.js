const listHelper = require('../utils/list_helper')
const blogs = require('./test_helper').blogs

test('dummy returns one', () => {
  expect(listHelper.dummy([])).toBe(1)
})

describe('total likes', () => {
  test('of empty list are zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that blog', () => {
    expect(listHelper.totalLikes([].concat(blogs[0]))).toBe(7)
  })

  test('of a bigger list are calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

describe('max likes', () => {
  test('of empty list returns empty object', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })

  test('when list has only one blog equals that blog object', () => {
    expect(listHelper.favoriteBlog([].concat(blogs[0]))).toEqual(blogs[0])
  })

  test('of a bigger list is the correct object', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2])
  })
})

describe('most blogs', () => {
  test('of empty list returns empty values', () => {
    const answer = {
      author: '',
      blogs: 0
    }
    expect(listHelper.mostBlogs([])).toEqual(answer)
  })

  test('when list has only one blog equals that author with 1 blog', () => {
    const answer = {
      author: 'Michael Chan',
      blogs: 1
    }
    expect(listHelper.mostBlogs([].concat(blogs[0]))).toEqual(answer)
  })

  test('of bigger list is the correct author and amount of blogs', () => {
    const answer = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(listHelper.mostBlogs(blogs)).toEqual(answer)
  })
})

describe('most likes', () => {
  test('of empty list returns empty values', () => {
    const answer = {
      author: '',
      likes: 0
    }
    expect(listHelper.mostLikes([])).toEqual(answer)
  })

  test('when list has only one blog equals that author with correct likes', () => {
    const answer = {
      author: 'Michael Chan',
      likes: 7
    }
    expect(listHelper.mostLikes([].concat(blogs[0]))).toEqual(answer)
  })

  test('of bigger list is the correct author and amount of likes', () => {
    const answer = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(listHelper.mostLikes(blogs)).toEqual(answer)
  })
})
