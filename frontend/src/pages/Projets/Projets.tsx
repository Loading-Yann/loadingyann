import React, { useState } from 'react';
import './_projets.scss';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const Projets: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    previewImage: '',
    githubLink: '',
    liveLink: '',
    role: '',
    languages: '',
    specifics: '',
    team: '',
    client: '',
    status: 'en cours',
    gallery: '',
  });

  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      setUploading(true);
      const response = await fetch(`${API_URL}/api/projects/upload-image`, {
        method: 'POST',
        body: uploadData,
      });

      const data = await response.json();

      if (response.ok) {
        setFormData((prev) => ({ ...prev, previewImage: data.url }));
        setMessage('Image téléchargée avec succès !');
      } else {
        setMessage(data.message || 'Erreur lors du téléchargement de l\'image.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'upload :', error);
      setMessage('Impossible de communiquer avec le serveur.');
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const uploadData = new FormData();
    Array.from(e.target.files).forEach((file) => uploadData.append('images', file));

    try {
      const response = await fetch(`${API_URL}/api/projects/upload-gallery`, {
        method: 'POST',
        body: uploadData,
      });

      const data = await response.json();

      if (response.ok) {
        const newGalleryUrls = data.files.map((file: any) => file.url).join(',');
        setFormData((prev) => ({
          ...prev,
          gallery: prev.gallery ? `${prev.gallery},${newGalleryUrls}` : newGalleryUrls,
        }));
        setMessage('Images ajoutées à la galerie !');
      } else {
        setMessage(data.message || 'Erreur lors du téléchargement des images.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'upload de la galerie :', error);
      setMessage('Impossible de communiquer avec le serveur.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/projects/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          languages: formData.languages.split(','), // Convertir la chaîne en tableau
          team: formData.team.split(','), // Convertir la chaîne en tableau
          gallery: formData.gallery.split(','), // Convertir la chaîne en tableau
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Projet ajouté avec succès !');
        setFormData({
          name: '',
          previewImage: '',
          githubLink: '',
          liveLink: '',
          role: '',
          languages: '',
          specifics: '',
          team: '',
          client: '',
          status: 'en cours',
          gallery: '',
        });
      } else {
        setMessage(data.message || 'Erreur lors de l’ajout du projet.');
      }
    } catch (error) {
      console.error('Erreur :', error);
      setMessage('Impossible de communiquer avec le serveur.');
    }
  };

  return (
    <div className="projets">
      <h2>Ajouter un Projet</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nom du projet" value={formData.name} onChange={handleChange} required />
        <input
          type="text"
          name="previewImage"
          placeholder="URL de l'image"
          value={formData.previewImage}
          readOnly
        />
        <input type="file" onChange={handleImageUpload} accept="image/*" />
        {uploading && <p>Téléchargement en cours...</p>}
        <input type="text" name="githubLink" placeholder="Lien GitHub" value={formData.githubLink} onChange={handleChange} required />
        <input type="text" name="liveLink" placeholder="Lien du projet en ligne" value={formData.liveLink} onChange={handleChange} />
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="">Sélectionnez un rôle</option>
          <option value="Dev Frontend">Dev Frontend</option>
          <option value="Dev Backend">Dev Backend</option>
          <option value="Dev Fullstack">Dev Fullstack</option>
          <option value="SEO & Performance">SEO & Performance</option>
        </select>
        <input type="text" name="languages" placeholder="Langages (séparés par des virgules)" value={formData.languages} onChange={handleChange} required />
        <textarea name="specifics" placeholder="Spécificités du projet" value={formData.specifics} onChange={handleChange}></textarea>
        <input type="text" name="team" placeholder="Équipe (séparée par des virgules)" value={formData.team} onChange={handleChange} />
        <input type="text" name="client" placeholder="Client" value={formData.client} onChange={handleChange} />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="en cours">En cours</option>
          <option value="terminé">Terminé</option>
        </select>
        <input type="text" name="gallery" placeholder="Galerie (URLs séparées par des virgules)" value={formData.gallery} onChange={handleChange} />
        <input type="file" multiple onChange={handleGalleryUpload} accept="image/*" />
        <button type="submit">Ajouter</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Projets;
