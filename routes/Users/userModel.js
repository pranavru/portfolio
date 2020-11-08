const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

// Type Customer
const UserType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
    }),
});

module.exports = UserType;