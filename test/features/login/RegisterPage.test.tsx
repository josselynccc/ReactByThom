import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { toast } from 'react-hot-toast';
import { RegisterPage } from '../../../src/features/login/RegisterPage';
import { sleep } from '../../../src/features/login/util/sleep';


// Mock de react-hot-toast y sleep
vi.mock('react-hot-toast');
vi.mock('../../../src/features/login/util/sleep', () => ({
  sleep: vi.fn(() => Promise.resolve())
}));

describe('RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('DEBE renderizar el formulario correctamente', () => {
    render(<RegisterPage />);
    
    expect(screen.getByText('Registro de usuario')).toBeInTheDocument();
    expect(document.querySelector('input[name="name"]')).toBeInTheDocument();
    expect(document.querySelector('input[name="lastname"]')).toBeInTheDocument();
    expect(document.querySelector('input[name="email"]')).toBeInTheDocument();
    expect(document.querySelector('input[name="password"]')).toBeInTheDocument();
    expect(document.querySelector('input[name="confirmPassword"]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Registrarse' })).toBeInTheDocument();
  });

  it('DEBE mostrar error cuando las contraseñas no coinciden', async () => {
    render(<RegisterPage />);
    
    // Llenar el formulario con contraseñas diferentes
    fireEvent.change(document.querySelector('input[name="password"]')!, {
      target: { value: 'password123' }
    });
    fireEvent.change(document.querySelector('input[name="confirmPassword"]')!, {
      target: { value: 'differentpassword' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));
    
    // Verificar que se muestra el error (usando getAll para manejar múltiples instancias)
    const errorMessages = await screen.findAllByText('El password debe de coincidir con el confirmPassword');
    expect(errorMessages.length).toBe(2); // Verificar que hay dos mensajes
    
    // Alternativa: Verificar solo el primer mensaje
    expect(errorMessages[0]).toBeInTheDocument();
    
    expect(toast.promise).not.toHaveBeenCalled();
  });

  it('DEBE enviar el formulario cuando las contraseñas coinciden', async () => {
    render(<RegisterPage />);
    
    // Llenar el formulario correctamente
    fireEvent.change(document.querySelector('input[name="name"]')!, {
      target: { value: 'Juan' }
    });
    fireEvent.change(document.querySelector('input[name="lastname"]')!, {
      target: { value: 'Pérez' }
    });
    fireEvent.change(document.querySelector('input[name="email"]')!, {
      target: { value: 'juan@example.com' }
    });
    fireEvent.change(document.querySelector('input[name="password"]')!, {
      target: { value: 'password123' }
    });
    fireEvent.change(document.querySelector('input[name="confirmPassword"]')!, {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));
    
    // Verificar que se llama a toast.promise
    expect(toast.promise).toHaveBeenCalled();
    
    // Verificar que sleep fue llamado con el argumento correcto
    expect(vi.mocked(sleep)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(sleep)).toHaveBeenCalledWith(2000);
  });
});