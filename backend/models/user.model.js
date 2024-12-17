import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, default: null }, // Enlève "unique: true" si ce n'est pas nécessaire
  quality: { type: String, enum: ['admin', 'editor', 'viewer'], default: 'viewer' },
});

export default mongoose.model('User', userSchema);
