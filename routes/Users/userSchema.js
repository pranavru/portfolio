const { GraphQLSchema } = require('graphql');

const UsersQuery = require('./queryUsers');
const userMutations = require('./mutateUser');

module.exports = new GraphQLSchema({
    query: UsersQuery,
    mutation: userMutations
});