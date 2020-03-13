import mongoose from 'mongoose';
import { commentSchema } from './comment';

const Schema = mongoose.Schema;

const postSchema = new Schema({
  userId: mongoose.SchemaTypes.ObjectId,
  title: String,
  contents: String,
  tags: [String],
  reward: { type: Number, default: 0 },
  comments: [commentSchema],
  likes: { type: Number, default: 0 },
  createdAt: {type: Date, default: Date.now},
  terminated: {type: Boolean, default: false},
  // account: {type: String, default: ''}, // USER METAMASK ACCOUNT
})

export default mongoose.model('Post', postSchema);