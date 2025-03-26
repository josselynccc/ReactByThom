import React from 'react';
import './components.css'; 
import { Navbar } from './NavBar';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <Navbar />
    </header>
  );
};