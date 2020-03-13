export default {
  Query: {
    allPosts: async (parent, args, { models: { Post } }) => {
      const allPosts = await Post.find();
      return allPosts;
    },
    getPost: async (parent, { _id }, { models: { Post } }) => {
      const post = await Post.findById(_id);
      return post;
    },
    getPostsWithPage: async (parent, { page }, { models: { Post } }) => {
      const pageSize = 10;
      const skips = pageSize * (page - 1);
      const postList = await Post.find()
        .sort({ createdAt: -1 })
        .skip(skips)
        .limit(pageSize);
      // console.log(postList);
      return postList;
    },
    getPostWithKeyword: async (_, { page, keyword }, { models: { Post } }) => {
      const pageSize = 10;
      const skips = pageSize * (page - 1);
      const searchResult = await Post.find({
        $or: [
          { contents: { $regex: keyword } },
          { title: { $regex: keyword } },
          { tags: { $regex: keyword } }
        ]
      })
        .sort({ createdAt: -1 })
        .skip(skips)
        .limit(pageSize);
      return searchResult;
    },
    getUserPosts: async (parent, { userId }, { models: { Post } }) => {
      const userPosts = await Post.find({ userId });
      // console.log(userId, userPosts);
      return userPosts;
    },
    getPostState: async (_, { postId }, { models: { Post } }) => {
      if (!postId) {
        console.log("empty string was provided to getPostState resolver");
        return {
          ok: false,
          terminated: false
        };
      }

      try {
        const post = await Post.findOne({ _id: postId });
        const { terminated } = post;
        return {
          ok: true,
          terminated
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false
        };
      }
    }
  },
  Mutation: {
    //operate
    createPost: async (
      _,
      { userId, title, contents, tags, reward },
      { models: { Post } }
    ) => {
      try {
        const post = new Post({ userId, title, contents, tags, reward });
        const response = await post.save();
        return {
          ok: true,
          post
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false
        };
      }
    },
    updatePost: async (parent, { postId, ...args }, { models: { Post } }) => {
      //good
      //operate
      const validItemObjects = object => {
        const validItems = {};
        for (let prop in object) {
          if (object[prop]) {
            Object.assign(validItems, { [prop]: object[prop] });
          }
        }
        return validItems;
      };
      try {
        const response = await Post.findOneAndUpdate(
          { _id: postId },
          validItemObjects(args),
          { multi: true, new: true }
        );
        console.log(response);
        return {
          ok: true,
          post: response
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false
        };
      }
    },
    terminatePost: async (_, { postId }, { models: { Post } }) => {
      try {
        const post = await Post.findOneAndUpdate(
          { _id: postId },
          { $set: { terminated: true } }
        );
        return {
          ok: true
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false
        };
      }
    },
    deletePost: async (_, { postId }, { models: { Post } }) => {
      //good
      try {
        await Post.findByIdAndDelete(postId);

        return {
          ok: true
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false
        };
      }
    }
  }
};
