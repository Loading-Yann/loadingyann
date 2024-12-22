import path from 'path';

// Mock global pour `import.meta.url` dans l'environnement de test
global.__filename = path.resolve('mock.js'); // Nom fictif pour les tests
global.__dirname = path.resolve(); // Racine du projet pour les tests
