import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
const router = express.Router();
import 'dotenv/config';
import Message from'../models/message.model.js';
import nodemailer from 'nodemailer';

// POST: Créer un utilisateur (à exécuter manuellement une seule fois)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'Utilisateur existant.' });

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
  }
});

// POST: Connexion d'un utilisateur
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect.' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Connexion réussie.', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur de connexion.' });
  }
});


// POST : Enregistrer le message et envoyer un email
router.post('/send-message', async (req, res) => {
  const { name, firstname, phone, email, subject, content } = req.body;

  try {
    // Enregistrer dans la base de données
    const newMessage = new Message({ name, firstname, phone, email, subject, content });
    await newMessage.save();

    // Configuration de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Ton adresse email
        pass: process.env.EMAIL_PASS, // Ton mot de passe ou App Password
      },
    });

    // Contenu de l'email
    const mailOptions = {
      from: email || 'noreply@example.com',
      to: 'loading.yann@gmail.com', // Ton adresse email
      subject: `Nouveau message : ${subject}`,
      text: `Nom : ${name} ${firstname}\nTéléphone : ${phone}\nEmail : ${email}\n\nMessage : ${content}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message envoyé avec succès.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de l\'envoi du message.' });
  }
});

export default router;
