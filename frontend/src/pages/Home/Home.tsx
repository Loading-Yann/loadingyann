import React, { useEffect, useState } from 'react';
import PreviewCard from '../../components/PreviewCard/PreviewCard';
import Filters from '../../components/Filters/Filters';
import './_home.scss';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

interface Project {
  id: string;
  name: string;
  previewImage: string;
  role: string;
  languages: string[];
  client: string;
  status: string;
}

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filters, setFilters] = useState({
    role: '',
    language: '',
    client: '',
    status: '',
  });

  // Récupère les projets depuis le backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/api/projects`);
        const data = await response.json();
        if (response.ok) {
          setProjects(data);
          setFilteredProjects(data); // Initialisation des projets filtrés
        } else {
          console.error('Erreur lors de la récupération des projets :', data.message);
        }
      } catch (error) {
        console.error('Impossible de récupérer les projets :', error);
      }
    };

    fetchProjects();
  }, []);

  // Met à jour les projets filtrés en fonction des filtres
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...projects];

      if (filters.role) {
        filtered = filtered.filter((project) => project.role === filters.role);
      }
      if (filters.language) {
        filtered = filtered.filter((project) => project.languages.includes(filters.language));
      }
      if (filters.client) {
        filtered = filtered.filter((project) => project.client === filters.client);
      }
      if (filters.status) {
        filtered = filtered.filter((project) => project.status === filters.status);
      }

      setFilteredProjects(filtered);
    };

    applyFilters();
  }, [filters, projects]);

  // Gère le changement des filtres
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <main className="home">
      <h1>Bienvenue sur la page d'accueil</h1>
      <p>Découvrez mes projets et mes compétences en développement Fullstack.</p>
      <Filters onFilterChange={handleFilterChange} />
      <div className="projects">
        {filteredProjects.map((project) => (
          <PreviewCard
            key={project.id}
            project={project}
            isAdmin={false} // Remplace par un état si nécessaire
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
