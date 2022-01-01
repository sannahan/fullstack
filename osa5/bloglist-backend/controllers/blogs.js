const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user
  
  const newBlog = request.body.likes ? request.body : { ...request.body, likes: 0 }
  newBlog.user = user._id
  const blog = new Blog(newBlog)
  const result = await blog.save()
  result.populate('user', {username: 1, name: 1, id: 1})

  const filter = { _id: user._id }
  const update = { blogs: user.blogs.concat(result._id) }
  await User.findByIdAndUpdate(filter, update)

  // https://stackoverflow.com/questions/70313750/mongoose-unique-validator-giving-unique-error-when-trying-to-update-a-field-mon
  // user.blogs = user.blogs.concat(result._id)
  // await user.save()
  
  response.status(201).json(result)  
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (blog.user.toString() !== request.user.id.toString()) {
    return response.status(401).json({ error: 'you do not have the rights to remove this blog' })
  }
  
  const result = await blog.remove()
  
  const filter = { _id: user._id }
  const update = { blogs: user.blogs.filter(id => id.toString() !== result._id.toString()) }
  await User.findByIdAndUpdate(filter, update)

  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true }).populate('user', {username: 1, name: 1, id: 1})
  response.json(result.toJSON())
})

module.exports = blogRouter