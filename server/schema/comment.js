export default `
  type Comment {
    _id: String!
    userId: String!
    likes: Int!
    contents: String!
    createdAt: String!
    selected: Boolean!
    metaAccount: String!
  }

  type Query {
    getCommentsByPostId(postId: String!): [Comment!]    
  }

  type Mutation {
    createComment(postId: String!, userId: String!, contents: String!, metaAccount: String!): MutationResponse!
    likeComment(commentId: String!, postId: String!): MutationResponse!
    dislikeComment(commentId: String!, postId: String!): MutationResponse!
    selectComment(commentId: String!, postId: String!): MutationResponse!
    updateComment(commentId: String!, postId: String!, contents: String!): MutationResponse!
    deleteComment(commentId: String!, postId: String!): MutationResponse!
  }
`;