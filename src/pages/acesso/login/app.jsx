import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaPrincipal from './PaginaPrincipal';  // Sua página inicial
import Login from './Login'; // A página para onde o botão vai te levar

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/PaginaPrincipal" element={<PaginaPrincipal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
