import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AppRouter from './routes/router';
import './styles/_app.scss';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main>
          <AppRouter />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
