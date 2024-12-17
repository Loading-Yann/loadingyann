import express from 'express';
import auth from '../middlewares/auth.middleware.js';
import Message from '../models/message.model.js';

const router = express.Router();

// Route pour récupérer tous les messages
router.get('/all-messages', auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des messages.' });
  }
});

export default router;
