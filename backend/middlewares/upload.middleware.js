import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Assure-toi que le dossier existe
const imageDir = path.join(__dirname, '../images');
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

// Middleware pour parser `req.body` avant Multer
const ensureBodyParsed = (req, res, next) => {
  if (req.headers['content-type']?.includes('multipart/form-data')) {
    multer().none()(req, res, next);
  } else {
    next();
  }
};

// Configuration de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageDir); // Dossier de destination
  },
  filename: (req, file, cb) => {
    const projectName = req.body.projectName?.replace(/\s+/g, '_') || 'default';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const uniqueSuffix = Math.round(Math.random() * 1e9);

    const fileName = `${projectName}-${timestamp}-${uniqueSuffix}.webp`;
    console.log('Nom généré pour le fichier :', fileName);
    cb(null, fileName);
  },
});

// Filtrer les types de fichiers (uniquement images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers JPEG, PNG et GIF sont acceptés.'));
  }
};

const upload = multer({ storage, fileFilter });

export { ensureBodyParsed, upload };
