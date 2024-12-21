import React, { useRef, useEffect } from 'react';
import './_matrixbackground.scss';
import matrixConfig from '../../utils/matrixConfig';

const MatrixBackground: React.FC = () => {
  // Utilisation d'une référence pour accéder au canvas HTML
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current; // Récupération du canvas
    if (!canvas) return; // Sécurité si la référence est nulle

    const ctx = canvas.getContext('2d'); // Contexte 2D pour dessiner sur le canvas
    if (!ctx) return; // Sécurité si le contexte n'est pas accessible

    // Importation des paramètres depuis le fichier de configuration
    const { charRatios, speed, fontSize, colors } = matrixConfig;

    // Mise à jour des dimensions du canvas pour couvrir tout l'écran
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Calcul du nombre de colonnes en fonction de la largeur et de la taille des caractères
    const columns = Math.floor(canvas.width / fontSize);

    // Initialisation des gouttes pour chaque colonne avec des positions aléatoires
    const drops: number[] = Array(columns)
      .fill(0)
      .map(() => Math.floor(Math.random() * canvas.height / fontSize));

    // Fonction pour générer un caractère aléatoire selon les ratios définis
    const generateCharacter = () => {
      const rand = Math.random(); // Génère un nombre aléatoire entre 0 et 1
      if (rand < charRatios.numbers) {
        return String.fromCharCode(48 + Math.floor(Math.random() * 10)); // Chiffres 0-9
      } else if (rand < charRatios.numbers + charRatios.letters) {
        return String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Lettres A-Z
      } else if (rand < charRatios.numbers + charRatios.letters + charRatios.symbols) {
        const symbols = '!@#$%^&*()_+-=[]{}|;:",.<>?/`~';
        return symbols[Math.floor(Math.random() * symbols.length)]; // Symboles spéciaux
      } else {
        return String.fromCharCode(0x4e00 + Math.floor(Math.random() * 100)); // Kanji
      }
    };

    // Fonction pour générer une vitesse autour de la moyenne
    const generateSpeed = () => {
      const { min, max, average } = speed;
      const range = (max - min) / 2; // Déviation autour de la moyenne
      return average + (Math.random() - 0.5) * range; // Retourne une vitesse entre min et max centrée sur average
    };

    // Fonction principale pour dessiner sur le canvas
    const draw = () => {
      if (!ctx) return;

      // Remplir le canvas avec une couleur semi-transparente pour créer un effet de traînée
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Définir les propriétés des caractères
      ctx.fillStyle = colors.text; // Couleur du texte
      ctx.font = `${fontSize}px Courier New`; // Taille et police

      // Parcourir chaque goutte et dessiner les caractères
      drops.forEach((y, i) => {
        const text = generateCharacter(); // Génère un caractère aléatoire
        const x = i * fontSize; // Position horizontale

        // Dessine le caractère sur le canvas
        ctx.fillText(text, x, y * fontSize);

        // Réinitialiser une goutte aléatoirement si elle dépasse la hauteur ou selon une probabilité
        if (y * fontSize > canvas.height || Math.random() > 0.975) {
          drops[i] = 0; // Remet la goutte en haut
        }

        drops[i]++; // Fait descendre la goutte
      });

      // Planifie la prochaine image avec une vitesse calculée
      setTimeout(() => requestAnimationFrame(draw), generateSpeed());
    };

    draw(); // Démarre le dessin
  }, []);

  return <canvas ref={canvasRef} className="matrix-background" />;
};

export default MatrixBackground;
