import React, { useState } from 'react';
import './_filters.scss';

interface FiltersProps {
  filterOptions: {
    roles: string[];
    languages: string[];
    clients: string[];
    statuses: string[];
  };
  onFilterChange: (filters: {
    role: string;
    language: string;
    client: string;
    status: string;
  }) => void;
}

const Filters: React.FC<FiltersProps> = ({ filterOptions, onFilterChange }) => {
  const [filters, setFilters] = useState({
    role: '',
    language: '',
    client: '',
    status: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filters">
      <select name="role" onChange={handleChange}>
        <option value="">Tous les rôles</option>
        {filterOptions.roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <select name="language" onChange={handleChange}>
        <option value="">Tous les langages</option>
        {filterOptions.languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
      <select name="client" onChange={handleChange}>
        <option value="">Tous les clients</option>
        {filterOptions.clients.map((client) => (
          <option key={client} value={client}>
            {client}
          </option>
        ))}
      </select>
      <select name="status" onChange={handleChange}>
        <option value="">Tous les statuts</option>
        {filterOptions.statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
