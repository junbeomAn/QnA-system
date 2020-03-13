import mongoose from "mongoose";
import { isEmail } from "validator";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  githubID: Number,
  username: String,
  email: {
    type: String,
    trim: true,
    lowercase: true
    // unique: true,
    // required: true,
    // validate: [isEmail, 'invalid Email'],
  },
  password: {
    type: String,
    // trim: true,
    // required: true,
    minlength: 5,
    maxlength: 100
  },
  totalReward: {
    type: Number,
    default: 0
  }
});

userSchema.pre("save", async function(next) {
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
  next();
});

export default mongoose.model("User", userSchema);
