import dotenv from 'dotenv';
dotenv.config();

export default {
  Query: {
    githubLogin: (parent, args, { qs, res }) => {
      const url = 'https://github.com/login/oauth/authorize?';
      const query = qs.stringify({
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.CLIENT_SECRET,
        scope: 'user:email',
      })
      const githubAuthUrl = url + query;
      
    }
  }
};
