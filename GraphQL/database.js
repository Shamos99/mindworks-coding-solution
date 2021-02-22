const axios = require('axios');

const comments_endpoint = "https://jsonplaceholder.typicode.com/comments";
const posts_endpoint = "https://jsonplaceholder.typicode.com/posts";


class Database {
    constructor() {
        this.posts = null;
        this.comments = null;
    }


    async init() {
        this.posts = await this.fetchData(posts_endpoint);
        this.comments = await this.fetchData(comments_endpoint);
        for (let comment of this.comments) {
            let post = this.posts[comment.postId - 1];
            if (!post.hasOwnProperty("comments")) post.comments = [];
            post.comments.push(comment)
        }
    }

    async fetchData(endpoint) {
        return axios.get(endpoint)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    getPosts(ids) {
        let posts = []
        for (let post of this.posts) {
            if (ids.includes(post.id)) posts.push(post);
        }
        return posts;
    }

    getComments(ids) {
        let comments = []
        for (let comment of this.comments) {
            if (ids.includes(comment.id)) comments.push(comment);
        }
        return comments;
    }

    _searchMatchObj(obj, searchString) {
        for (let [k, v] of Object.entries(obj)) {
            if (typeof (v) === "string") {
                // search through this field
                if (v.includes(searchString)) return true;
            }

        }
        return false;

    }

    commentSearch(comments, searchString) {
        let prunedComments = []
        for (let comment of comments) {
            if (this._searchMatchObj(comment, searchString)) prunedComments.push(comment);
        }

        return prunedComments;
    }

    applyPagination(list, offset, limit) {
        let n_pages = Math.ceil(list.length / limit)
        let pages = []
        if (offset >= 0 && offset < list.length) {
            for (let i = offset; i < limit + offset; i++) {
                if (i < list.length) {
                    let newPage = new Object(list[i]);
                    newPage.n_pages = n_pages;
                    newPage.total_items = list.length;
                    pages.push(newPage);
                }
            }
        }
        return pages
    }

}

const singletonDatabase = new Database();
singletonDatabase.init();
module.exports = singletonDatabase;



