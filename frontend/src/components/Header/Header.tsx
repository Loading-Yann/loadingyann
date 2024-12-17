import React from 'react';
import './_header.scss';
import logoImage from '../../img/webp/bien_sans_lunette2_reduite.webp'; 

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>Loading-Yann</h1>
      <h2>Développeur Fullstack</h2>
      <nav>
        <ul>
          <li><a href="/">Accueil</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <img src={logoImage} alt="Logo" className="header__logo" />
    </header>
  );
};

export default Header;
