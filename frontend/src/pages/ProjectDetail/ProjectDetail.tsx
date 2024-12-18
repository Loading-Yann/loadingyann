import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../components/Card/Card';
import './_projectdetail.scss';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${API_URL}/api/projects/${id}`);
        const data = await response.json();
        if (response.ok) {
          setProject(data);
        } else {
          console.error('Erreur lors de la récupération du projet :', data.message);
        }
      } catch (error) {
        console.error('Impossible de récupérer le projet :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  if (!project) {
    return <p>Projet introuvable.</p>;
  }

  return (
    <div className="project-detail">
      <Card project={project} isAdmin={false} onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
};

export default ProjectDetail;
