
const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    let total = 0

    blogs.forEach(blog => {
        total += blog.likes
    })

    return total
}

const favoriteBlog = (blogs) => {

    if (blogs.length === 0) {
        return null
    }

    let likedFav = blogs[0]

    for (let i = 1; i < blogs.length; i++) {
        if (blogs[i].likes > likedFav.likes) {
            likedFav = blogs[i]
        }
    }

    return likedFav
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;

    const blogCounts = blogs.reduce((counts, blog) => {
        counts[blog.author] = (counts[blog.author] || 0) + 1;
        return counts;
    }, {});

    let maxBlogs = 0;

    let topAuthor = null;

    for (const author in blogCounts) {
        if (blogCounts[author] > maxBlogs) {
            maxBlogs = blogCounts[author];
            topAuthor = author;
        }
    }

    return {
        author: topAuthor,
        blogs: maxBlogs
    };
};


const mostLikes = (blogs) => {

    if (blogs.length === 0) return null;

    const counterOfLikes = {};
    for (let i = 0; i < blogs.length; i++) {

        const blog = blogs[i];
        const author = blog.author;
        const likes = blog.likes;

        if (counterOfLikes[author] === undefined) {
            counterOfLikes[author] = likes;
        } else {


            counterOfLikes[author] += likes;
        }

    }
    let maxLikes = 0;
    let topAuthor = null;

    for (const author in counterOfLikes) {
        if (counterOfLikes[author] > maxLikes) {

            maxLikes = counterOfLikes[author];
            topAuthor = author;
        }
    }

    return {
        author: topAuthor, likes: maxLikes
    };
};


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}