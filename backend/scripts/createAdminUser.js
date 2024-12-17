// Import des modules nécessaires
import 'dotenv/config';
import mongoose from 'mongoose' ;
import bcrypt from 'bcrypt';
import inquirer from 'inquirer';
import User from '../models/user.model.js'; // Ton modèle User

// Configuration
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/loadingyann';
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

// Fonction principale
const createAdminUser = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ Connecté à MongoDB');

    // Boîte de dialogue pour récupérer les informations
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'username',
        message: "Entrez le nom d'utilisateur :",
        validate: (input) => input.length > 0 || "Le nom d'utilisateur ne peut pas être vide.",
      },
      {
        type: 'password',
        name: 'password',
        message: 'Entrez le mot de passe :',
        mask: '*',
        validate: (input) => input.length > 0 || 'Le mot de passe ne peut pas être vide.',
      },
      {
        type: 'list',
        name: 'quality',
        message: "Choisissez le rôle de l'utilisateur :",
        choices: ['admin', 'editor', 'viewer'], // Différents rôles possibles
        default: 'admin',
      },
    ]);

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username: answers.username });
    if (existingUser) {
      console.log('⚠️ Un utilisateur avec ce nom existe déjà.');
      return;
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(answers.password, SALT_ROUNDS);

    // Création de l'utilisateur
    const newUser = new User({
      username: answers.username,
      password: hashedPassword,
      quality: answers.quality,
    });

    // Sauvegarde dans MongoDB
    await newUser.save();
    console.log(`✅ Utilisateur "${answers.username}" créé avec succès avec le rôle "${answers.quality}" !`);
  } catch (err) {
    console.error('❌ Erreur lors de la création de l\'utilisateur :', err);
  } finally {
    // Fermeture de la connexion
    mongoose.connection.close();
    console.log('🔌 Connexion MongoDB fermée');
  }
};

// Lancer la fonction
createAdminUser();
