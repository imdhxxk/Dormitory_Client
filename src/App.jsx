import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Song from './pages/Song';
import Meal from './pages/Meal';
import Test from './pages/Test';
import Home from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/song" element={<Song />} />
        <Route path="/Meal" element={<Meal />} />
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App; 