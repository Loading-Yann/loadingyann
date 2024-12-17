import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Nom : Yann</p>
        <p>Société : Loading-Yann</p>
        <p>Téléphone : 06 XX XX XX XX</p>
        <p>Email : <a href="mailto:loading.yann@gmail.com">loading.yann@gmail.com</a></p>
        <p><a href="/contact">Accéder au formulaire de contact</a></p>
      </div>
    </footer>
  );
};

export default Footer;
