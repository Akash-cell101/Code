import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import RecepieDetails from './assets/components/RecepieDetails';
import Recepielist from './assets/components/Recepielist';
import NavBar from './assets/components/NavBar';
import Home from './assets/components/Home';
import PopularDisheslist from './assets/components/PopularDisheslist';

const App = () => {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Navigate to="/recipe" />} />
        <Route path="/" element={<Navigate to="/meel" />} />  
        <Route path="/home" element={<Home/>}/>
        <Route path="/meel/:id" element={<PopularDisheslist/>}/>
        <Route path="/recipe" element={<Recepielist />} />
        <Route path="/recipe/:id" element={<RecepieDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
