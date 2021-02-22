const {buildSchema} = require('graphql');

const schema = buildSchema(`
    type Post {
        userId : Int!
        id: Int!
        title: String!
        body: String!
        comments: [Comment]!
        n_pages: Int
        total_items: Int
    }
    
    type Comment {
        postId : Int!
        id: Int!
        name: String!
        email: String!
        body: String!
        n_pages: Int
        total_items: Int
    }
    
    type Query {
        posts(filter: [Int], offset: Int, limit: Int): [Post]
        comments (filter: [Int], search: String, offset: Int, limit: Int): [Comment]
    }
`);

module.exports = schema;
