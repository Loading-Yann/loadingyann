import express from 'express';
import { upload, ensureBodyParsed } from '../middlewares/upload.middleware.js';
import sharp from 'sharp';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Project from '../models/project.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

console.log('Chargement de project.route.js');

// Route de test
router.get('/test', (req, res) => {
  console.log('Route GET /test atteinte');
  res.status(200).json({ message: 'Route test OK' });
});

// Route pour créer un projet sans authentification
router.post('/create', async (req, res) => {
  console.log('Requête reçue sur POST /create sans authentification');
  try {
    console.log('Corps de la requête :', req.body);
    const newProject = new Project(req.body);
    console.log('Projet avant sauvegarde :', newProject);
    const savedProject = await newProject.save();
    console.log('Projet enregistré :', savedProject);
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Erreur lors de la création du projet :', error);
    res.status(500).json({ message: 'Erreur interne.', error: error.message });
  }
});

// Route pour uploader une image
router.post(
  '/upload-image',
  ensureBodyParsed, // Parse `req.body` avant Multer
  upload.single('image'),
  async (req, res) => {
    console.log('Requête reçue sur /upload-image');
    try {
      if (!req.file) {
        console.log('Aucun fichier téléchargé');
        return res.status(400).json({ message: 'Aucun fichier téléchargé.' });
      }

      console.log('Fichier reçu par Multer :', req.file);

      const { filename, path: filePath } = req.file;
      const webpFilename = filename; // Nom déjà en .webp grâce à Multer
      const outputPath = path.join(__dirname, '../images', webpFilename);

      // Convertir l'image en WebP
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(outputPath);

      console.log('Image convertie et enregistrée :', webpFilename);

      // Supprimer le fichier original
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Erreur lors de la suppression du fichier original :', err.message);
        } else {
          console.log('Fichier original supprimé avec succès :', filePath);
        }
      });

      res.status(200).json({
        message: 'Image téléchargée et convertie avec succès.',
        url: `${process.env.BACKEND_URL || 'http://localhost:3000'}/images/${webpFilename}`,
      });
    } catch (error) {
      console.error('Erreur lors de la conversion de l\'image :', error.message);
      res.status(500).json({ message: 'Erreur lors de la conversion de l\'image.', error: error.message });
    }
  }
);

// Route pour uploader plusieurs images
router.post('/upload-gallery', ensureBodyParsed, upload.array('images', 10), async (req, res) => {
  console.log('Requête reçue sur /upload-gallery');
  try {
    if (!req.files || req.files.length === 0) {
      console.log('Aucun fichier téléchargé');
      return res.status(400).json({ message: 'Aucun fichier téléchargé.' });
    }

    const uploadedFiles = [];

    for (const file of req.files) {
      const webpFilename = `${file.filename.split('.')[0]}.webp`;
      const outputPath = path.join(__dirname, '../images', webpFilename);

      await sharp(file.path)
        .webp({ quality: 80 })
        .toFile(outputPath);

      uploadedFiles.push({
        original: file.filename,
        webp: webpFilename,
        url: `/images/${webpFilename}`,
      });
    }

    console.log('Images converties et enregistrées :', uploadedFiles);

    res.status(200).json({
      message: 'Images téléchargées et converties avec succès.',
      files: uploadedFiles,
    });
  } catch (error) {
    console.error('Erreur lors de la conversion des images :', error);
    res.status(500).json({ message: 'Erreur lors de la conversion des images.', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Erreur lors de la récupération des projets :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      console.log(`Projet avec l'ID ${req.params.id} introuvable.`);
      return res.status(404).json({ message: 'Projet introuvable.' });
    }
    console.log(`Projet trouvé :`, project);
    res.status(200).json(project);
  } catch (error) {
    console.error('Erreur lors de la récupération du projet :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
});

// Route de fallback pour capturer les requêtes non reconnues
router.all('*', (req, res) => {
  console.log(`Route non reconnue : ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: 'Route non trouvée dans project.route.js' });
});

export default router;
