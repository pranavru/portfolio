const UserType = require('./userModel');
const serviceURLUsers = require('../../assets/URLs/serviceURL');

const axios = require('axios');
const { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } = require('graphql');

const userMutations = new GraphQLObjectType({
    name: "userMutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parentValue, args) {
                return axios.post(serviceURLUsers, {
                    name: args.name,
                    email: args.email,
                    age: args.email
                }).then(
                    res => res.data
                );
            }
        },
        deleteCustomer: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args) {
                return axios.delete(serviceURLUsers + args.id).then(
                    res => res.data
                );
            }
        },
        updateCustomer: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parentValue, args) {
                return axios.put(serviceURLUsers + args.id, {
                    name: args.name,
                    email: args.email,
                    age: args.age
                }).then(
                    res => res.data
                );
            }
        }
    }
})

module.exports = userMutations;