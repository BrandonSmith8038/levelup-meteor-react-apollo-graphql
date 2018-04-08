import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash/merge'

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql'
import ResolutionResolvers from '../../api/resolutions/resolvers'
import GoalsSchema from '../../api/goals/Goal.graphql'
import GoalsResolvers from '../../api/goals/resolvers'
import UsersSchema from '../../api/users/Users.graphql'
import UsersResolvers from '../../api/users/resolvers'
/////afdsa//////hkj//

const typeDefs = [GoalsSchema,ResolutionsSchema, UsersSchema];


const resolvers = merge(
  GoalsResolvers, ResolutionResolvers, UsersResolvers
)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

createApolloServer({ schema })