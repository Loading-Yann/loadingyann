import React from 'react';
import contentData from '../../data/contentData.json';
import './_home.scss';

const Home: React.FC = () => {
  const { title, description } = contentData.home;

  return (
    <div className="home">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Home;
