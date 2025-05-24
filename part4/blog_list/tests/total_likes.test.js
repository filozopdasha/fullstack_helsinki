const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const oneBlogList = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]

    const aLotOfBlogsList = [
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

    test('list has only one blog, equals likes of that', () => {
        const result = listHelper.totalLikes(oneBlogList)
        expect(result).toBe(5)
    })

    test('list has multiple blogs equals summa of likes', () => {
        const result = listHelper.totalLikes(aLotOfBlogsList)
        expect(result).toBe(27)
    })

    test('list is empty likes should be equal 0', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
})