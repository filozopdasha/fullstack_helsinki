const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')
blogsRouter.use(middleware.tokenExtractor)
blogsRouter.use(middleware.userExtractor)

console.log('blogs are loaded')

blogsRouter.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', {
            username: 1, name: 1
        }
        )
        res.json(blogs)
    } catch (error) {
        next(error)

    }
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const user = request.user
        if (!user) {

            return response.status(401).json({ error: 'token not stated or wrong' })
        }

        const {

            title, author, url, likes
        } = request.body

        if (!title || !url) {
            return response.status(400).json({ error: 'title or url not stated' })
        }

        const blog = new Blog({
            title,
            author,
            url,
            likes: likes === undefined ? 0 : likes,
            user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const user = request.user
        if (!user) {
            return response.status(401).json({ error: 'token not stated or wrong' })
        }



        const blog = await Blog.findById(request.params.id)
        if (!blog)
        {
            return response.status(404).json({ error: 'blog not found' })
        }

        if (blog.user.toString() !== user._id.toString()) {
            return response.status(403).json({ error: 'only the author can delete the blog' }
            )
        }

        await blog.deleteOne()
        response.status(204).end()


    } catch (error) {
        next(error)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const {
            title,
            author,
            url,
            likes
        } = request.body

        const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            {
                title,
                author,
                url,
                likes
            },
            {
                new: true,
                runValidators: true,
                context: 'query'
            }
        )

        if (updatedBlog) {
            response.status(200).json(updatedBlog)
        } else {
            response.status(404).json({
                error: 'blog not found'
            }
            )
        }
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter