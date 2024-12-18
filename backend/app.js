import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import winston from './logs/winston.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import projectRoutes from './routes/project.route.js';
import path from 'path';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour toutes les requêtes
app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.originalUrl}`);
  next();
});

// Middleware pour autoriser les CORS
app.use(cors());

// Middlewares de sécurité
app.use(express.json());
app.use(helmet());
app.use(morgan('combined', { stream: winston.stream }));

// Logs pour vérifier le chargement des fichiers statiques
app.use('/images', (req, res, next) => {
  console.log(`Accès au dossier static /images : ${req.originalUrl}`);
  next();
});
app.use('/images', express.static(path.join(__dirname, 'images')));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Logs pour les routes API
app.use('/api/auth', (req, res, next) => {
  console.log(`Requête reçue sur /api/auth : ${req.method} ${req.url}`);
  next();
});
app.use('/api/messages', (req, res, next) => {
  console.log(`Requête reçue sur /api/messages : ${req.method} ${req.url}`);
  next();
});
app.use('/api/projects', (req, res, next) => {
  console.log(`Requête reçue sur /api/projects : ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/projects', projectRoutes);

// Logs pour vérifier les routes principales
console.log('Routes principales montées : /api/auth, /api/messages, /api/projects');

// Page d'accueil
app.get('/', (req, res) => {
  console.log('Page d\'accueil demandée');
  res.send('Bienvenue sur le backend de Loading-Yann !');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
