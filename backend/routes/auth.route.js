import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import 'dotenv/config';

const router = express.Router();

// POST: Connexion d'un utilisateur
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Tentative de connexion avec :', { username, password });

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('Utilisateur non trouvé');
      return res.status(400).json({ message: 'Utilisateur non trouvé.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Mot de passe valide :', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    const token = jwt.sign({ id: user._id, quality: user.quality }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('Token généré :', token);
    res.status(200).json({ message: 'Connexion réussie.', token });
  } catch (err) {
    console.error('Erreur de connexion :', err.message);
    res.status(500).json({ message: 'Erreur de connexion.' });
  }
});

export default router;
