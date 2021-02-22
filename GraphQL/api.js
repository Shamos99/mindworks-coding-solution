const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');
const root = require('./resolvers');


let app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
