import mongoose from 'mongoose';
import User from './user';
import Post from './post';
import Comment from './comment';

const models = {
  User,
  Post,
  Comment,
}


export default models;