const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const reducer = (previous, current) => previous + current
  return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.length === 0 ? {} : blogs.filter(blog => blog.likes === maxLikes)[0]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return { 'author': '', 'blogs': 0 }
  }
  return _(blogs)
    .countBy('author')
    .map((blogs, author) => ({ author: author, blogs: blogs}))
    .maxBy('blogs')
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return { 'author': '', 'likes': 0 }
  }
  return _(blogs)
    .groupBy('author')
    .map((blogs, author) => ({ author: author, likes: _(blogs).map(blog => blog.likes).sum()}))
    .maxBy('likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}