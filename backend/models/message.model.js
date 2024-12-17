import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  firstname: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
