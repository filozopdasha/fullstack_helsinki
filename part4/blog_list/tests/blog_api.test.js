const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const helper = require('./test_helper')
const config = require('../utils/config')

let token = null

beforeAll(async () => {
    mongoose.connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}, 10000)

beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const passwordHash = await bcrypt.hash(helper.initialUser.password, 10)
    const user = new User({ username: helper.initialUser.username, passwordHash })
    await user.save()

    const loginResponse = await api
        .post('/api/login')
        .send({

            username: helper.initialUser.username,
            password: helper.initialUser.password,
        })

    token = loginResponse.body.token

    const userInDb = await User.findOne({ username: helper.initialUser.username })

    const blogObjects = helper.initialBlogs.map(blog => new Blog({
        ...blog,
        user: userInDb._id
    }))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
}, 100000)

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
})



test('response is a json', async () => {
    await api.get('/api/blogs').expect('Content-Type', /application\/json/)
}
)

test('check if the id is unique', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})


test('check if adding function is work', async () => {
    const newBlog = {
        title: 'Get to Yes, But Dont Pay For It',
        author: 'Lee Goldberg',
        url: 'https://leegoldberg.com/get-to-yes-but-dont-pay-for-it/',
        likes: 123
    }



    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDatabase()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

})

test('check if missing likes is equal to 0', async () => {

    const newBlog = {
        title: 'My Thoughts: Social Media For Kidlit Book Creators in 2023 (and why Im spending more time on Post)',
        author: 'Ohi Debbie',
        url: 'https://debbieohi.com/2022/12/socialmedia2023/'
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)



    const blogsAtEnd = await helper.blogsInDatabase()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toEqual(0)
})

test('returns 400 BadRequest if the title is missing', async () => {

    const newBlog = {
        author: 'Daria Filozop',
        url: 'https://interestingblog.com'
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)


})

test('returns 400 Bad Request if the URL is missing', async () => {
    const newBlog = {
        title: 'Sadok Vyshnevyi',
        author: 'Taras Shevchenko'
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
})

test('delete a blog post', async () => {
    const blogsAtStart = await helper.blogsInDatabase()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDatabase()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
})

test('update a blog post', async () => {

    const blogsAtStart = await helper.blogsInDatabase()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = { ...blogToUpdate, likes: 100 }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedBlog)
        .expect(200)

        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDatabase()
    const updatedBlogInDb = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

    expect(updatedBlogInDb.likes).toBe(100)
})

afterAll(() => {

    mongoose.connection.close()
})