const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)
let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
  await User.deleteMany({})
  await User.insertMany(helper.users)

  const login = {
    username: 'testuser1',
    password: 'password'
  }
  const result = await api
    .post('/api/login')
    .send(login)

  token = result.body.token
})

describe('get blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('the amount of blogs is correct', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.blogs.length)
  })

  test('id is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('add blogs', () => {
  test('valid blog is added', async () => {
    const blog = {
      title: 'Testtitle',
      author: 'Testauthor',
      url: 'Testurl',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.getBlogs()
    expect(blogsAfter).toHaveLength(helper.blogs.length + 1)
    const titles = blogsAfter.map(r => r.title)
    expect(titles).toContain('Testtitle')
  })

  test('blog with no likes added with 0 likes', async () => {
    const blog = {
      title: 'Testtitle',
      author: 'Testauthor',
      url: 'Testurl',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(blog)

    const blogsAfter = await helper.getBlogs()
    const addedBlog = blogsAfter.find(r => r.title === 'Testtitle')
    expect(addedBlog.likes).toBe(0)
  })

  test('blog with no title and url is not added', async () => {
    const blog = {
      author: 'Testauthor',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(blog)
      .expect(400)

    const blogsAfter = await helper.getBlogs()
    expect(blogsAfter).toHaveLength(helper.blogs.length)
  })

  test('blog is not added without a token', async () => {
    const blog = {
      title: 'Testtitle',
      author: 'Testauthor',
      url: 'Testurl',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(401)

    const blogsAfter = await helper.getBlogs()
    expect(blogsAfter).toHaveLength(helper.blogs.length)
  })
})

/*
// would need to be refactored to take tokens into account
describe('delete blog', () => {
  test('first blog is successfully deleted', async () => {
    const blogsBefore = await helper.getBlogs()
    const firstBlog = blogsBefore[0]

    await api
      .delete(`/api/blogs/${firstBlog.id}`)
      .expect(204)

    const blogsAfter = await helper.getBlogs()
    expect(blogsAfter).toHaveLength(helper.blogs.length - 1)
    expect(blogsAfter.map(blog => blog.title)).not.toContain(firstBlog.title)
  })
})
*/

describe('update blog', () => {
  test('first blog is successfully updated', async () => {
    const blogsBefore = await helper.getBlogs()
    const firstBlog = blogsBefore[0]
    const updatedBlog = {
      title: firstBlog.title,
      author: firstBlog.author,
      url: firstBlog.url,
      likes: 8
    }

    await api
      .put(`/api/blogs/${firstBlog.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAfter = await helper.getBlogs()
    expect(blogsAfter).toHaveLength(helper.blogs.length)
    expect(blogsAfter.find(blog => blog.likes === 8).title).toBe(firstBlog.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

