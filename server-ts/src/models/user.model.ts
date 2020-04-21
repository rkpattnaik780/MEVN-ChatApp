import { Schema, model, Document } from "mongoose";

const userSchema = new Schema({
  username: String,
  name: String,
  providerId: String,
  image: String
});

const User = model<User & Document>("user", userSchema);

export default User;
