import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaPrincipal from './pages/home/PaginaPrincipal';  // Sua página inicial
import Login from './pages/acesso/login/Login'; // A página para onde o botão vai te levar
import DespVar from './pages/despVariaveis/despVar';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/PaginaPrincipal" element={<PaginaPrincipal />} />
      <Route path="/DespVar" element={<DespVar />} />
    </Routes>
  );
}

export default App;

