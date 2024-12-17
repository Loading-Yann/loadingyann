import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <h1>Loading-Yann</h1>
      <nav>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/apropos">À Propos</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
