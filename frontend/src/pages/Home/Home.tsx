import React, { useEffect } from 'react';
import './_home.scss';

const Home: React.FC = () => {
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      window.dispatchEvent(new Event('storage')); // Déclenche une mise à jour du Header
    }
  }, []);

  return (
    <main className="home">
      <h1>Bienvenue sur la page d'accueil</h1>
      <p>Découvrez mes projets et mes compétences en développement Fullstack.</p>
    </main>
  );
};

export default Home;
