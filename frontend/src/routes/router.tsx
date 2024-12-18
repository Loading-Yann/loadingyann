import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Contact from '../pages/Contact/Contact';
import Error from '../pages/Error/Error';
import Auth from '../pages/Authentication/Authentication';
import Projects from '../pages/Projets/Projets';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Auth />} />
      <Route path="/projects" element={<Projects />} />
      {/*<Route path="/messages" element={<Messages />} />
      <Route path="/presentator" element={<Presentator />} /> */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AppRouter;
