import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  previewImage: { type: String, required: false }, // URL ou nom de fichier
  githubLink: { type: String, required: false },
  liveLink: { type: String },
  role: { type: String, required: false },
  languages: [{ type: String, required: false }], // Tableau de strings pour les langages utilisés
  specifics: { type: String },
  team: [{ type: String }], // Noms des membres de l'équipe
  client: { type: String },
  status: { type: String, enum: ['en cours', 'terminé'], required: true },
  gallery: [{ type: String }], // Tableau d'images ou de liens vers les captures
}, { timestamps: true }); // Ajout de createdAt et updatedAt

export default mongoose.model('Project', projectSchema);
