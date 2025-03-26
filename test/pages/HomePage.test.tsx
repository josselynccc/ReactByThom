import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Home } from '../../src/pages/HomePage';

vi.mock('../../src/components/Header', () => ({
    Header: () => <header aria-label='Encabezado'>Header Component</header>
  }));
  
  vi.mock('../../src/components/Footer', () => ({
    Footer: () => <footer aria-label="Pie de página">Footer Component</footer>
  }));
  
  vi.mock('../../src/features/account/components/accountInfo', () => ({
    default: () => <div role="region" aria-label="Información de cuenta">Account Info Component</div>
  }));
  
  vi.mock('../../src/features/movements/components/movementsList', () => ({
    default: () => <div role="region" aria-label="Lista de movimientos">Movement List Component</div>
  })); 
  
  describe('Home Component', () => {
    const renderHome = () => {
      return render(<Home />);
    };
  
    it('DEBE renderizar Header y Footer', () => {
      renderHome();
      
      expect(screen.getByRole('banner')).toBeInTheDocument(); // <header> implícito
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // <footer> implícito
    });
  
    it('DEBE mostrar el título principal "Mi Banco Digital"', () => {
      renderHome();
      
      const title = screen.getByRole('heading', { name: 'Mi Banco Digital' });
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('TextP');
    });
  
    it('DEBE renderizar las secciones de información de cuenta y movimientos', () => {
      renderHome();
      
      expect(screen.getByRole('region', { name: 'Información de cuenta' })).toBeInTheDocument();
      expect(screen.getByRole('region', { name: 'Lista de movimientos' })).toBeInTheDocument();
    });
  
    it('DEBE tener la estructura semántica correcta', () => {
      renderHome();
      
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      
      // Verificar jerarquía
      expect(main).toContainElement(screen.getByRole('heading', { name: 'Mi Banco Digital' }));
      expect(main).toContainElement(screen.getByRole('region', { name: 'Información de cuenta' }));
      expect(main).toContainElement(screen.getByRole('region', { name: 'Lista de movimientos' }));
    });
  });