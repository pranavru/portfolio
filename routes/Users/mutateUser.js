const UserType = require('./userModel');

const axios = require('axios');
const { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } = require('graphql');
const { User } = require('../../Models/UserModel');

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
            resolve: (_, args) => new Promise((resolve, reject) => {
                let newUser = {
                    name: args.name,
                    email: args.email,
                    age: args.age
                }
                User.insertMany(newUser, (error, user) => {
                    if (error) {
                        reject(error);
                    } else if (user) {
                        resolve(user[0]);
                    }
                })
            })
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (_, args) => new Promise((resolve, reject) => {
                User.findByIdAndDelete(args.id, (error, user) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(user)
                    }
                })
            })
        },
        updateCustomer: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve: (_, args) => new Promise((resolve, reject) => {
                let newUser = new User(args);
                User.findOneAndUpdate(args.id, newUser, (error, user) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(user)
                    }
                })
            })
        }
    }
})

module.exports = userMutations;