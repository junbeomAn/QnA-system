export default {
  Query: {
    allUsers: async (parent, args, { models: { User } }) => {
      try {
        const users = await User.find();
        return users;

      } catch (err) {
        console.log(err);
      }      
    },
    getUser: async (parent, { _id }, { models: { User } }) => {
      try {
        const { username, email, totalReward } = await User.findOne({ _id });
        return {
          username,
          email,
          totalReward,
        }
      } catch(err) {
        console.log(err);
      }      
    }
  },
  Mutation: {//operate
    register: async (parent, { username, email, password }, { models: { User } }) => {
      try {
        const user = new User({ username, email, password });
        const response = await user.save();
        // console.log(response);
        return {
          ok: true,
        };
      } catch (err) {
        // to use errors from database
        // err.errors.email.message OR err.errors.email.path
        // use this to format the errors
        console.log(err, "user resolver register error");
        return {
          ok: false
        };
      }
    },
    login: async (parent, {email, password}, { models: { User }}) => { //operate
        const user = await User.findOne({ email });
        console.log(user);
        if (user.password === password) {
          return {
            ok: true,
            user,
          }
        } else {
          console.log('invalid login');
          return {
            ok: false,
          }
        }
      
    }
  }
};
