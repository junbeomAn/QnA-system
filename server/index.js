import express from "express";
import path from "path";
import { mergeResolvers, mergeTypes, fileLoader } from "merge-graphql-schemas";
var cors = require("cors");
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import qs from "querystring";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import bodyParser from "body-parser";

import passport from "./auth/passport";
import models from "./models";

dotenv.config();

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);
const db = mongoose.connection;
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  expressSession({
    secret: "charlieJunbeom",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if no maxAge, it expires when browser closed.
      httpOnly: false
    }
  })
); // 세션 활성화 / 서버가 다시 구동되면 세션이 만료되어 로그인 상태 풀림 참고!!
app.use(passport.initialize());
app.use(passport.session()); // passport 에서 세션을 쓰겠다.
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
// methods: ["GET", "POST"], origin: ["http://localhost:3000"]

// cors option is important when sending request from other domain.
// cookies are never sent if there's no credentials

app.get(
  "/glogin",
  passport.authenticate("github", { scope: ["user:email"], session: true })
);
app.get(
  "/githublogin",
  passport.authenticate(
    "github" /*{ successRedirect: 'http://localhost:3000' }*/
  ),
  function(req, res) {
    // console.log(req.session);
    // res.cookie('user', req.session.passport.user);
    res.redirect("http://localhost:3000");
  }
);
app.get("/logout", (req, res) => {
  // console.log(req.user);
  // console.log(req.session);
  const redirectURL = "/";
  if (req.user) {
    req.session.destroy(err => {
      if (err) throw err;
      req.logout();
      res.clearCookie("connect.sid");
      res.status(200).send({ redirectURL });
    });
  } else {
    console.log("로그인 되어있지 않습니다.");
    res.status(200).send();
  }
});

app.get("/check", (req, res) => {
  // req에서 세션여부 확인가능
  // console.log(req.cookies);
  res.send(req.cookies);
});

app.get("/getUserId", (req, res) => {
  console.log(req.session.passport.user);
  const userId = req.session.passport.user;
  res.status(200).send(userId);
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return {
      models,
      qs,
      res
    };
  }
});

server.applyMiddleware({ app });

//error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("server error!");
});
app.use((req, res, next) => {
  // 404 response is not an error. so it should be handled independently like this.
  res.status(404).send("Invaid request!");
});

db.on("error", console.error);
db.once("open", () => {
  console.log("Connected to mongod server");
});

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

app.listen({ port: process.env.PORT }, () => {
  console.log(`server ready at ${process.env.PORT} port`);
});
