import React from 'react';
import './_error.scss';

const ErrorPage: React.FC = () => {
  return (
    <div className="error">
      <h1>404 - Page non trouvée</h1>
      <p>La page que vous cherchez n'existe pas ou a été déplacée.</p>
      <a href="/">Retour à l'accueil</a>
    </div>
  );
};

export default ErrorPage;
