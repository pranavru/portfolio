const { GraphQLList, GraphQLObjectType, GraphQLString } = require('graphql');
const { User } = require('../../Models/UserModel');

const UserType = require('./userModel');

const UsersQuery = new GraphQLObjectType({
    name: 'rootUser',
    fields: {
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLString },
            },
            resolve: (_, args) => new Promise((resolve, reject) => {
                User.findById(args.id, (error, user) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        resolve(user)
                    }
                })
                resolve
            })
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: () => new Promise((resolve, reject) => {
                User.find((error, users) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        resolve(users)
                    }
                })
                resolve
            })
        }
    }
});

module.exports = UsersQuery;

/**
 * resolve(parentValue, args) {
                console.log(serviceURLUsers)
                return axios.get(serviceURLUsers).then(
                    res => res.data
                );
            }
 */