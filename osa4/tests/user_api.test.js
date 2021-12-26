const supertest = require('supertest')
const app = require('../app')
// const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('one initial user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salaisuus', 10)
    const user = new User({
      username: 'first',
      passwordHash,
      name: 'test'
    })

    await user.save()
  })

  test('user with a unique username is added', async () => {
    const initialUsers = await helper.getUsers()

    const newUser = {
      username: 'second',
      password: 'salainen',
      name: 'test'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const finalUsers = await helper.getUsers()
    expect(finalUsers).toHaveLength(initialUsers.length + 1)
    const usernames = finalUsers.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('user with a non-unique username is not added', async () => {
    const initialUsers = await helper.getUsers()

    const newUser = {
      username: 'first',
      password: 'salainen',
      name: 'test'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const finalUsers = await helper.getUsers()
    expect(finalUsers).toHaveLength(initialUsers.length)
  })

  test('if the password is too short, user is not added', async () => {
    const initialUsers = await helper.getUsers()

    const newUser = {
      username: 'second',
      password: 'sa',
      name: 'test'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is too short')

    const finalUsers = await helper.getUsers()
    expect(finalUsers).toHaveLength(initialUsers.length)
  })

  test('if the username is too short, user is not added', async () => {
    const initialUsers = await helper.getUsers()

    const newUser = {
      username: 'se',
      password: 'salainen',
      name: 'test'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(`Path \`username\` (\`${newUser.username}\`) is shorter than the minimum allowed`)

    const finalUsers = await helper.getUsers()
    expect(finalUsers).toHaveLength(initialUsers.length)
  })
})