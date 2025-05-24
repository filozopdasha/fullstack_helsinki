const { mostBlogs } = require('../utils/list_helper');

describe('mostBlogs', () => {
    test('mostBlogs is empty', () => {

        const blogs = [];
        const res = mostBlogs(blogs);
        expect(res).toBe(null);
    });

    test('mostBlogs, author with most blogs', () => {
        const blogs = [
            {
                title: 'Really interesting blog',
                author: 'Daria Filozop',
                url: 'https://interestingblog.com',
                likes: 8
            },
            {
                title: 'Taras Shevchenko',
                author: 'Sadok Vyshnevyi',
                url: 'https://poems.com',
                likes: 3
            },
            {
                title: 'Ivan Franko',
                author: 'Son',
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
            },
            {
                title: 'One else blog',
                author: 'Daria Filozop',
                url: 'https://wowcool.com',
                likes: 2
            }
        ];
        const result = mostBlogs(blogs);
        expect(result).toEqual({
            author: 'Daria Filozop',
            blogs: 2
        });
    });
});