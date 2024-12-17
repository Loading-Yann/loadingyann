import React, { useState } from 'react';
import './_authentication.scss';

const Authentication: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('token', data.token);
        alert('Connexion réussie.');
        window.location.href = '/admin';
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('Erreur de connexion.');
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
