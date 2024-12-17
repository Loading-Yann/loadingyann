const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'images'; // Dossier contenant les images
const outputDir = '../frontend/src/img/webp'; // Dossier de sortie pour les images WebP

// Crée le dossier de sortie s'il n'existe pas
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Erreur lors de la lecture du dossier images :', err);
    return;
  }

  files.forEach((file) => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, path.parse(file).name + '.webp');

    // Convertit uniquement les fichiers JPEG ou PNG
    if (/\.(jpe?g|png)$/i.test(file)) {
      sharp(inputPath)
        .webp({ quality: 80 }) // Convertir en WebP avec une qualité de 80%
        .toFile(outputPath)
        .then(() => {
          console.log(`Converti : ${file} → ${outputPath}`);
          // Supprime le fichier original
          fs.unlink(inputPath, (err) => {
            if (err) {
              console.error(`Erreur lors de la suppression de ${file} :`, err);
            } else {
              console.log(`Supprimé : ${file}`);
            }
          });
        })
        .catch((err) => console.error(`Erreur pour ${file} :`, err));
    }
  });
});
