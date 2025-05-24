const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    const hashedPass = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash: hashedPass })

    await user.save()
})

test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
        username: 'newuser',
        name: 'Test User',
        password: 'salasana',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
})

test('creation fails with proper statuscode and message if username already taken', async () => {
    const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salasana',
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    expect(result.body.error).toMatch(/username.*unique/i)
})

test('creation fails if username is shorter than 3 characters', async () => {
    const newUser = {
        username: 'ab',
        name: 'Short Name',
        password: 'validpass'
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    expect(result.body.error).toContain('username should be at least 3 characters long')
})

test('creation fails if password is shorter than 3 characters', async () => {
    const newUser = {
        username: 'validuser',
        name: 'Name',
        password: 'pw'
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    expect(result.body.error).toContain('password should be at least 3 characters long')
})

test('creation fails if username is missing', async () => {
    const newUser = {
        name: 'No Username',
        password: 'validpass'
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    expect(result.body.error).toContain('username should be at least 3 characters long')
})

test('creation fails if password is missing', async () => {
    const newUser = {
        username: 'nouserpass',
        name: 'No Password'
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    expect(result.body.error).toContain('password should be at least 3 characters long')
})

afterAll(async () => {
    await mongoose.connection.close()
})