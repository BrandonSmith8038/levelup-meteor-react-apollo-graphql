import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'
import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql'

const testSchema  = `
  type Query {
   hi: String
   resolutions: [Resolution]
  }
`

const typeDefs = [testSchema, ResolutionsSchema];

const resolvers = {
  Query: {
    hi() {
      return 'Hello Level Up!'
    },
    resolutions(){
      return [
        {
          _id: 'id123',
          name: 'Brandon'
        },
        {
          _id: 'id465',
          name: 'Amber'
        }
      ]
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

createApolloServer({ schema })