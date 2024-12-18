import React, { useEffect, useState } from 'react';
import './_header.scss';
import logoImage from '../../img/webp/bien_sans_lunette2_reduite.webp';

const Header: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [userQuality, setUserQuality] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const name = sessionStorage.getItem('username');
    const quality = sessionStorage.getItem('userRole');

    if (token) {
      setIsAuthenticated(true);
      setUserName(name || '');
      setUserQuality(quality || '');
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
    setUserName('');
    setUserQuality('');
    window.location.reload(); // Recharge pour éviter tout état résiduel
  };

  return (
    <header className="header">
      <h1>Loading-Yann</h1>
      <h2>Développeur Fullstack</h2>
      {isAuthenticated && (
        <p className="header__welcome">
          Bonjour <strong>{userName}</strong> <strong>{userQuality}</strong>.
        </p>
      )}
      <nav>
        <ul className="header__nav">
          <li><a href="/">Accueil</a></li>
          <li><a href="/contact">Contact</a></li>
          {isAuthenticated && (
            <>
              <li><a href="/projects">Projets</a></li>
              <li><a href="/messages">Messages</a></li>
              <li><a href="/presentator">Présentator</a></li>
              <li>
                <button className="header__logout" onClick={handleLogout}>
                  Déconnexion
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <img src={logoImage} alt="Logo" className="header__logo" />
    </header>
  );
};

export default Header;
