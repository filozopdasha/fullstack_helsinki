const { mostLikes } = require('../utils/list_helper');

describe('mostLikes', () => {
    test('mostLikes is empty', () => {
        const blogs = [];
        const res = mostLikes(blogs);
        expect(res).toBe(null);
    }
    );

    test('mostLikes with your random data, author with most likes', () => {
        const blogs = [
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
        ];

        const res = mostLikes(blogs);
        expect(res).toEqual({ author: 'Ivan Franko', likes: 9 });
    });
});