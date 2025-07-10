import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaPrincipal from './pages/home/PaginaPrincipal';  // Sua página inicial
import Login from './pages/acesso/login/Login'; // A página para onde o botão vai te levar
import Register from './pages/acesso/cadastro/register';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '303426835993-qcn08uo4qcrrd5kgivvltuqtvr6i5ghu.apps.googleusercontent.com';


function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/PaginaPrincipal/:id" element={<PaginaPrincipal />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;

