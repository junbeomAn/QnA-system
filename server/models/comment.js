import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const commentSchema = new Schema({
  userId: mongoose.SchemaTypes.ObjectId,
  likes: { type: Number, default: 0 },
  contents: String,
  createdAt: {type: Date, default: Date.now},
  selected: {type: Boolean, default: false},
  metaAccount: {type: String, default: ''},
})

export default mongoose.model('user', commentSchema);