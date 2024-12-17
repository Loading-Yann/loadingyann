import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Contact from '../pages/Contact/Contact';
import Error from '../pages/Error/Error';
import Auth from '../pages/Authentication/Authentication';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Auth />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AppRouter;