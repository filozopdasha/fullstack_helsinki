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
    }
]

describe('favorite blog', () => {
    test('when list is empty, return null', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toBe(null)
    })

    test('when list has blogs, returns the one with most likes', () => {

        const expected = {

            title: 'Son',
            author: 'Ivan Franko',
            url: 'https://anotherpoems.com',
            likes: 9
        }
        const res = listHelper.favoriteBlog(blogs)
        expect(res).toMatchObject(expected)
    })
})