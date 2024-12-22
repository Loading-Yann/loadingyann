import React from 'react';
import { Link } from 'react-router-dom';
import './_previewcard.scss';


interface PreviewCardProps {
  project: {
    _id: string;
    name: string;
    previewImage: string;
    role: string;
  };
}

const PreviewCard: React.FC<PreviewCardProps> = ({ project }) => {
  const defaultImage = 'http://localhost:3000/images/default-image.webp';

  return (
    <Link to={`/project/${project._id}`} className="preview-card">
      <img
        src={project.previewImage || defaultImage}
        alt={project.name}
        className="preview-card__image"
      />
      <div className="preview-card__details">
        <h3 className="preview-card__title">{project.name}</h3>
        <p className="preview-card__role">{project.role}</p>
      </div>
    </Link>
  );
};

export default PreviewCard;
