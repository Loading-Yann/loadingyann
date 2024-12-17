import React from 'react';
import contentData from '../../data/contentData.json';
import './_footer.scss';

const Footer: React.FC = () => {
  const { company, email, phone } = contentData.footer;

  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} {company}. Tous droits réservés.</p>
      <p>Email : <a href={`mailto:${email}`}>{email}</a></p>
      <p>Téléphone : {phone}</p>
    </footer>
  );
};

export default Footer;
