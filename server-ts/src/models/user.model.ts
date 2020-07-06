import {Schema, model, Document} from "mongoose";

const userSchema = new Schema({
    username: String,
    name: String,
    providerId: String,
    image: String
});

export const User = model<Document>("user", userSchema);
