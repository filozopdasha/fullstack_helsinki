const { describe, test } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
console.log(listHelper)
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

    test(' list has only one blog, equals likes of that', () => {
        const result = listHelper.totalLikes(oneBlogList)
        assert.strictEqual(result, 5)
    })

    test(' list has multiple blogs equals summa of likes', () => {
        const result = listHelper.totalLikes(aLotOfBlogsList)
        assert.strictEqual(result, 15)
    })

    test(' list is empty likes should be equal 0', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
    })
})