import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  quality: { type: String, default: 'user' }, // admin, editor, user
});

// Vérifie si le modèle existe déjà, sinon le crée
const User = models.User || model('User', userSchema);

export default User;
