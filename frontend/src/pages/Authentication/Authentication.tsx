import React, { useState } from 'react';
import './_authentication.scss';

const Authentication: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Données envoyées :', { username, password });

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      console.log('Réponse de l\'API :', response);

      const data = await response.json();
      console.log('Données reçues :', data);

      if (response.ok) {
        sessionStorage.setItem('token', data.token);
        alert('Connexion réussie.');
        window.location.href = '/admin';
      } else {
        setError(data.message || 'Identifiants incorrects.');
      }
    } catch (err: any) {
      console.error('Erreur de connexion :', err.message);
      setError('Impossible de se connecter au serveur.');
    }
  };

  return (
    <div className="authentication">
      <h2>Connexion Admin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Authentication;
