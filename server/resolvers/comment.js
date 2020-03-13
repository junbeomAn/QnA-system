export default {
  Query: {
    getCommentsByPostId: async (parent, { postId: _id }, {models: { Post }}) => {
      try {
        const post = await Post.findById(_id);
        return post.comments;      
      } catch (err) {
        console.log(err);
        return [];        
      }
    }
  },
  Mutation: {//operate
    createComment: async (parent, { postId, userId, contents, metaAccount }, { models: { Post, Comment } }) => {
      try { //userId 도 넘겨받아야함. post의 _id값으로 document를 찾아서 댓글 삽입.
        const comment = new Comment({ userId, contents, metaAccount });
        const response = await Post.findByIdAndUpdate(postId, { $push: {comments: comment}}, { multi: true, new: true });
        console.log(response);
        return {
          ok: true,
          comment,
        }
      } catch (err) {
        console.log(err);
        return {
          ok: false
        }
      }
    },
    updateComment: async (_, { commentId, postId, contents }, { models: { Post }}) => { //good
      try {
        await Post.findByIdAndUpdate(postId, {$set: { "comments.$[outer].contents": contents } }, { "arrayFilters": [{ "outer._id": commentId }] });
        return {
          ok: true,
        }
      } catch (err) {
        console.log(err);
        return { 
          ok: false,
        }
      }

    },
    deleteComment: async (_, { commentId, postId }, { models: { Post }}) => { // good
      try {
        await Post.findByIdAndUpdate(postId, { $pull: { comments: {_id: commentId }}});
        // console.log(post);
        return {
          ok: true,
        }
      } catch (err) {
        console.log(err);
        return {
          ok: false,
        }
      }
    },
    likeComment: async (parent, { postId, commentId }, { models: { Post }}) => {
      try {
        const post = await Post.findOneAndUpdate({"_id": postId}, { $inc: { "comments.$[outer].likes": 1 } }, { "arrayFilters": [{ "outer._id": commentId }] });
        // console.log(post);      
        return {
          ok: true,
          
        }
      } catch (err) {
        console.log(err);
        return {
          ok: false,
        }
      }
    },
    dislikeComment: async (parent, { postId, commentId }, { models: { Post }}) => {
      try {
        const post = await Post.findOneAndUpdate({"_id": postId}, { $inc: { "comments.$[outer].likes": -1 } }, { "arrayFilters": [{ "outer._id": commentId }] });
        
        return {
          ok: true,
        }
      } catch (err) {
        console.log(err);
        return {
          ok: false,
        }
      }
    },
    selectComment: async (parent, {postId, commentId}, {models: {Post}}) => {
      try {
        await Post.findOneAndUpdate({"_id": postId}, {$set: { "comments.$[outer].selected": true } }, { "arrayFilters": [{ "outer._id": commentId }] });
        await Post.findOneAndUpdate({ _id: postId }, {$set: { "terminated": true } } );
        return {
          ok: true,
        }
      } catch (err) {
        console.log(err);
        return { 
          ok: false,
        }
      }
    },
  }
};
