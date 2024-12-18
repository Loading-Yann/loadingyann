import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import winston from './logs/winston.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import projectRoutes from './routes/project.route.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares de sécurité
app.use(express.json());
app.use(helmet());
app.use(morgan('combined', { stream: winston.stream }));
app.use('/api/projects', projectRoutes);

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Page d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend de Loading-Yann !');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
