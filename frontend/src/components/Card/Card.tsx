import React from 'react';
import Carousel from '../Carousel/Carousel';
import './_card.scss';

const Card = ({ project, onEdit, onDelete, isAdmin }) => {
  const defaultImage = 'http://localhost:3000/images/default-image.webp';

  return (
    <div className="card">
      <img
        src={project.previewImage ? project.previewImage : defaultImage}
        alt={project.name}
        className="card__image"
      />

      <div className="card__details">
        <h3 className="card__title">{project.name}</h3>
        <p className="card__description">{project.specifics}</p>
        <div className="card__links">
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
            Voir sur GitHub
          </a>
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
            Voir le site
          </a>
        </div>
        <Carousel images={project.gallery} />
        <p className="card__team">Équipe : {project.team.join(', ')}</p>
        <p className="card__client">Client : {project.client}</p>
      </div>
      {isAdmin && (
        <div className="card__actions">
          <button onClick={() => onEdit(project.id)}>✏️</button>
          <button onClick={() => onDelete(project.id)}>🗑️</button>
        </div>
      )}
    </div>
  );
};

export default Card;
