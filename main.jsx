import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx'; // Importe o App onde a navegação é configurada

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App /> {/* Renderize o App que tem as rotas configuradas */}
  </StrictMode>
);
