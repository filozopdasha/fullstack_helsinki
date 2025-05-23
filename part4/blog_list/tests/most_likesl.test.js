const { describe, test } = require('node:test');
const assert = require('node:assert');
const { mostLikes } = require('../utils/list_helper');

describe('mostLikes', () => {
    test('mostLikes is empty', () => {
        const blogs = [];
        const result = mostLikes(blogs);
        assert.strictEqual(result, null);
    });

    test('mostLikes with your random data, author with most likes', () => {
        const blogs = [
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
            },
            {
                title: 'random user4',
                author: 'random author',
                url: 'https://test4.com',
                likes: 5
            },
            {
                title: 'random user5',
                author: 'random author',
                url: 'https://test5.com',
                likes: 2
            }
        ];


        const result = mostLikes(blogs);
        assert.deepStrictEqual(result, { author: 'random author', likes: 15 });
    });
});