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
import 'dotenv/config';
import logger from './logs/winston.js';

let __filename;
let __dirname;

// Utiliser des valeurs statiques dans l'environnement de test
if (process.env.NODE_ENV === 'test') {
  __filename = 'mock.js'; // Chemin fictif pour Jest
  __dirname = path.resolve(); // Dossier racine pour Jest
} else {
  __filename = fileURLToPath(import.meta.url); // Pour le mode production
  __dirname = dirname(__filename);
}


const app = express();

// Middleware pour toutes les requêtes
app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.originalUrl}`);
  next();
});

// Middleware pour autoriser les CORS
app.use(cors({
  origin: 'http://localhost:5173', // URL du frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes nécessaires
  exposedHeaders: ['Content-Disposition'], // Pour les en-têtes spécifiques
  credentials: true, // Pour autoriser les cookies, si nécessaire
}));


// Middlewares de parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Pour parser les URL encodées si nécessaire

// Middlewares de sécurité
app.use(helmet());
app.use(morgan('combined', { stream: winston.stream }));

// Logs pour vérifier le chargement des fichiers statiques
app.use('/images', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Autorise le frontend
  next();
});
app.use('/images', express.static(path.join(__dirname, 'images')));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/projects', projectRoutes);

// Page d'accueil
app.get('/', (req, res) => {
  console.log('Page d\'accueil demandée');
  res.send('Bienvenue sur le backend de Loading-Yann !');
});

// Gestion des erreurs
app.use((req, res, next) => {
  console.error(`Route non trouvée : ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: 'Route non trouvée.' });
});

app.use((err, req, res, next) => {
  console.error(`Erreur serveur : ${err.message}`);
  res.status(500).json({ message: 'Erreur interne du serveur.', error: err.message });
});

export default app;
