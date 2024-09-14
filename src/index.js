import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss'; // Zmieniony na właściwy plik SCSS
import App from './App';

// Renderowanie aplikacji
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Jeśli nie potrzebujesz raportowania wydajności, usuwasz ten fragment:
// reportWebVitals();
