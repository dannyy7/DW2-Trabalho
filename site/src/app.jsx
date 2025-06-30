import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaPrincipal from './pages/home/PaginaPrincipal';  // Sua página inicial
import Login from './pages/acesso/login/Login'; // A página para onde o botão vai te levar
import DespVar from './pages/despVariaveis/home/despVar';
import Category from './pages/despVariaveis/category/despVar'
import Desp from './pages/despVariaveis/desp/despVar'
import Ordenar from './pages/ordenar/ordenar';
import Register from './pages/acesso/cadastro/register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/PaginaPrincipal" element={<PaginaPrincipal />} />
      <Route path="/DespVar" element={<DespVar />} />
      <Route path="/DespVar2" element={<Category />} />
      <Route path="/DespVar3" element={<Desp />} />
      <Route path="/Ordenar" element={<Ordenar />} />
      <Route path="/Register" element={<Register />} />

    </Routes>
  );
}

export default App;

