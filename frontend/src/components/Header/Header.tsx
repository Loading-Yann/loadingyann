import React from 'react';
import { Link } from 'react-router-dom';
import contentData from '../../data/contentData.json';
import './Header.scss';

const Header: React.FC = () => {
  const { title, menu } = contentData.header;

  return (
    <header className="header">
      <h1>{title}</h1>
      <nav>
        <ul>
          {menu.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
