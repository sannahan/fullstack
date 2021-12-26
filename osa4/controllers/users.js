const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})
  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.password || body.password.length < 3) {
    return response.status(400).json({ error: 'password is too short' })
  }
  const passwordHash = await bcrypt.hash(body.password, 10)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const result = await user.save()
  response.status(201).json(result)
})

module.exports = userRouter