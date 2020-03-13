let passport = require("passport");
let User = require("../models").default.User;
let GitHubStrategy = require("passport-github").Strategy;
let dotenv = require("dotenv");

dotenv.config();

passport.serializeUser((user, done) => { // github strategy 성공시 call
  console.log("serializeUser operated");

  done(null, user._id); // session에 req.session.passport.user에 유저 아이디 저장
});

passport.deserializeUser((id, done) => { // 서버로 들어오는 요청마다 session을 deserialize 하여 
  console.log("deserializeUser operated"); //req.user / req.session을 사용가능케 함.
  User.find({ _id: id }, (err, user) => {
    done(err, user); // req.user에서 유저 정보 전체 가져올수있음
  });
});
passport.use(
  //github strategy
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:4000/githublogin"
    },
    async (accessToken, refreshToken, profile, done) => {
      let searchQuery = {
        githubID: profile.id
      };
      let updates = {
        username: profile.displayName || profile.username
      };
      let options = {
        upsert: true
      };

      try {
        const user = await User.findOneAndUpdate(searchQuery, updates, options);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;
