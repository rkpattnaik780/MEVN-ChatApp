import {Schema, model} from "mongoose";

const messageSchema = new Schema({
    message: String,
    providerId: String,
    time: Date
});

export const Message = model("message", messageSchema);
