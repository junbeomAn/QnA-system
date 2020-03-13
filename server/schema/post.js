export default `
  type Post {
    _id: String!
    userId: String! 
    title: String!
    contents: String!
    tags: [String!]
    reward: Float!
    targetAnswerer: User
    comments: [Comment]
    likes: Int!
    createdAt: String!
    terminated: Boolean!
  }

  type Query {
    allPosts: [Post!]!
    getPost(_id: String!): Post!
    getUserPosts(userId: String!): [Post!]
    getPostsWithPage(page: Int!): [Post!]
    getPostWithKeyword(page: Int!, keyword: String!): [Post!]
    getPostState(postId: String!): PostState!    
  }
 
  type Mutation {
    createPost(userId: String!, title: String!, contents: String!, tags: [String!], reward: Float!): MutationResponse!
    updatePost(postId: String!, title:String, contents: String, tags: [String]): MutationResponse!    
    terminatePost(postId: String!): MutationResponse!
    deletePost(postId: String!): MutationResponse!
  }
`; 