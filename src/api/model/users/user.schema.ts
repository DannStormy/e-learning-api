import { Schema } from "mongoose";
import { findOneOrCreate } from "./user.statics";

const userSchema = new Schema({
  username: String,
  email: String,
  password: {
    type: String,
    bcrypt: true
  },
  type: {
    type: String,
  }
});

userSchema.statics.findOneOrCreate = findOneOrCreate;
export default userSchema;