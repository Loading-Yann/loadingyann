import React, { useState } from 'react';
import './Contact.scss';

const Contact = () => {
  const [isForm, setIsForm] = useState(false);

  return (
    <div className="contact">
      <h2>Contactez-moi</h2>
      <div>
        <button onClick={() => setIsForm(false)}>Texte libre</button>
        <button onClick={() => setIsForm(true)}>Formulaire</button>
      </div>
      {!isForm ? (
        <textarea placeholder="Écrivez-moi ici..." rows={6}></textarea>
      ) : (
        <form>
          <input type="text" placeholder="Nom" required />
          <input type="text" placeholder="Prénom" required />
          <input type="tel" placeholder="Numéro de téléphone" />
          <input type="email" placeholder="Email" />
          <select>
            <option>Je suis...</option>
            <option>À la recherche d'une solution web</option>
            <option>À la recherche d'un site vitrine</option>
            <option>À la recherche de SEO</option>
            <option>À la recherche d'un collaborateur</option>
          </select>
          <textarea placeholder="Objet et message" rows={6} required></textarea>
          <button type="submit">Envoyer</button>
        </form>
      )}
    </div>
  );
};

export default Contact;
