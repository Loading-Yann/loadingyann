import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import winston from './logs/winston.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import projectRoutes from './routes/project.route.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import multer from 'multer';
import 'dotenv/config';
import logger from './logs/winston.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware pour toutes les requêtes
app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.originalUrl}`);
  next();
});

// Middleware pour autoriser les CORS
app.use(cors());

// Middlewares de parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Pour parser les URL encodées si nécessaire

// Middlewares de sécurité
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
console.log('Montage des routes principales...');
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/projects', projectRoutes);
console.log('Routes principales montées : /api/auth, /api/messages, /api/projects');
console.log('Définition de la route /api/test');
app.get('/api/test', (req, res) => {
  console.log('Route /api/test atteinte');
  res.status(200).json({ message: 'Test route OK' });
});

// Page d'accueil
app.get('/', (req, res) => {
  console.log('Page d\'accueil demandée');
  res.send('Bienvenue sur le backend de Loading-Yann !');
});

// Gestion des routes non trouvées
app.use((req, res, next) => {
  console.error(`Route non trouvée : ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: 'Route non trouvée.' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(`Erreur serveur : ${err.message}`);
  res.status(500).json({ message: 'Erreur interne du serveur.', error: err.message });
});

// Winston logs pour toutes les requêtes
app.use((req, res, next) => {
  logger.info(`Requête reçue : ${req.method} ${req.originalUrl}`);
  next();
});

app.use((err, req, res, next) => {
  logger.error(`Erreur : ${err.message}`);
  res.status(500).json({ message: 'Erreur interne du serveur.' });
});

export default app;
