import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AppRouter from './routes/router';
import './styles/_app.scss';

const App: React.FC = () => {
  return (
    <div className="app">
      <AppRouter />
    </div>
  );
};

export default App;
