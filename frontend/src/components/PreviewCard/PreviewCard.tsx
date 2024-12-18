import React from 'react';
import './_previewcard.scss';

const PreviewCard = ({ project, onEdit, onDelete, isAdmin }) => {
  const defaultImage = 'path/to/default-image.jpg'; // À remplacer par une URL réelle ou un chemin local.

  return (
    <div className="preview-card">
      <img
        src={project.previewImage || defaultImage}
        alt={project.name}
        className="preview-card__image"
      />
      <div className="preview-card__details">
        <h3 className="preview-card__title">{project.name}</h3>
        <p className="preview-card__role">{project.role}</p>
      </div>
      {isAdmin && (
        <div className="preview-card__actions">
          <button onClick={() => onEdit(project.id)}>✏️</button>
          <button onClick={() => onDelete(project.id)}>🗑️</button>
        </div>
      )}
    </div>
  );
};

export default PreviewCard;
