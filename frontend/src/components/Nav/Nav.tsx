import React from 'react';
import { NavLink } from 'react-router-dom';
import './_nav.scss';

const Nav: React.FC = () => {
  return (
    <nav className="nav">
      <ul>
        <li><NavLink exact to="/" activeClassName="active">Accueil</NavLink></li>
        <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
        {/* Ajoute d'autres liens de navigation ici */}
      </ul>
    </nav>
  );
};

export default Nav;
