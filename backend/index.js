import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Configurations
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connexion à MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch((err) => console.error('❌ Erreur de connexion MongoDB :', err));

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
