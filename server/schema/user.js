export default `
  type User {
    _id: String!
    username: String!
    email: String!
    totalReward: Int    
  }
  type Query {
    getUser(_id: String!): User!
    allUsers: [User!]!    
  }
  type Mutation {
    register(username: String!, email: String!, password: String!): MutationResponse!
    login(email: String!, password: String!): MutationResponse!
  }
`