const axios = require('axios');
const { GraphQLList,GraphQLObjectType, GraphQLString } = require('graphql');

const UserType = require('./userModel');
const serviceURLUsers = require('../../assets/URLs/serviceURL').serviceURLUsers;

const UsersQuery = new GraphQLObjectType({
    name: 'rootUserType',
    fields: {
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return axios.get(serviceURLUsers + args.id).then(
                    res => res.data
                );
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return axios.get(serviceURLUsers).then(
                    res => res.data
                );
            }
        }
    }
});

module.exports = UsersQuery;