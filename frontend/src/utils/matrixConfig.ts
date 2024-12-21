const matrixConfig = {
  charRatios: {
    numbers: 0.55, // 55% chiffres
    letters: 0.30, // 30% lettres occidentales
    symbols: 0.10, // 10% symboles
    kanji: 0.05,   // 5% kanji ou autres caractères
  },
  speed: {
    min: 50,    // Vitesse minimale (ms)
    max: 1000,  // Vitesse maximale (ms)
    average: 300, // Vitesse moyenne (ms)
    immobile: false, // Activer/désactiver le mouvement
  },
  fontSize: 8, // Taille de la police
  colors: {
    background: 'rgba(17, 17, 17, 0.25)', // Couleur de fond
    text: '#00ff00', // Couleur du texte
  },
};

export default matrixConfig;
