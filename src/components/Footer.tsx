import React from 'react';
import './components.css'

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">© 2025 Mi App. Todos los derechos reservados.</p>
        <p className="footer-subtext">Desarrollado con por JC</p>
      </div>
    </footer>
  );
};