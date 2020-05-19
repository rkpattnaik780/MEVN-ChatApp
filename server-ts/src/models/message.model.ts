import { Schema, model, Document } from "mongoose";

const messageSchema = new Schema({
  message: String,
  providerId: String,
  time: Date
});

const Message = model<Document>("message", messageSchema);

export default Message;
