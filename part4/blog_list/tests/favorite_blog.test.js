const { describe, test } = require('node:test')
const { strictEqual, deepStrictEqual } = require('assert')
const listHelper = require('../utils/list_helper')

const blogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    },
    {
        title: 'random user',
        author: 'random author',
        url: 'https://test.com',
        likes: 8
    },
    {
        title: 'random user2',
        author: 'random author2',
        url: 'https://test2.com',
        likes: 3
    },
    {
        title: 'random user3',
        author: 'random author3',
        url: 'https://test3.com',
        likes: 9
    }
]

describe('favorite blog', () => {
    test('when list is empty, return null', () => {
        const result = listHelper.favoriteBlog([])
        strictEqual(result, null)
    })

    test('when list has blogs, returns the one with most likes', () => {
        const expected = {
            title: 'random user3',
            author: 'random author3',
            url: 'https://test3.com',
            likes: 9
        }
        const result = listHelper.favoriteBlog(blogs)

        deepStrictEqual(
            {
                title: result.title,
                author: result.author,
                url: result.url,
                likes: result.likes
            },
            expected
        )
    })
})