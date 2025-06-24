import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/acesso/login/app.jsx'; // Importe o App onde a navegação é configurada

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
