import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import  winston from './logs/winston.js';
import authRoutes from './routes/auth.route.js';

const app = express();

// Middlewares de sécurité
app.use(helmet());

// Logger des requêtes avec Morgan
app.use(morgan('combined', { stream: winston.stream }));

// Rate Limit pour limiter les requêtes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes
});
app.use(limiter);

// Parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Page d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend de Loading-Yann !');
});

const messageRoutes = require('./routes/message.route');
app.use('/api/messages', messageRoutes);

module.exports = app;
