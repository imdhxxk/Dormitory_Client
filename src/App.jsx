import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Song from './pages/Song';
import Home from './pages/Home';
import Meal from './pages/Meal';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/song" element={<Song />} />
        <Route path="/meal" element={<Meal />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App; 