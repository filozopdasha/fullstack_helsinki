const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Really interesting blog',
        author: 'Daria Filozop',
        url: 'https://interestingblog.com',
        likes: 8
    },
    {
        title: 'Sadok Vyshnevyi',
        author: 'Taras Shevchenko',
        url: 'https://poems.com',
        likes: 3
    },
    {
        title: 'Son',
        author: 'Ivan Franko',
        url: 'https://anotherpoems.com',
        likes: 9
    },
    {
        title: 'Another Poem',
        author: 'Another Poet',
        url: 'https://poemsagain.com',
        likes: 5
    },
    {
        title: 'Interesting blog, but new one',
        author: 'Interesting Author',
        url: 'https://coolblogagain.com',
        likes: 2
    }
]

const dataBlogs = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const initialUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'password'
}

module.exports = {
    initialBlogs,
    blogsInDatabase: dataBlogs,
    initialUser
}