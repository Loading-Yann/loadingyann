import express from 'express';
import Project from '../models/project.model.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

// Créer un nouveau projet (Admin uniquement)
router.post('/create', auth, async (req, res) => {
  if (req.user.quality !== 'admin') {
    return res.status(403).json({ message: "Accès refusé. Rôle admin requis." });
  }
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du projet.', error: error.message });
  }
});

// Récupérer tous les projets
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des projets.', error: error.message });
  }
});

// Récupérer un projet par ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Projet non trouvé.' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du projet.', error: error.message });
  }
});

// Mettre à jour un projet (Admin uniquement)
router.put('/:id', auth, async (req, res) => {
  if (req.user.quality !== 'admin') {
    return res.status(403).json({ message: "Accès refusé. Rôle admin requis." });
  }
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ message: 'Projet non trouvé.' });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du projet.', error: error.message });
  }
});

// Supprimer un projet (Admin uniquement)
router.delete('/:id', auth, async (req, res) => {
  if (req.user.quality !== 'admin') {
    return res.status(403).json({ message: "Accès refusé. Rôle admin requis." });
  }
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Projet non trouvé.' });
    }
    res.status(200).json({ message: 'Projet supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du projet.', error: error.message });
  }
});

export default router;
