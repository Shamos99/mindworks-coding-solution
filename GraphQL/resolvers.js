const database = require("./database");

function hasValidFilterOptions(obj) {
    return obj.hasOwnProperty('offset') && obj.hasOwnProperty('limit');
}

const root = {
    posts: (obj, args, context, info) => {

        let posts = obj.filter === undefined ? database.posts : database.getPosts(obj.filter);

        if (hasValidFilterOptions(obj)) return database.applyPagination(posts, obj.offset, obj.limit)

        return posts;


    },

    comments: (obj, args, context, info) => {

        let comments = obj.filter === undefined ? database.comments : database.getComments(obj.filter);

        if (obj.search !== undefined) comments = database.commentSearch(comments, obj.search);

        if (hasValidFilterOptions(obj)) return database.applyPagination(comments, obj.offset, obj.limit)

        return comments;

    }
};

module.exports = root;
