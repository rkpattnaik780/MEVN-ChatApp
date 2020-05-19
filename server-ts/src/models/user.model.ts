import { Schema, model, Document } from "mongoose";

export interface UserI {
  id: number;
  username: string;
  name: string;
  providerId: string;
  image: string;
}

const userSchema = new Schema({
  username: String,
  name: String,
  providerId: String,
  image: String
});

const User = model<Document>("user", userSchema);

export default User;
