import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: String,
  
})

export default mongoose.model('Tag', tagSchema);

// it is not needed . . . .