import React from 'react';
import { Link } from 'react-router-dom';
import './components.css';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">ReactByTom</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/Home" className="navbar-link">Home</Link>
        </li>
        <li>
          <Link to="/Transferencias" className="navbar-link">Transferencias</Link>
        </li>
        <li>
          <Link to="/Login" className="navbar-link">Iniciar sesión</Link>
        </li>
        <li>
          <Link to="/RegisterPage" className="navbar-link">Registrarse</Link>
        </li>
      </ul>
    </nav>
  );
};