import React, { useState } from 'react';
import './_filters.scss';

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    role: '',
    language: '',
    client: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filters">
      <select name="role" onChange={handleChange}>
        <option value="">Tous les rôles</option>
        <option value="Dev Frontend">Dev Frontend</option>
        <option value="Dev Backend">Dev Backend</option>
        <option value="Dev Fullstack">Dev Fullstack</option>
        <option value="SEO & Performance">SEO & Performance</option>
      </select>
      <select name="language" onChange={handleChange}>
        <option value="">Tous les langages</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
        <option value="React">React</option>
      </select>
      <select name="client" onChange={handleChange}>
        <option value="">Tous les clients</option>
        <option value="Client1">Client1</option>
        <option value="Client2">Client2</option>
      </select>
      <select name="status" onChange={handleChange}>
        <option value="">Tous les statuts</option>
        <option value="en cours">En cours</option>
        <option value="terminé">Terminé</option>
      </select>
    </div>
  );
};

export default Filters;
