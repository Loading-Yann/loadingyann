import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import inquirer from 'inquirer';
import dotenv from 'dotenv';
import User from '../models/user.model.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/loadingyann';
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

const createAdminUser = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ Connecté à MongoDB');

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
        type: 'input',
        name: 'email',
        message: "Entrez l'email de l'utilisateur :",
        validate: (input) => input.includes('@') || 'Veuillez entrer un email valide.',
      },
      {
        type: 'list',
        name: 'quality',
        message: "Choisissez le rôle de l'utilisateur :",
        choices: ['admin', 'editor', 'viewer'],
        default: 'admin',
      },
    ]);

    const existingUser = await User.findOne({ username: answers.username });
    if (existingUser) {
      console.log('⚠️ Un utilisateur avec ce nom existe déjà.');
      return;
    }

    const hashedPassword = await bcrypt.hash(answers.password, SALT_ROUNDS);

    const newUser = new User({
      username: answers.username,
      password: hashedPassword,
      email: answers.email,
      quality: answers.quality,
    });

    await newUser.save();
    console.log(`✅ Utilisateur "${answers.username}" créé avec succès avec le rôle "${answers.quality}" !`);
  } catch (err) {
    console.error('❌ Erreur lors de la création de l\'utilisateur :', err);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Connexion MongoDB fermée');
  }
};

createAdminUser();
