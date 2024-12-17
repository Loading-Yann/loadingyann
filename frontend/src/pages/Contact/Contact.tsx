import React, { useState } from 'react';
import './_contact.scss';

const Contact: React.FC = () => {
  const [isForm, setIsForm] = useState(true);

  return (
    <div className="contact">
      <h2>Contactez-moi</h2>
      <div className="contact__buttons">
        <button
          className={`contact__button ${!isForm ? 'active' : ''}`}
          onClick={() => setIsForm(false)}
        >
          Texte libre
        </button>
        <button
          className={`contact__button ${isForm ? 'active' : ''}`}
          onClick={() => setIsForm(true)}
        >
          Formulaire
        </button>
      </div>
      {!isForm ? (
        <div className="contact__textarea">
          <textarea
            placeholder="Écrivez-moi ici..."
            rows={6}
            required
            aria-required="true"
          ></textarea>
          <button type="button" className="contact__send">Envoyer</button>
        </div>
      ) : (
        <form className="contact__form">
          <input type="text" placeholder="Nom" required aria-required="true" />
          <input type="text" placeholder="Prénom" required aria-required="true" />
          <input type="tel" placeholder="Numéro de téléphone" />
          <input type="email" placeholder="Email" />
          <select>
            <option value="">Je suis...</option>
            <option>À la recherche d'une solution web</option>
            <option>À la recherche d'un site vitrine</option>
            <option>À la recherche de SEO</option>
            <option>À la recherche d'un collaborateur</option>
          </select>
          <textarea
            placeholder="Objet et message"
            rows={6}
            required
            aria-required="true"
          ></textarea>
          <button type="submit" className="contact__send">Envoyer</button>
        </form>
      )}
    </div>
  );
};

export default Contact;
