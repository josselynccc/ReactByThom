import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import TransferPage from '../../src/pages/TransferPage';
import { store } from '../../src/features/transfer/store/store';

// Mocks con roles ARIA
vi.mock('../../src/components/Header', () => ({
  Header: () => <header aria-label="Encabezado principal">Header Content</header>
}));

vi.mock('../../src/features/account/components/accountInfo', () => ({
  default: () => <section aria-label="Resumen de Cuenta">Account Info Content</section>
}));

vi.mock('../../src/features/transfer/components/TransferForm', () => ({
  default: () => (
    <form aria-label="Formulario de transferencia">
      <h2>Transferencia Bancaria</h2>
      <button type="submit">Enviar</button>
    </form>
  )
}));

describe('TransferPage Component', () => {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
    },
  });

  const renderTransferPage = () => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={testQueryClient}>
          <TransferPage />
        </QueryClientProvider>
      </Provider>
    );
  };

  it('DEBE renderizar el Header con rol banner', () => {
    renderTransferPage();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('DEBE mostrar el título "Transferencia Bancaria" como heading', async () => {
    renderTransferPage();
    const headings = await screen.findAllByText(/Transferencia Bancaria/i);
    expect(headings.length).toBeGreaterThan(0);
  });
  

  it('DEBE renderizar la sección de información de cuenta', () => {
    renderTransferPage();
    expect(screen.getByLabelText(/Resumen de Cuenta/i)).toBeInTheDocument();
  });

  it('DEBE renderizar el formulario de transferencia', () => {
    renderTransferPage();
    const form = screen.getByRole('form', { name: 'Formulario de transferencia' });
    expect(form).toBeInTheDocument();
    expect(form).toContainElement(screen.getByRole('button', { name: 'Enviar' }));
  });

  it('DEBE tener la estructura semántica correcta', () => {
    renderTransferPage();
    
    const headings = screen.getAllByRole('heading', { name: /Transferencia Bancaria/i });
    expect(headings.length).toBeGreaterThan(0);
    expect(screen.getByLabelText('Resumen de Cuenta')).toBeInTheDocument();
    expect(screen.getByLabelText('Formulario de transferencia')).toBeInTheDocument();
});

});